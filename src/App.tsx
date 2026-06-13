import {
  Calculator,
  CircleAlert,
  FlaskConical,
  RotateCcw,
  Search,
  ShieldCheck
} from "lucide-react";
import { useMemo, useState } from "react";
import { ItemIcon } from "./components/ItemIcon";
import { ENCHANTMENT_BY_ID } from "./data/enchantments";
import { ITEM_BY_ID, ITEM_CATEGORY_LABELS, ITEMS } from "./data/items";
import { ANVIL_LIMIT, calculateBestOrder } from "./domain/anvil";
import { describeMergeObject, toRoman } from "./domain/format";
import {
  getApplicableEnchantments,
  getConflictReason
} from "./domain/selection";
import type { CalculationResult, ItemCategory } from "./domain/types";

const MAX_SELECTED_ENCHANTMENTS = 12;
const DEFAULT_ITEM_ID = "diamond_sword";

export function App() {
  const [selectedItemId, setSelectedItemId] = useState(DEFAULT_ITEM_ID);
  const [category, setCategory] = useState<ItemCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedLevels, setSelectedLevels] = useState<Record<string, number>>(
    {}
  );
  const [result, setResult] = useState<CalculationResult | null>(null);

  const selectedItem = ITEM_BY_ID[selectedItemId] ?? ITEMS[0];
  const selectedIds = Object.keys(selectedLevels);

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return ITEMS.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.nameZh.toLowerCase().includes(normalizedSearch) ||
        item.id.includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const applicableEnchantments = useMemo(
    () => getApplicableEnchantments(selectedItem),
    [selectedItem]
  );

  function chooseItem(itemId: string) {
    setSelectedItemId(itemId);
    setSelectedLevels({});
    setResult(null);
  }

  function toggleEnchantment(enchantmentId: string) {
    const checked = enchantmentId in selectedLevels;
    const definition = ENCHANTMENT_BY_ID[enchantmentId];

    setResult(null);
    setSelectedLevels((current) => {
      if (checked) {
        const next = { ...current };
        delete next[enchantmentId];
        return next;
      }

      if (Object.keys(current).length >= MAX_SELECTED_ENCHANTMENTS) {
        return current;
      }

      return { ...current, [enchantmentId]: definition.maxLevel };
    });
  }

  function setLevel(enchantmentId: string, level: number) {
    setResult(null);
    setSelectedLevels((current) => ({ ...current, [enchantmentId]: level }));
  }

  function calculate() {
    const selections = Object.entries(selectedLevels).map(
      ([enchantmentId, level]) => ({ enchantmentId, level })
    );
    setResult(calculateBestOrder(selectedItem.id, selections));
  }

  function reset() {
    setSelectedLevels({});
    setResult(null);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Java Edition 26.1.2 规则</p>
          <h1>附魔顺序计算器</h1>
        </div>
        <div className="topbar__meta">
          <ShieldCheck size={18} aria-hidden="true" />
          <span>每步铁砧 ≤ {ANVIL_LIMIT} 级</span>
        </div>
      </header>

      <section className="workspace" aria-label="附魔计算器">
        <aside className="panel item-panel" aria-label="选择物品">
          <div className="panel__header">
            <div>
              <p className="eyebrow">第一步</p>
              <h2>选择物品</h2>
            </div>
            <div className="selected-item-chip">
              <ItemIcon
                iconId={selectedItem.iconId}
                itemId={selectedItem.id}
                label={selectedItem.nameZh}
              />
              <span>{selectedItem.nameZh}</span>
            </div>
          </div>

          <label className="search-box">
            <Search size={16} aria-hidden="true" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜索物品"
            />
          </label>

          <div className="category-tabs" aria-label="物品分类">
            <button
              className={category === "all" ? "active" : ""}
              onClick={() => setCategory("all")}
              type="button"
            >
              全部
            </button>
            {Object.entries(ITEM_CATEGORY_LABELS).map(([categoryId, label]) => (
              <button
                key={categoryId}
                className={category === categoryId ? "active" : ""}
                onClick={() => setCategory(categoryId as ItemCategory)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="item-grid">
            {filteredItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`item-tile ${
                  item.id === selectedItem.id ? "item-tile--active" : ""
                }`}
                onClick={() => chooseItem(item.id)}
              >
                <ItemIcon iconId={item.iconId} itemId={item.id} label={item.nameZh} />
                <span>{item.nameZh}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="panel enchant-panel" aria-label="选择附魔">
          <div className="panel__header">
            <div>
              <p className="eyebrow">第二步</p>
              <h2>选择附魔</h2>
            </div>
            <span className="count-pill">
              {selectedIds.length}/{MAX_SELECTED_ENCHANTMENTS}
            </span>
          </div>

          <div className="enchantment-list">
            {applicableEnchantments.map((enchantment) => {
              const checked = enchantment.id in selectedLevels;
              const conflictReason = checked
                ? null
                : getConflictReason(enchantment.id, selectedIds);
              const overLimit =
                !checked && selectedIds.length >= MAX_SELECTED_ENCHANTMENTS;
              const disabled = Boolean(conflictReason) || overLimit;

              return (
                <div
                  className={`enchantment-row ${
                    disabled ? "enchantment-row--disabled" : ""
                  }`}
                  key={enchantment.id}
                >
                  <label className="check-line">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggleEnchantment(enchantment.id)}
                    />
                    <span>
                      {enchantment.nameZh}
                      {enchantment.treasure ? " · 宝藏" : ""}
                      {enchantment.curse ? " · 诅咒" : ""}
                    </span>
                  </label>

                  <select
                    value={checked ? selectedLevels[enchantment.id] : ""}
                    disabled={!checked}
                    onChange={(event) =>
                      setLevel(enchantment.id, Number(event.target.value))
                    }
                    aria-label={`${enchantment.nameZh} 等级`}
                  >
                    {Array.from({ length: enchantment.maxLevel }, (_, index) => {
                      const level = index + 1;
                      return (
                        <option value={level} key={level}>
                          {toRoman(level)}
                        </option>
                      );
                    })}
                  </select>

                  <p className="row-note">
                    {conflictReason ??
                      (overLimit ? "已达到第一版的附魔数量上限" : " ")}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="action-row">
            <button className="secondary-button" type="button" onClick={reset}>
              <RotateCcw size={16} aria-hidden="true" />
              重置
            </button>
            <button
              className="primary-button"
              type="button"
              onClick={calculate}
              disabled={selectedIds.length === 0}
            >
              <Calculator size={17} aria-hidden="true" />
              计算最佳顺序
            </button>
          </div>
        </section>

        <section className="panel result-panel" aria-label="计算结果">
          <div className="panel__header">
            <div>
              <p className="eyebrow">第三步</p>
              <h2>结果</h2>
            </div>
            <FlaskConical size={22} aria-hidden="true" />
          </div>

          {!result && (
            <div className="empty-state">
              <CircleAlert size={28} aria-hidden="true" />
              <p>选择附魔后点击计算，这里会显示最低总铁砧等级成本。</p>
            </div>
          )}

          {result?.ok === false && (
            <div className="notice notice--error">
              <CircleAlert size={20} aria-hidden="true" />
              <span>{result.reason}</span>
            </div>
          )}

          {result?.ok && (
            <div className="result-content">
              <div className="total-banner">
                <span>总铁砧等级成本</span>
                <strong>{result.totalCost}</strong>
              </div>

              <ol className="steps">
                {result.steps.map((step, index) => (
                  <li key={`${index}-${step.cumulativeCost}`}>
                    <div className="step-title">第 {index + 1} 步</div>
                    <p>
                      左槽：{describeMergeObject(step.left)}
                      <br />
                      右槽：{describeMergeObject(step.right)}
                    </p>
                    <div className="step-costs">
                      <span>本次 {step.cost} 级</span>
                      <span>累计 {step.cumulativeCost} 级</span>
                      <span>≤ {ANVIL_LIMIT} 级</span>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="final-item">
                成品：{describeMergeObject(result.result)}
              </div>
            </div>
          )}
        </section>
      </section>

      <footer className="disclaimer">
        本工具不是 Minecraft 官方产品，未获得 Mojang 或 Microsoft 的批准，也与 Mojang 或 Microsoft 无关联。图标为自制卡通风格图标，材质配色参考游戏物品印象。
      </footer>
    </main>
  );
}
