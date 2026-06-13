import { ENCHANTMENT_BY_ID } from "../data/enchantments";
import { ITEM_BY_ID } from "../data/items";
import type { MergeObject } from "./types";

export function toRoman(level: number): string {
  const numerals: Array<[number, string]> = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];

  let remaining = level;
  let result = "";
  for (const [value, numeral] of numerals) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return result;
}

export function formatEnchantment(id: string, level: number): string {
  const enchantment = ENCHANTMENT_BY_ID[id];
  if (!enchantment) {
    return `${id} ${level}`;
  }

  return `${enchantment.nameZh} ${toRoman(level)}`;
}

export function formatEnchantments(enchantments: Record<string, number>): string {
  const entries = Object.entries(enchantments);
  if (entries.length === 0) {
    return "";
  }

  return entries
    .sort(([a], [b]) => ENCHANTMENT_BY_ID[a].nameZh.localeCompare(ENCHANTMENT_BY_ID[b].nameZh, "zh-Hans-CN"))
    .map(([id, level]) => formatEnchantment(id, level))
    .join("、");
}

export function describeMergeObject(object: MergeObject): string {
  if (object.kind === "item") {
    const itemName = object.itemId ? ITEM_BY_ID[object.itemId]?.nameZh : "物品";
    const enchantmentText = formatEnchantments(object.enchantments);
    return enchantmentText ? `${itemName}（${enchantmentText}）` : itemName;
  }

  const enchantmentText = formatEnchantments(object.enchantments);
  return enchantmentText ? `附魔书（${enchantmentText}）` : "附魔书";
}

