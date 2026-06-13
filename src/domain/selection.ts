import { ENCHANTMENTS, ENCHANTMENT_BY_ID } from "../data/enchantments";
import type { EnchantableItem, EnchantmentDefinition } from "./types";

export function getApplicableEnchantments(
  item: EnchantableItem
): EnchantmentDefinition[] {
  return ENCHANTMENTS.filter((enchantment) =>
    enchantment.appliesTo.includes(item.category)
  ).sort((a, b) => a.nameZh.localeCompare(b.nameZh, "zh-Hans-CN"));
}

export function getConflictReason(
  enchantmentId: string,
  selectedIds: string[]
): string | null {
  const enchantment = ENCHANTMENT_BY_ID[enchantmentId];
  if (!enchantment) {
    return null;
  }

  const conflictId = selectedIds.find((selectedId) =>
    enchantment.conflicts.includes(selectedId)
  );

  if (!conflictId) {
    return null;
  }

  return `与 ${ENCHANTMENT_BY_ID[conflictId].nameZh} 互斥`;
}

export function areEnchantmentsCompatible(ids: string[]): boolean {
  return ids.every((id) =>
    ids.every(
      (otherId) =>
        id === otherId || !ENCHANTMENT_BY_ID[id].conflicts.includes(otherId)
    )
  );
}

