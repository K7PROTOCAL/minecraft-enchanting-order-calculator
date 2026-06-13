import { describe, expect, it } from "vitest";
import { ENCHANTMENTS } from "./enchantments";
import { ITEMS } from "./items";
import { getApplicableEnchantments } from "../domain/selection";

describe("enchantment data", () => {
  it("defines the expected vanilla Java enchantment set size", () => {
    expect(ENCHANTMENTS).toHaveLength(42);
  });

  it("has valid max levels and cost multipliers", () => {
    for (const enchantment of ENCHANTMENTS) {
      expect(enchantment.nameZh.length).toBeGreaterThan(0);
      expect(enchantment.maxLevel).toBeGreaterThanOrEqual(1);
      expect(enchantment.itemMultiplier).toBeGreaterThanOrEqual(1);
      expect(enchantment.bookMultiplier).toBeGreaterThanOrEqual(1);
      expect(enchantment.appliesTo.length).toBeGreaterThan(0);
    }
  });

  it("keeps conflict relationships reciprocal", () => {
    for (const enchantment of ENCHANTMENTS) {
      for (const conflictId of enchantment.conflicts) {
        const conflict = ENCHANTMENTS.find((candidate) => candidate.id === conflictId);
        expect(conflict, `${enchantment.id} conflict ${conflictId}`).toBeDefined();
        expect(conflict?.conflicts).toContain(enchantment.id);
      }
    }
  });

  it("has at least one applicable enchantment for every selectable item", () => {
    for (const item of ITEMS) {
      expect(getApplicableEnchantments(item).length, item.id).toBeGreaterThan(0);
    }
  });
});

