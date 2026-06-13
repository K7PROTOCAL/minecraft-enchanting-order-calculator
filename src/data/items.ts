import type { EnchantableItem, ItemCategory } from "../domain/types";

const toolMaterials = [
  ["wooden", "木"],
  ["stone", "石"],
  ["iron", "铁"],
  ["golden", "金"],
  ["diamond", "钻石"],
  ["netherite", "下界合金"]
] as const;

const armorMaterials = [
  ["leather", "皮革"],
  ["chainmail", "锁链"],
  ["iron", "铁"],
  ["golden", "金"],
  ["diamond", "钻石"],
  ["netherite", "下界合金"]
] as const;

function item(
  id: string,
  nameZh: string,
  category: ItemCategory,
  iconId = category
): EnchantableItem {
  return { id, nameZh, category, iconId };
}

function materialItems(
  suffix: string,
  nameSuffixZh: string,
  category: ItemCategory,
  materials: readonly (readonly [string, string])[] = toolMaterials
): EnchantableItem[] {
  return materials.map(([materialId, materialName]) =>
    item(
      `${materialId}_${suffix}`,
      `${materialName}${nameSuffixZh}`,
      category,
      category
    )
  );
}

export const ITEMS: EnchantableItem[] = [
  ...materialItems("sword", "剑", "sword"),
  ...materialItems("axe", "斧", "axe"),
  ...materialItems("pickaxe", "镐", "pickaxe"),
  ...materialItems("shovel", "锹", "shovel"),
  ...materialItems("hoe", "锄", "hoe"),
  item("mace", "重锤", "mace"),
  item("bow", "弓", "bow"),
  item("crossbow", "弩", "crossbow"),
  item("trident", "三叉戟", "trident"),
  item("fishing_rod", "钓鱼竿", "fishing_rod"),
  ...materialItems("helmet", "头盔", "helmet", armorMaterials),
  item("turtle_helmet", "海龟壳", "helmet", "helmet"),
  ...materialItems("chestplate", "胸甲", "chestplate", armorMaterials),
  ...materialItems("leggings", "护腿", "leggings", armorMaterials),
  ...materialItems("boots", "靴子", "boots", armorMaterials),
  item("elytra", "鞘翅", "elytra"),
  item("shield", "盾牌", "shield"),
  item("shears", "剪刀", "shears"),
  item("flint_and_steel", "打火石", "flint_and_steel"),
  item("carrot_on_a_stick", "胡萝卜钓竿", "carrot_on_a_stick"),
  item("warped_fungus_on_a_stick", "诡异菌钓竿", "warped_fungus_on_a_stick"),
  item("brush", "刷子", "brush")
];

export const ITEM_BY_ID = Object.fromEntries(
  ITEMS.map((itemDef) => [itemDef.id, itemDef])
) as Record<string, EnchantableItem>;

export const ITEM_CATEGORY_LABELS: Record<ItemCategory, string> = {
  sword: "剑",
  axe: "斧",
  pickaxe: "镐",
  shovel: "锹",
  hoe: "锄",
  mace: "重锤",
  bow: "弓",
  crossbow: "弩",
  trident: "三叉戟",
  fishing_rod: "钓鱼竿",
  helmet: "头盔",
  chestplate: "胸甲",
  leggings: "护腿",
  boots: "靴子",
  elytra: "鞘翅",
  shield: "盾牌",
  shears: "剪刀",
  flint_and_steel: "打火石",
  carrot_on_a_stick: "胡萝卜钓竿",
  warped_fungus_on_a_stick: "诡异菌钓竿",
  brush: "刷子"
};
