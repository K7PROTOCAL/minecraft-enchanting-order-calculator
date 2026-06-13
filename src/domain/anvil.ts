import { ENCHANTMENT_BY_ID } from "../data/enchantments";
import { ITEM_BY_ID } from "../data/items";
import type {
  CalculationResult,
  EnchantableItem,
  MergeObject,
  MergeStep,
  SelectedEnchantment
} from "./types";

const TARGET_BIT = 1;
const SURVIVAL_STEP_LIMIT = 39;
const MAX_STATES_PER_MASK = 24;

interface SearchState {
  object: MergeObject;
  totalCost: number;
  steps: MergeStep[];
}

export function priorWorkPenalty(anvilUseCount: number): number {
  return 2 ** anvilUseCount - 1;
}

export function createInitialItem(item: EnchantableItem): MergeObject {
  return {
    kind: "item",
    itemId: item.id,
    itemCategory: item.category,
    enchantments: {},
    anvilUseCount: 0,
    priorWorkPenalty: 0
  };
}

export function createInitialBook(selection: SelectedEnchantment): MergeObject {
  return {
    kind: "book",
    enchantments: {
      [selection.enchantmentId]: selection.level
    },
    anvilUseCount: 0,
    priorWorkPenalty: 0
  };
}

export function tryMerge(left: MergeObject, right: MergeObject): {
  result: MergeObject;
  cost: number;
} | null {
  if (left.kind === "book" && right.kind !== "book") {
    return null;
  }

  const resultEnchantments = { ...left.enchantments };
  let enchantmentCost = 0;
  let appliedAny = false;

  for (const [enchantmentId, rightLevel] of Object.entries(right.enchantments)) {
    const definition = ENCHANTMENT_BY_ID[enchantmentId];
    if (!definition) {
      return null;
    }

    if (
      left.kind === "item" &&
      left.itemCategory &&
      !definition.appliesTo.includes(left.itemCategory)
    ) {
      continue;
    }

    const conflicts = Object.keys(resultEnchantments).some((existingId) =>
      definition.conflicts.includes(existingId)
    );

    if (conflicts) {
      return null;
    }

    const leftLevel = resultEnchantments[enchantmentId] ?? 0;
    const resultLevel =
      leftLevel === rightLevel
        ? Math.min(definition.maxLevel, leftLevel + 1)
        : Math.max(leftLevel, rightLevel);

    resultEnchantments[enchantmentId] = resultLevel;
    enchantmentCost += definition.bookMultiplier * resultLevel;
    appliedAny = true;
  }

  if (!appliedAny) {
    return null;
  }

  const cost = left.priorWorkPenalty + right.priorWorkPenalty + enchantmentCost;
  if (cost > SURVIVAL_STEP_LIMIT) {
    return null;
  }

  const anvilUseCount = Math.max(left.anvilUseCount, right.anvilUseCount) + 1;
  const result: MergeObject = {
    kind: left.kind,
    itemId: left.itemId,
    itemCategory: left.itemCategory,
    enchantments: resultEnchantments,
    anvilUseCount,
    priorWorkPenalty: priorWorkPenalty(anvilUseCount)
  };

  return { result, cost };
}

export function calculateBestOrder(
  itemId: string,
  selectedEnchantments: SelectedEnchantment[]
): CalculationResult {
  const item = ITEM_BY_ID[itemId];
  if (!item) {
    return { ok: false, reason: "请选择需要附魔的物品。" };
  }

  if (selectedEnchantments.length === 0) {
    return { ok: false, reason: "请至少选择一个附魔。" };
  }

  const invalidSelection = selectedEnchantments.find((selection) => {
    const definition = ENCHANTMENT_BY_ID[selection.enchantmentId];
    return (
      !definition ||
      selection.level < 1 ||
      selection.level > definition.maxLevel ||
      !definition.appliesTo.includes(item.category)
    );
  });

  if (invalidSelection) {
    return { ok: false, reason: "当前附魔选择中包含不适用于该物品的附魔。" };
  }

  const objects = [
    createInitialItem(item),
    ...selectedEnchantments.map(createInitialBook)
  ];
  const objectCount = objects.length;
  const fullMask = (1 << objectCount) - 1;
  const statesByMask = new Map<number, SearchState[]>();

  objects.forEach((object, index) => {
    statesByMask.set(1 << index, [{ object, totalCost: 0, steps: [] }]);
  });

  for (let mask = 1; mask <= fullMask; mask += 1) {
    let subMask = (mask - 1) & mask;
    while (subMask > 0) {
      const otherMask = mask ^ subMask;
      if (otherMask > 0 && subMask < otherMask) {
        const leftStates = statesByMask.get(subMask) ?? [];
        const rightStates = statesByMask.get(otherMask) ?? [];

        for (const leftState of leftStates) {
          for (const rightState of rightStates) {
            addCandidate(mask, leftState, rightState, statesByMask);
            addCandidate(mask, rightState, leftState, statesByMask);
          }
        }
      }

      subMask = (subMask - 1) & mask;
    }
  }

  const completeStates = (statesByMask.get(fullMask) ?? []).filter(
    (state) => state.object.kind === "item"
  );

  const bestState = completeStates.sort((a, b) => a.totalCost - b.totalCost)[0];

  if (!bestState) {
    return {
      ok: false,
      reason: "当前组合无法在生存模式每步 39 级铁砧限制内完成。"
    };
  }

  return {
    ok: true,
    totalCost: bestState.totalCost,
    result: bestState.object,
    steps: bestState.steps
  };
}

function addCandidate(
  mask: number,
  leftState: SearchState,
  rightState: SearchState,
  statesByMask: Map<number, SearchState[]>
) {
  const merge = tryMerge(leftState.object, rightState.object);
  if (!merge) {
    return;
  }

  const totalCost = leftState.totalCost + rightState.totalCost + merge.cost;
  const step: MergeStep = {
    left: leftState.object,
    right: rightState.object,
    result: merge.result,
    cost: merge.cost,
    cumulativeCost: totalCost
  };
  const candidate: SearchState = {
    object: merge.result,
    totalCost,
    steps: [...leftState.steps, ...rightState.steps, step]
  };

  const states = statesByMask.get(mask) ?? [];
  const key = stateKey(candidate.object);
  const existingIndex = states.findIndex((state) => stateKey(state.object) === key);

  if (existingIndex >= 0) {
    if (states[existingIndex].totalCost <= candidate.totalCost) {
      return;
    }
    states.splice(existingIndex, 1, candidate);
  } else {
    states.push(candidate);
  }

  states.sort((a, b) => a.totalCost - b.totalCost);
  if (states.length > MAX_STATES_PER_MASK) {
    states.length = MAX_STATES_PER_MASK;
  }

  statesByMask.set(mask, states);
}

function stateKey(object: MergeObject): string {
  const enchantmentKey = Object.entries(object.enchantments)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, level]) => `${id}:${level}`)
    .join(",");

  return [
    object.kind,
    object.itemId ?? "",
    object.itemCategory ?? "",
    object.anvilUseCount,
    object.priorWorkPenalty,
    enchantmentKey
  ].join("|");
}

export const ANVIL_LIMIT = SURVIVAL_STEP_LIMIT;

