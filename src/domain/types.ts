export type ItemCategory =
  | "sword"
  | "axe"
  | "pickaxe"
  | "shovel"
  | "hoe"
  | "mace"
  | "bow"
  | "crossbow"
  | "trident"
  | "fishing_rod"
  | "helmet"
  | "chestplate"
  | "leggings"
  | "boots"
  | "elytra"
  | "shield"
  | "shears"
  | "flint_and_steel"
  | "carrot_on_a_stick"
  | "warped_fungus_on_a_stick"
  | "brush";

export interface EnchantableItem {
  id: string;
  nameZh: string;
  category: ItemCategory;
  iconId: string;
}

export interface EnchantmentDefinition {
  id: string;
  nameZh: string;
  maxLevel: number;
  itemMultiplier: number;
  bookMultiplier: number;
  treasure?: boolean;
  curse?: boolean;
  appliesTo: ItemCategory[];
  conflicts: string[];
}

export interface SelectedEnchantment {
  enchantmentId: string;
  level: number;
}

export type MergeObjectKind = "item" | "book";

export interface MergeObject {
  kind: MergeObjectKind;
  itemId?: string;
  itemCategory?: ItemCategory;
  enchantments: Record<string, number>;
  anvilUseCount: number;
  priorWorkPenalty: number;
}

export interface MergeStep {
  left: MergeObject;
  right: MergeObject;
  result: MergeObject;
  cost: number;
  cumulativeCost: number;
}

export interface CalculationSuccess {
  ok: true;
  totalCost: number;
  result: MergeObject;
  steps: MergeStep[];
}

export interface CalculationFailure {
  ok: false;
  reason: string;
}

export type CalculationResult = CalculationSuccess | CalculationFailure;

