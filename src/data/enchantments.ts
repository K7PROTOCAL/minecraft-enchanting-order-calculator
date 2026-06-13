import type { EnchantmentDefinition, ItemCategory } from "../domain/types";

const allBreakable: ItemCategory[] = [
  "sword",
  "axe",
  "pickaxe",
  "shovel",
  "hoe",
  "mace",
  "bow",
  "crossbow",
  "trident",
  "fishing_rod",
  "helmet",
  "chestplate",
  "leggings",
  "boots",
  "elytra",
  "shield",
  "shears",
  "flint_and_steel",
  "carrot_on_a_stick",
  "warped_fungus_on_a_stick",
  "brush"
];

const armor: ItemCategory[] = ["helmet", "chestplate", "leggings", "boots"];
const miningTools: ItemCategory[] = ["axe", "pickaxe", "shovel", "hoe"];
const damageWeapons: ItemCategory[] = ["sword", "axe"];
const maceDamageGroup: ItemCategory[] = ["mace"];

function bookMultiplier(itemMultiplier: number) {
  return Math.max(1, Math.floor(itemMultiplier / 2));
}

function enchantment(
  definition: Omit<EnchantmentDefinition, "bookMultiplier"> & {
    bookMultiplier?: number;
  }
): EnchantmentDefinition {
  return {
    ...definition,
    bookMultiplier:
      definition.bookMultiplier ?? bookMultiplier(definition.itemMultiplier)
  };
}

