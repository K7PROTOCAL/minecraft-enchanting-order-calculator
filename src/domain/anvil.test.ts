import { describe, expect, it } from "vitest";
import { ITEM_BY_ID } from "../data/items";
import {
  calculateBestOrder,
  createInitialBook,
  createInitialItem,
  priorWorkPenalty,
  tryMerge
} from "./anvil";

describe("anvil calculator", () => {
  it("calculates a simple one-book item merge", () => {
    const result = calculateBestOrder("diamond_sword", [
      { enchantmentId: "sharpness", level: 5 }
    ]);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.totalCost).toBe(5);
      expect(result.steps).toHaveLength(1);
      expect(result.result.enchantments.sharpness).toBe(5);
      expect(result.result.anvilUseCount).toBe(1);
      expect(result.result.priorWorkPenalty).toBe(1);
    }
  });

  it("distinguishes left and right slots for book merges", () => {
    const soulSpeedBook = createInitialBook({
      enchantmentId: "soul_speed",
      level: 3
    });
    const mendingBook = createInitialBook({
      enchantmentId: "mending",
      level: 1
    });

    const cheapDirection = tryMerge(soulSpeedBook, mendingBook);
    const expensiveDirection = tryMerge(mendingBook, soulSpeedBook);

    expect(cheapDirection?.cost).toBe(2);
    expect(expensiveDirection?.cost).toBe(12);
  });

  it("updates anvil use count and prior work penalty from both operands", () => {
    const item = {
      ...createInitialItem(ITEM_BY_ID.diamond_sword),
      anvilUseCount: 1,
      priorWorkPenalty: priorWorkPenalty(1)
    };
    const book = {
      ...createInitialBook({ enchantmentId: "sharpness", level: 5 }),
      anvilUseCount: 3,
      priorWorkPenalty: priorWorkPenalty(3)
    };

    const merge = tryMerge(item, book);

    expect(merge).not.toBeNull();
    expect(merge?.result.anvilUseCount).toBe(4);
    expect(merge?.result.priorWorkPenalty).toBe(15);
  });

  it("rejects single operations above the 39-level survival limit", () => {
    const item = {
      ...createInitialItem(ITEM_BY_ID.mace),
      anvilUseCount: 5,
      priorWorkPenalty: priorWorkPenalty(5)
    };
    const book = createInitialBook({ enchantmentId: "wind_burst", level: 3 });

    expect(tryMerge(item, book)).toBeNull();
  });

  it("can use intermediate mixed-enchantment books in the optimal path", () => {
    const result = calculateBestOrder("diamond_boots", [
      { enchantmentId: "protection", level: 4 },
      { enchantmentId: "feather_falling", level: 4 },
      { enchantmentId: "depth_strider", level: 3 },
      { enchantmentId: "soul_speed", level: 3 },
      { enchantmentId: "unbreaking", level: 3 },
      { enchantmentId: "mending", level: 1 }
    ]);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(
        result.steps.some(
          (step) =>
            step.result.kind === "book" &&
            Object.keys(step.result.enchantments).length > 1
        )
      ).toBe(true);
      expect(result.steps.every((step) => step.cost <= 39)).toBe(true);
    }
  });
});

