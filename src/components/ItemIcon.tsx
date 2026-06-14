interface ItemIconProps {
  iconId: string;
  itemId?: string;
  label: string;
}

const REFERENCE_ICONS = {
  sword: true,
  axe: true,
  pickaxe: true,
  shovel: true,
  hoe: true,
  mace: true,
  bow: true,
  crossbow: true,
  trident: true,
  fishing_rod: true,
  carrot_on_a_stick: true,
  warped_fungus_on_a_stick: true,
  helmet: true,
  chestplate: true,
  leggings: true,
  boots: true,
  elytra: true,
  shield: true,
  shears: true,
  flint_and_steel: true,
  brush: true,
  enchanted_book: true
} as const;

type ReferenceIconId = keyof typeof REFERENCE_ICONS;

const ICON_URLS = import.meta.glob("../assets/item-icons/**/*.png", {
  eager: true,
  import: "default",
  query: "?url"
}) as Record<string, string>;

const ICON_ALIASES: Record<string, ReferenceIconId> = {};

const MATERIAL_PREFIXES = [
  "netherite",
  "diamond",
  "golden",
  "iron",
  "stone",
  "wooden",
  "chainmail",
  "leather"
] as const;

function resolveIconId(iconId: string): ReferenceIconId {
  if (iconId in REFERENCE_ICONS) {
    return iconId as ReferenceIconId;
  }

  return ICON_ALIASES[iconId] ?? "sword";
}

function resolveMaterialId(itemId?: string): string | null {
  if (!itemId) {
    return null;
  }

  if (itemId === "turtle_helmet") {
    return "turtle";
  }

  return (
    MATERIAL_PREFIXES.find((prefix) => itemId.startsWith(`${prefix}_`)) ?? null
  );
}

function getIconUrl(iconId: ReferenceIconId, materialId: string | null) {
  const variantUrl =
    materialId &&
    ICON_URLS[`../assets/item-icons/variants/${iconId}_${materialId}.png`];

  return (
    variantUrl ??
    ICON_URLS[`../assets/item-icons/${iconId}.png`] ??
    ICON_URLS["../assets/item-icons/sword.png"]
  );
}

export function ItemIcon({ iconId, itemId, label }: ItemIconProps) {
  const resolvedIconId = resolveIconId(iconId);
  const materialId = resolveMaterialId(itemId);

  return (
    <span className="item-icon" role="img" aria-label={label}>
      <img
        aria-hidden="true"
        className="item-icon__image"
        draggable={false}
        src={getIconUrl(resolvedIconId, materialId)}
        alt=""
      />
    </span>
  );
}