export const ENCHANTMENTS: EnchantmentDefinition[] = [
  enchantment({
    id: "protection",
    nameZh: "保护",
    maxLevel: 4,
    itemMultiplier: 1,
    appliesTo: armor,
    conflicts: ["fire_protection", "blast_protection", "projectile_protection"]
  }),
  enchantment({
    id: "fire_protection",
    nameZh: "火焰保护",
    maxLevel: 4,
    itemMultiplier: 2,
    appliesTo: armor,
    conflicts: ["protection", "blast_protection", "projectile_protection"]
  }),
  enchantment({
    id: "feather_falling",
    nameZh: "摔落保护",
    maxLevel: 4,
    itemMultiplier: 2,
    appliesTo: ["boots"],
    conflicts: []
  }),
  enchantment({
    id: "blast_protection",
    nameZh: "爆炸保护",
    maxLevel: 4,
    itemMultiplier: 4,
    appliesTo: armor,
    conflicts: ["protection", "fire_protection", "projectile_protection"]
  }),
  enchantment({
    id: "projectile_protection",
    nameZh: "弹射物保护",
    maxLevel: 4,
    itemMultiplier: 2,
    appliesTo: armor,
    conflicts: ["protection", "fire_protection", "blast_protection"]
  }),
  enchantment({
    id: "respiration",
    nameZh: "水下呼吸",
    maxLevel: 3,
    itemMultiplier: 4,
    appliesTo: ["helmet"],
    conflicts: []
  }),
  enchantment({
    id: "aqua_affinity",
    nameZh: "水下速掘",
    maxLevel: 1,
    itemMultiplier: 4,
    appliesTo: ["helmet"],
    conflicts: []
  }),
  enchantment({
    id: "thorns",
    nameZh: "荆棘",
    maxLevel: 3,
    itemMultiplier: 8,
    appliesTo: armor,
    conflicts: []
  }),
  enchantment({
    id: "depth_strider",
    nameZh: "深海探索者",
    maxLevel: 3,
    itemMultiplier: 4,
    appliesTo: ["boots"],
    conflicts: ["frost_walker"]
  }),
  enchantment({
    id: "frost_walker",
    nameZh: "冰霜行者",
    maxLevel: 2,
    itemMultiplier: 4,
    treasure: true,
    appliesTo: ["boots"],
    conflicts: ["depth_strider"]
  }),
  enchantment({
    id: "binding_curse",
    nameZh: "绑定诅咒",
    maxLevel: 1,
    itemMultiplier: 8,
    curse: true,
    appliesTo: [...armor, "elytra"],
    conflicts: []
  }),
  enchantment({
    id: "soul_speed",
    nameZh: "灵魂疾行",
    maxLevel: 3,
    itemMultiplier: 8,
    treasure: true,
    appliesTo: ["boots"],
    conflicts: []
  }),
  enchantment({
    id: "swift_sneak",
    nameZh: "迅捷潜行",
    maxLevel: 3,
    itemMultiplier: 8,
    treasure: true,
    appliesTo: ["leggings"],
    conflicts: []
  }),
  enchantment({
    id: "sharpness",
    nameZh: "锋利",
    maxLevel: 5,
    itemMultiplier: 1,
    appliesTo: damageWeapons,
    conflicts: ["smite", "bane_of_arthropods"]
  }),
  enchantment({
    id: "smite",
    nameZh: "亡灵杀手",
    maxLevel: 5,
    itemMultiplier: 2,
    appliesTo: [...damageWeapons, ...maceDamageGroup],
    conflicts: ["sharpness", "bane_of_arthropods", "density", "breach"]
  }),
  enchantment({
    id: "bane_of_arthropods",
    nameZh: "节肢杀手",
    maxLevel: 5,
    itemMultiplier: 2,
    appliesTo: [...damageWeapons, ...maceDamageGroup],
    conflicts: ["sharpness", "smite", "density", "breach"]
  }),
  enchantment({
    id: "knockback",
    nameZh: "击退",
    maxLevel: 2,
    itemMultiplier: 2,
    appliesTo: ["sword"],
    conflicts: []
  }),
  enchantment({
    id: "fire_aspect",
    nameZh: "火焰附加",
    maxLevel: 2,
    itemMultiplier: 4,
    appliesTo: ["sword", "mace"],
    conflicts: []
  }),
  enchantment({
    id: "looting",
    nameZh: "抢夺",
    maxLevel: 3,
    itemMultiplier: 4,
    appliesTo: ["sword"],
    conflicts: []
  }),
  enchantment({
    id: "sweeping_edge",
    nameZh: "横扫之刃",
    maxLevel: 3,
    itemMultiplier: 4,
    appliesTo: ["sword"],
    conflicts: []
  }),
  enchantment({
    id: "efficiency",
    nameZh: "效率",
    maxLevel: 5,
    itemMultiplier: 1,
    appliesTo: [...miningTools, "shears"],
    conflicts: []
  }),
  enchantment({
    id: "silk_touch",
    nameZh: "精准采集",
    maxLevel: 1,
    itemMultiplier: 8,
    appliesTo: miningTools,
    conflicts: ["fortune"]
  }),
  enchantment({
    id: "unbreaking",
    nameZh: "耐久",
    maxLevel: 3,
    itemMultiplier: 2,
    appliesTo: allBreakable,
    conflicts: []
  }),
  enchantment({
    id: "fortune",
    nameZh: "时运",
    maxLevel: 3,
    itemMultiplier: 4,
    appliesTo: miningTools,
    conflicts: ["silk_touch"]
  }),
  enchantment({
    id: "power",
    nameZh: "力量",
    maxLevel: 5,
    itemMultiplier: 1,
    appliesTo: ["bow"],
    conflicts: []
  }),
  enchantment({
    id: "punch",
    nameZh: "冲击",
    maxLevel: 2,
    itemMultiplier: 4,
    appliesTo: ["bow"],
    conflicts: []
  }),
  enchantment({
    id: "flame",
    nameZh: "火矢",
    maxLevel: 1,
    itemMultiplier: 4,
    appliesTo: ["bow"],
    conflicts: []
  }),
  enchantment({
    id: "infinity",
    nameZh: "无限",
    maxLevel: 1,
    itemMultiplier: 8,
    appliesTo: ["bow"],
    conflicts: ["mending"]
  }),
  enchantment({
    id: "luck_of_the_sea",
    nameZh: "海之眷顾",
    maxLevel: 3,
    itemMultiplier: 4,
    appliesTo: ["fishing_rod"],
    conflicts: []
  }),
  enchantment({
    id: "lure",
    nameZh: "饵钓",
    maxLevel: 3,
    itemMultiplier: 4,
    appliesTo: ["fishing_rod"],
    conflicts: []
  }),
  enchantment({
    id: "loyalty",
    nameZh: "忠诚",
    maxLevel: 3,
    itemMultiplier: 1,
    appliesTo: ["trident"],
    conflicts: ["riptide"]
  }),
  enchantment({
    id: "impaling",
    nameZh: "穿刺",
    maxLevel: 5,
    itemMultiplier: 2,
    appliesTo: ["trident"],
    conflicts: []
  }),
  enchantment({
    id: "riptide",
    nameZh: "激流",
    maxLevel: 3,
    itemMultiplier: 4,
    appliesTo: ["trident"],
    conflicts: ["loyalty", "channeling"]
  }),
  enchantment({
    id: "channeling",
    nameZh: "引雷",
    maxLevel: 1,
    itemMultiplier: 8,
    appliesTo: ["trident"],
    conflicts: ["riptide"]
  }),
  enchantment({
    id: "multishot",
    nameZh: "多重射击",
    maxLevel: 1,
    itemMultiplier: 4,
    appliesTo: ["crossbow"],
    conflicts: ["piercing"]
  }),
  enchantment({
    id: "quick_charge",
    nameZh: "快速装填",
    maxLevel: 3,
    itemMultiplier: 2,
    appliesTo: ["crossbow"],
    conflicts: []
  }),
  enchantment({
    id: "piercing",
    nameZh: "穿透",
    maxLevel: 4,
    itemMultiplier: 1,
    appliesTo: ["crossbow"],
    conflicts: ["multishot"]
  }),
  enchantment({
    id: "mending",
    nameZh: "经验修补",
    maxLevel: 1,
    itemMultiplier: 4,
    treasure: true,
    appliesTo: allBreakable,
    conflicts: ["infinity"]
  }),
  enchantment({
    id: "vanishing_curse",
    nameZh: "消失诅咒",
    maxLevel: 1,
    itemMultiplier: 8,
    curse: true,
    appliesTo: allBreakable,
    conflicts: []
  }),
  enchantment({
    id: "density",
    nameZh: "致密",
    maxLevel: 5,
    itemMultiplier: 2,
    appliesTo: ["mace"],
    conflicts: ["breach", "smite", "bane_of_arthropods"]
  }),
  enchantment({
    id: "breach",
    nameZh: "破甲",
    maxLevel: 4,
    itemMultiplier: 4,
    appliesTo: ["mace"],
    conflicts: ["density", "smite", "bane_of_arthropods"]
  }),
  enchantment({
    id: "wind_burst",
    nameZh: "风爆",
    maxLevel: 3,
    itemMultiplier: 8,
    bookMultiplier: 4,
    treasure: true,
    appliesTo: ["mace"],
    conflicts: []
  })
];

export const ENCHANTMENT_BY_ID = Object.fromEntries(
  ENCHANTMENTS.map((enchantmentDef) => [enchantmentDef.id, enchantmentDef])
) as Record<string, EnchantmentDefinition>;

