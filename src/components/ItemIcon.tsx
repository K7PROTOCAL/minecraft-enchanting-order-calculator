import { useId } from "react";

interface ItemIconProps {
  iconId: string;
  itemId?: string;
  label: string;
}

type IconKind =
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

interface IconPalette {
  primary: string;
  secondary: string;
  dark: string;
  handle: string;
  accent: string;
  highlight: string;
}

interface IconIds {
  card: string;
  cardGlow: string;
  material: string;
  materialSoft: string;
  handle: string;
  leather: string;
  shadow: string;
}

interface IconRenderProps {
  palette: IconPalette;
  ids: IconIds;
}

const ICON_KINDS = new Set<IconKind>([
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
]);

const COLORS = {
  outline: "#535960",
  outlineDark: "#303942",
  cardStroke: "#a6cdf0",
  cardFillTop: "#ffffff",
  cardFillBottom: "#eef8ff",
  steel: "#9aa4af",
  steelLight: "#e8edf2",
  steelDark: "#5c6570",
  wood: "#a8682d",
  woodLight: "#d8954b",
  woodDark: "#6f3c15",
  leather: "#9b5c29",
  leatherLight: "#d08a42",
  gold: "#efb42b",
  cyan: "#22bfd2",
  orange: "#ef8a1f",
  flame: "#ffd866",
  green: "#3fa768",
  purple: "#5d4f68",
  flint: "#59616b"
};

const DEFAULT_PALETTE: IconPalette = {
  primary: COLORS.steel,
  secondary: COLORS.steelLight,
  dark: COLORS.steelDark,
  handle: COLORS.wood,
  accent: "#ccd3db",
  highlight: "#ffffff"
};

const MATERIAL_PALETTES: Record<string, IconPalette> = {
  wooden: {
    primary: "#9c5d28",
    secondary: "#d0873d",
    dark: "#603316",
    handle: "#7b4319",
    accent: "#e2a259",
    highlight: "#f2c58c"
  },
  stone: {
    primary: "#838b93",
    secondary: "#c1c8cf",
    dark: "#4c535b",
    handle: COLORS.wood,
    accent: "#d7dce1",
    highlight: "#ffffff"
  },
  iron: {
    primary: "#b9c2cc",
    secondary: "#edf2f6",
    dark: "#606a75",
    handle: COLORS.wood,
    accent: "#d5dde5",
    highlight: "#ffffff"
  },
  golden: {
    primary: "#e8a91f",
    secondary: "#ffd85c",
    dark: "#8b5706",
    handle: COLORS.wood,
    accent: "#ffe994",
    highlight: "#fff5bf"
  },
  diamond: {
    primary: "#18bfd3",
    secondary: "#7de7ef",
    dark: "#087383",
    handle: COLORS.wood,
    accent: "#c2fbff",
    highlight: "#f0ffff"
  },
  netherite: {
    primary: "#55485f",
    secondary: "#807187",
    dark: "#27202f",
    handle: COLORS.wood,
    accent: "#a99ab1",
    highlight: "#d8cce0"
  },
  leather: {
    primary: "#9a5e31",
    secondary: "#cf8844",
    dark: "#5d3419",
    handle: COLORS.wood,
    accent: "#e0a765",
    highlight: "#f5c98f"
  },
  chainmail: {
    primary: "#8b96a3",
    secondary: "#c8d0da",
    dark: "#4d5762",
    handle: COLORS.wood,
    accent: "#e1e7ee",
    highlight: "#ffffff"
  },
  turtle: {
    primary: "#48a362",
    secondary: "#92d99e",
    dark: "#1f6839",
    handle: COLORS.wood,
    accent: "#c1f1c9",
    highlight: "#f0fff4"
  }
};

const FIXED_PALETTES: Partial<Record<IconKind, IconPalette>> = {
  mace: DEFAULT_PALETTE,
  bow: {
    primary: COLORS.leather,
    secondary: COLORS.leatherLight,
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: "#e6d4b7",
    highlight: "#ffd99f"
  },
  crossbow: {
    primary: COLORS.leather,
    secondary: COLORS.leatherLight,
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.gold,
    highlight: "#ffd99f"
  },
  trident: {
    primary: COLORS.steel,
    secondary: COLORS.steelLight,
    dark: COLORS.steelDark,
    handle: COLORS.wood,
    accent: "#d9edf3",
    highlight: "#ffffff"
  },
  fishing_rod: {
    primary: COLORS.leather,
    secondary: COLORS.leatherLight,
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.steel,
    highlight: "#ffd99f"
  },
  elytra: {
    primary: "#8fb3d6",
    secondary: "#d2e7fb",
    dark: "#284f72",
    handle: COLORS.wood,
    accent: "#eef7ff",
    highlight: "#ffffff"
  },
  shield: {
    primary: COLORS.leather,
    secondary: COLORS.leatherLight,
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.steelLight,
    highlight: "#ffe0ad"
  },
  shears: DEFAULT_PALETTE,
  flint_and_steel: DEFAULT_PALETTE,
  carrot_on_a_stick: {
    primary: COLORS.leather,
    secondary: COLORS.leatherLight,
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.orange,
    highlight: COLORS.green
  },
  warped_fungus_on_a_stick: {
    primary: COLORS.leather,
    secondary: COLORS.leatherLight,
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: "#48b985",
    highlight: "#7760c6"
  },
  brush: {
    primary: COLORS.orange,
    secondary: "#ffc36c",
    dark: "#94501a",
    handle: COLORS.wood,
    accent: "#ffe3bb",
    highlight: "#fff2da"
  }
};

function getIconKind(iconId: string): IconKind {
  return ICON_KINDS.has(iconId as IconKind) ? (iconId as IconKind) : "sword";
}

function getMaterialId(itemId?: string): string | null {
  if (!itemId) {
    return null;
  }

  if (itemId === "turtle_helmet") {
    return "turtle";
  }

  return (
    [
      "netherite",
      "diamond",
      "golden",
      "iron",
      "stone",
      "wooden",
      "chainmail",
      "leather"
    ].find((prefix) => itemId.startsWith(`${prefix}_`)) ?? null
  );
}

function getPalette(kind: IconKind, itemId?: string): IconPalette {
  const material = getMaterialId(itemId);
  if (material && MATERIAL_PALETTES[material]) {
    return MATERIAL_PALETTES[material];
  }

  return FIXED_PALETTES[kind] ?? DEFAULT_PALETTE;
}

function paint(id: string) {
  return `url(#${id})`;
}

function makeIconIds(baseId: string): IconIds {
  const safeId = baseId.replace(/[^a-zA-Z0-9_-]/g, "");

  return {
    card: `card-${safeId}`,
    cardGlow: `card-glow-${safeId}`,
    material: `material-${safeId}`,
    materialSoft: `material-soft-${safeId}`,
    handle: `handle-${safeId}`,
    leather: `leather-${safeId}`,
    shadow: `shadow-${safeId}`
  };
}

export function ItemIcon({ iconId, itemId, label }: ItemIconProps) {
  const kind = getIconKind(iconId);
  const palette = getPalette(kind, itemId);
  const ids = makeIconIds(useId());

  return (
    <span className="item-icon" role="img" aria-label={label}>
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={ids.card} x1="10" y1="8" x2="90" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={COLORS.cardFillTop} />
            <stop offset="0.56" stopColor="#f7fbff" />
            <stop offset="1" stopColor={COLORS.cardFillBottom} />
          </linearGradient>
          <radialGradient id={ids.cardGlow} cx="33%" cy="23%" r="62%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="0.62" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={ids.material} x1="25" y1="10" x2="73" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={palette.highlight} />
            <stop offset="0.34" stopColor={palette.secondary} />
            <stop offset="1" stopColor={palette.primary} />
          </linearGradient>
          <linearGradient id={ids.materialSoft} x1="18" y1="15" x2="83" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={palette.highlight} />
            <stop offset="0.48" stopColor={palette.accent} />
            <stop offset="1" stopColor={palette.primary} />
          </linearGradient>
          <linearGradient id={ids.handle} x1="24" y1="12" x2="72" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f3b665" />
            <stop offset="0.48" stopColor={palette.handle} />
            <stop offset="1" stopColor={COLORS.woodDark} />
          </linearGradient>
          <linearGradient id={ids.leather} x1="18" y1="14" x2="75" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={COLORS.leatherLight} />
            <stop offset="0.55" stopColor={COLORS.leather} />
            <stop offset="1" stopColor={COLORS.woodDark} />
          </linearGradient>
          <filter id={ids.shadow} x="-25%" y="-25%" width="150%" height="155%" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor="#172033" floodOpacity="0.22" />
          </filter>
        </defs>

        <rect x="7" y="7" width="86" height="86" rx="17" fill={paint(ids.card)} stroke={COLORS.cardStroke} strokeWidth="3.2" />
        <rect x="10" y="10" width="80" height="80" rx="15" fill={paint(ids.cardGlow)} stroke="none" />
        <g filter={paint(ids.shadow)} transform="translate(50 50) scale(1.12) translate(-50 -50)">
          {renderIcon(kind, palette, ids)}
        </g>
      </svg>
    </span>
  );
}

function renderIcon(kind: IconKind, palette: IconPalette, ids: IconIds) {
  const props = { palette, ids };

  switch (kind) {
    case "axe":
      return <AxeIcon {...props} />;
    case "pickaxe":
      return <PickaxeIcon {...props} />;
    case "shovel":
      return <ShovelIcon {...props} />;
    case "hoe":
      return <HoeIcon {...props} />;
    case "mace":
      return <MaceIcon {...props} />;
    case "bow":
      return <BowIcon {...props} />;
    case "crossbow":
      return <CrossbowIcon {...props} />;
    case "trident":
      return <TridentIcon {...props} />;
    case "fishing_rod":
      return <FishingRodIcon {...props} />;
    case "helmet":
      return <HelmetIcon {...props} />;
    case "chestplate":
      return <ChestplateIcon {...props} />;
    case "leggings":
      return <LeggingsIcon {...props} />;
    case "boots":
      return <BootsIcon {...props} />;
    case "elytra":
      return <ElytraIcon {...props} />;
    case "shield":
      return <ShieldIcon {...props} />;
    case "shears":
      return <ShearsIcon {...props} />;
    case "flint_and_steel":
      return <FlintAndSteelIcon {...props} />;
    case "carrot_on_a_stick":
      return <CarrotRodIcon {...props} />;
    case "warped_fungus_on_a_stick":
      return <FungusRodIcon {...props} />;
    case "brush":
      return <BrushIcon {...props} />;
    case "sword":
    default:
      return <SwordIcon {...props} />;
  }
}

function Shaft({
  d,
  ids,
  width = 10,
  cap = "round"
}: {
  d: string;
  ids: IconIds;
  width?: number;
  cap?: "round" | "butt";
}) {
  return (
    <>
      <path d={d} fill="none" stroke={COLORS.outlineDark} strokeWidth={width + 5} strokeLinecap={cap} strokeLinejoin="round" />
      <path d={d} fill="none" stroke={paint(ids.handle)} strokeWidth={width} strokeLinecap={cap} strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#e9a85b" strokeWidth="2.2" strokeLinecap={cap} strokeLinejoin="round" opacity="0.8" />
    </>
  );
}

function MetalStroke({
  d,
  palette,
  ids,
  width = 8,
  cap = "round"
}: IconRenderProps & {
  d: string;
  width?: number;
  cap?: "round" | "butt";
}) {
  return (
    <>
      <path d={d} fill="none" stroke={palette.dark} strokeWidth={width + 5} strokeLinecap={cap} strokeLinejoin="round" />
      <path d={d} fill="none" stroke={paint(ids.material)} strokeWidth={width} strokeLinecap={cap} strokeLinejoin="round" />
      <path d={d} fill="none" stroke={palette.highlight} strokeWidth="2.1" strokeLinecap={cap} strokeLinejoin="round" opacity="0.72" />
    </>
  );
}

function Screw({ cx, cy, color = COLORS.steelLight }: { cx: number; cy: number; color?: string }) {
  return <circle cx={cx} cy={cy} r="2.2" fill={color} stroke={COLORS.outline} strokeWidth="1.5" />;
}

function SwordIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M64 12c4.7-0.8 8.2 1 10.6 4.1-0.2 8.9-5.1 16.4-13.2 24.5L43.6 59.1 34.9 50.4 52.5 26.2C56.3 20.9 59.6 15.1 64 12Z"
        fill={paint(ids.material)}
        stroke={palette.dark}
        strokeWidth="4.1"
        strokeLinejoin="round"
      />
      <path d="M64.6 18.2 43.5 49.2" fill="none" stroke={palette.highlight} strokeWidth="4" strokeLinecap="round" opacity="0.88" />
      <path d="M56.1 27.2 63.5 36" fill="none" stroke={palette.dark} strokeWidth="2.1" strokeLinecap="round" opacity="0.34" />
      <path d="M28.5 50.6 47.8 69.9" fill="none" stroke={COLORS.outlineDark} strokeWidth="14" strokeLinecap="round" />
      <path d="M29.5 51.6 46.8 68.9" fill="none" stroke={paint(ids.materialSoft)} strokeWidth="9.2" strokeLinecap="round" />
      <path d="M35.4 65.5 24.5 76.5" fill="none" stroke={COLORS.outlineDark} strokeWidth="13.5" strokeLinecap="round" />
      <path d="M35.4 65.5 24.5 76.5" fill="none" stroke={paint(ids.handle)} strokeWidth="9" strokeLinecap="round" />
      <path d="M30.6 66.7 25 72.4" fill="none" stroke="#efb36d" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="20.5" cy="81" r="8" fill={paint(ids.materialSoft)} stroke={COLORS.outline} strokeWidth="3.7" />
      <circle cx="18.3" cy="78.2" r="2.8" fill="#ffffff" stroke="none" opacity="0.55" />
    </>
  );
}

function AxeIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(42 50 50)">
      <Shaft d="M49 23 49 80" ids={ids} width={11} />
      <path
        d="M30.8 19.8c13.1-7.2 30.1-3.9 39.8 7.3-1.8 10.6-10 20.4-24.5 23.5-4.9-5.3-11.3-8.2-19.3-8.7 0.7-4.8 3.5-8.3 8.3-10.5-5.2-0.9-8.3-3-9.6-6.3 1.1-2 2.8-3.8 5.3-5.3Z"
        fill={paint(ids.material)}
        stroke={palette.dark}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect x="41.8" y="39.2" width="16.5" height="17.8" rx="4" fill={paint(ids.materialSoft)} stroke={palette.dark} strokeWidth="3.3" />
      <path d="M37 23.6c9-2.9 18.8-0.6 25.6 5.8" fill="none" stroke={palette.highlight} strokeWidth="3" strokeLinecap="round" opacity="0.82" />
      <path d="M46.2 45.2h8.2" fill="none" stroke={palette.highlight} strokeWidth="2.4" strokeLinecap="round" opacity="0.88" />
      <circle cx="49" cy="21" r="5.3" fill={paint(ids.handle)} stroke={COLORS.outlineDark} strokeWidth="3.2" />
    </g>
  );
}

function PickaxeIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(38 50 50)">
      <Shaft d="M48 23 48 83" ids={ids} width={11} />
      <path
        d="M16 34c18-16.4 47.6-19.5 69.4-5.6-9.8 0.7-18 5.4-24.6 14.2-11.6-5.9-25.7-3.8-42.4 6.3L16 34Z"
        fill={paint(ids.material)}
        stroke={palette.dark}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect x="40.2" y="38.2" width="16.2" height="15.4" rx="3.7" fill={paint(ids.materialSoft)} stroke={palette.dark} strokeWidth="3.2" />
      <path d="M27.2 34.2c15.8-7.3 32-7.9 47.7-1.4" fill="none" stroke={palette.highlight} strokeWidth="3" strokeLinecap="round" opacity="0.82" />
      <path d="M46 43h8" fill="none" stroke="#ffffff" strokeWidth="2.3" strokeLinecap="round" opacity="0.85" />
    </g>
  );
}

function ShovelIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(33 50 50)">
      <Shaft d="M50 18 50 50" ids={ids} width={11} />
      <path
        d="M35.8 51.8c0-10.3 5.9-18.6 14.2-22.2 8.3 3.6 14.2 11.9 14.2 22.2 0 11-6.4 19.8-14.2 25.6-7.8-5.8-14.2-14.6-14.2-25.6Z"
        fill={paint(ids.material)}
        stroke={palette.dark}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M50.5 37.1c5.6 5.4 7.4 13 4.6 21.1" fill="none" stroke={palette.highlight} strokeWidth="3" strokeLinecap="round" opacity="0.78" />
      <path d="M47.2 48.2c-1 6.8 0.7 12.7 5 17.9" fill="none" stroke={palette.dark} strokeWidth="2.2" strokeLinecap="round" opacity="0.22" />
    </g>
  );
}

function HoeIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(37 50 50)">
      <Shaft d="M48 22 48 84" ids={ids} width={11} />
      <path
        d="M39 19.4c13.7-5.1 30.8-2.3 43.1 7.7-4.4 10.1-12.1 16.9-23.4 20.2-7.4-8.4-16.3-12.2-26.7-11.5L39 19.4Z"
        fill={paint(ids.material)}
        stroke={palette.dark}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M48.2 22.2c8.3-0.8 16.2 0.9 23.4 5" fill="none" stroke={palette.highlight} strokeWidth="3" strokeLinecap="round" opacity="0.82" />
    </g>
  );
}

function MaceIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(36 50 50)">
      <Shaft d="M48 38 48 83" ids={ids} width={11} />
      <rect x="27" y="15" width="41" height="33" rx="6.5" fill={paint(ids.material)} stroke={palette.dark} strokeWidth="4" />
      <path d="M23.4 25h48.2M23.4 39h48.2" fill="none" stroke={palette.dark} strokeWidth="3.8" strokeLinecap="round" opacity="0.55" />
      <path d="M36 21.6h20.5" fill="none" stroke={palette.highlight} strokeWidth="3" strokeLinecap="round" opacity="0.84" />
      <path d="M31 18.3h-7.2v9.6h7.2M65 18.3h7.2v9.6H65M31 36.1h-7.2v9.6h7.2M65 36.1h7.2v9.6H65" fill={paint(ids.materialSoft)} stroke={palette.dark} strokeWidth="3.2" strokeLinejoin="round" />
      <circle cx="37" cy="33" r="3.2" fill={palette.dark} stroke="none" opacity="0.5" />
      <circle cx="58" cy="33" r="3.2" fill={palette.dark} stroke="none" opacity="0.5" />
    </g>
  );
}

function BowIcon({ ids }: IconRenderProps) {
  return (
    <>
      <path d="M72 20c-29.8 9.5-44.5 37.8-30.6 60.5" fill="none" stroke={COLORS.outlineDark} strokeWidth="13" strokeLinecap="round" />
      <path d="M72 20c-29.8 9.5-44.5 37.8-30.6 60.5" fill="none" stroke={paint(ids.leather)} strokeWidth="8.2" strokeLinecap="round" />
      <path d="M72 20C61.8 45.4 54.7 62.8 41.4 80.5" fill="none" stroke={COLORS.woodDark} strokeWidth="3.3" strokeLinecap="round" opacity="0.9" />
      <path d="M72 20 41.4 80.5" fill="none" stroke="#5d3514" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M61.4 28.6c-8.3 8.2-14.3 18.1-18 29.6" fill="none" stroke="#dfa35d" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="70.5" cy="21.5" r="4.8" fill={paint(ids.leather)} stroke={COLORS.outlineDark} strokeWidth="3" />
      <circle cx="40.5" cy="79" r="4.8" fill={paint(ids.leather)} stroke={COLORS.outlineDark} strokeWidth="3" />
    </>
  );
}

function CrossbowIcon({ ids }: IconRenderProps) {
  return (
    <>
      <path d="M21 43c19.6-14.6 41.5-14.6 58 0" fill="none" stroke={COLORS.outlineDark} strokeWidth="13" strokeLinecap="round" />
      <path d="M21 43c19.6-14.6 41.5-14.6 58 0" fill="none" stroke={paint(ids.leather)} strokeWidth="8.2" strokeLinecap="round" />
      <path d="M33 37 73 74" fill="none" stroke={COLORS.outlineDark} strokeWidth="13" strokeLinecap="round" />
      <path d="M33 37 73 74" fill="none" stroke={paint(ids.handle)} strokeWidth="8.4" strokeLinecap="round" />
      <path d="M22.5 70.5 72.5 24" fill="none" stroke={COLORS.outlineDark} strokeWidth="4.8" strokeLinecap="round" />
      <path d="M31.5 62 72.5 24" fill="none" stroke="#d9dce0" strokeWidth="3" strokeLinecap="round" />
      <path d="M72 23.8 69.7 36.6 82.2 29.9Z" fill={COLORS.steelLight} stroke={COLORS.outlineDark} strokeWidth="3" strokeLinejoin="round" />
      <rect x="35" y="47.5" width="32" height="11.5" rx="5.5" fill={paint(ids.leather)} stroke={COLORS.outlineDark} strokeWidth="3.4" />
      <path d="M37 48.5c8.1 1.7 17.2 1.6 27.5-0.4" fill="none" stroke="#e3a662" strokeWidth="2.4" strokeLinecap="round" opacity="0.75" />
      <circle cx="22" cy="43" r="4" fill={COLORS.steel} stroke={COLORS.outlineDark} strokeWidth="2.5" />
      <circle cx="78" cy="43" r="4" fill={COLORS.steel} stroke={COLORS.outlineDark} strokeWidth="2.5" />
    </>
  );
}

function TridentIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(36 50 50)">
      <Shaft d="M48 39 48 84" ids={ids} width={9.5} />
      <MetalStroke d="M48 17 48 46" palette={palette} ids={ids} width={8.4} />
      <MetalStroke d="M30 20v17c0 9 36 9 36 0V20" palette={palette} ids={ids} width={8.4} />
      <path d="M48 10 40.3 22h15.4Z" fill={paint(ids.material)} stroke={palette.dark} strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 14 23.4 25h13.2Z" fill={paint(ids.material)} stroke={palette.dark} strokeWidth="3" strokeLinejoin="round" />
      <path d="M66 14 59.4 25h13.2Z" fill={paint(ids.material)} stroke={palette.dark} strokeWidth="3" strokeLinejoin="round" />
      <path d="M42 25.5c4.5 2.4 8.4 2.4 12 0" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
    </g>
  );
}

function FishingRodIcon({ ids }: IconRenderProps) {
  return (
    <>
      <path d="M32 19c24.2 14.7 39.3 34.8 44 60.7" fill="none" stroke={COLORS.outlineDark} strokeWidth="11.2" strokeLinecap="round" />
      <path d="M32 19c24.2 14.7 39.3 34.8 44 60.7" fill="none" stroke={paint(ids.handle)} strokeWidth="7.1" strokeLinecap="round" />
      <path d="M39.5 26c15 13.2 25.1 29 30.1 47.4" fill="none" stroke="#e1a15a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M72 51c1.4 13.5-3.1 23-13.4 28.4" fill="none" stroke={COLORS.outlineDark} strokeWidth="2.9" strokeLinecap="round" />
      <path d="M58.8 79.2c5.4-4.2 12.4-0.4 10.2 5.5-1.7 4.7-8.7 4.8-10.5-0.2" fill="none" stroke={COLORS.outlineDark} strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="50.5" cy="68" r="8.2" fill={paint(ids.materialSoft)} stroke={COLORS.outlineDark} strokeWidth="3.1" />
      <circle cx="50.5" cy="68" r="3.4" fill="#ffffff" stroke="none" opacity="0.65" />
      <circle cx="71.5" cy="51" r="4.2" fill={COLORS.steel} stroke={COLORS.outlineDark} strokeWidth="2.4" />
      <path d="M41.8 45.2 57 59" fill="none" stroke={COLORS.outlineDark} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    </>
  );
}

function HelmetIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M18.5 58.5c0-23.7 16.1-37.3 36-34.3 16.5 2.5 26.6 16.8 24.1 36.4l-7.2 16.5H27.5L18.5 58.5Z"
        fill={paint(ids.material)}
        stroke={palette.dark}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M22.5 59.5h52" fill="none" stroke={palette.dark} strokeWidth="8" strokeLinecap="round" opacity="0.58" />
      <path d="M23.5 57.8h50.2" fill="none" stroke={paint(ids.materialSoft)} strokeWidth="5.3" strokeLinecap="round" />
      <path d="M31.5 60.5v15M48.5 60.5v15M66.5 60.5v12" fill="none" stroke={palette.dark} strokeWidth="6.5" strokeLinecap="round" />
      <path d="M34.5 61.5v11M51.5 61.5v11" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" opacity="0.72" />
      <path d="M31 48.5c9.8-16.8 28.7-20.1 41.8-6.9" fill="none" stroke="#ffffff" strokeWidth="3.3" strokeLinecap="round" opacity="0.72" />
      <path d="M52 26.2c2.6 10.2 2.6 20.2 0 30" fill="none" stroke={palette.dark} strokeWidth="2.5" strokeLinecap="round" opacity="0.28" />
    </>
  );
}

function ChestplateIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path d="M20.5 31.8c8.9 4.7 16.1 2.6 22-5.9h15c5.9 8.5 13.2 10.6 22 5.9 7.1 15.6 7.9 31.5 2 47H18.5c-5.9-15.5-5.1-31.4 2-47Z" fill={paint(ids.material)} stroke={palette.dark} strokeWidth="4" strokeLinejoin="round" />
      <path d="M27.5 29.2c7.4 6.1 14.2 7.2 20.5 3.3M72.5 29.2c-7.4 6.1-14.2 7.2-20.5 3.3" fill="none" stroke={paint(ids.leather)} strokeWidth="6.4" strokeLinecap="round" />
      <path d="M49.8 30v46" fill="none" stroke={palette.dark} strokeWidth="2.4" strokeLinecap="round" opacity="0.25" />
      <path d="M24.5 40c4.4 12.2 4.5 23.3 0.5 33.4M75.5 40c-4.4 12.2-4.5 23.3-0.5 33.4" fill="none" stroke={palette.dark} strokeWidth="3" strokeLinecap="round" opacity="0.42" />
      <path d="M35 42c8.8 4.4 21.8 4.4 30.2 0M34.5 62.5h30" fill="none" stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" opacity="0.76" />
      <circle cx="35.5" cy="32" r="4.5" fill={paint(ids.materialSoft)} stroke={palette.dark} strokeWidth="2.4" />
      <circle cx="64.5" cy="32" r="4.5" fill={paint(ids.materialSoft)} stroke={palette.dark} strokeWidth="2.4" />
    </>
  );
}

function LeggingsIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path d="M26.5 27.5h46c4.2 20.3 3 38.7-3.8 55.2H55.6c-2.3-12.2-2.3-23.2 0-33h-9.3c-0.1 11.3-2.2 22.3-6.4 33H26.9c3.8-18.8 3.7-37.2-0.4-55.2Z" fill={paint(ids.material)} stroke={palette.dark} strokeWidth="4" strokeLinejoin="round" />
      <path d="M25.5 26.5h48" fill="none" stroke={paint(ids.leather)} strokeWidth="9" strokeLinecap="round" />
      <rect x="45.3" y="20.7" width="11" height="10.4" rx="2.2" fill={COLORS.gold} stroke={COLORS.outlineDark} strokeWidth="2.6" />
      <path d="M35 39h28M31.5 63c5 4.1 10.5 4.1 16.4 0M55.5 63c5 4.1 10.5 4.1 16.4 0" fill="none" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" opacity="0.74" />
      <circle cx="37" cy="69.5" r="7" fill={paint(ids.materialSoft)} stroke={palette.dark} strokeWidth="3" opacity="0.86" />
      <circle cx="64" cy="69.5" r="7" fill={paint(ids.materialSoft)} stroke={palette.dark} strokeWidth="3" opacity="0.86" />
    </>
  );
}

function BootsIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path d="M25.2 35c11.8-6.3 22.2 1.5 22.2 16.2v17.3H20.2c1.1-13.4 2.8-24.6 5-33.5Z" fill={paint(ids.material)} stroke={palette.dark} strokeWidth="4" strokeLinejoin="round" />
      <path d="M57.2 35c11.8-6.3 22.2 1.5 22.2 16.2v17.3H52.2c1.1-13.4 2.8-24.6 5-33.5Z" fill={paint(ids.material)} stroke={palette.dark} strokeWidth="4" strokeLinejoin="round" />
      <path d="M18 68.5h31M50 68.5h31" fill="none" stroke={palette.dark} strokeWidth="5" strokeLinecap="round" opacity="0.5" />
      <path d="M29 43.5c5.5-3.1 11.4-2.5 15.4 1.5M61 43.5c5.5-3.1 11.4-2.5 15.4 1.5" fill="none" stroke={palette.highlight} strokeWidth="3.2" strokeLinecap="round" opacity="0.82" />
      <path d="M23.2 66.3c7.4 5.2 15.5 5.2 24.2 0M55.2 66.3c7.4 5.2 15.5 5.2 24.2 0" fill={paint(ids.materialSoft)} stroke={palette.dark} strokeWidth="3" strokeLinejoin="round" />
      <rect x="68" y="47" width="10.5" height="8.5" rx="1.8" fill={COLORS.gold} stroke={COLORS.outlineDark} strokeWidth="2.3" />
    </>
  );
}

function ElytraIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path d="M46.5 25.5c-17 3.3-28 16.1-29.2 40.5 11.8 6.8 26.5-3.8 33.5-26.6L46.5 25.5Z" fill={paint(ids.material)} stroke={palette.dark} strokeWidth="4" strokeLinejoin="round" />
      <path d="M53.5 25.5c17 3.3 28 16.1 29.2 40.5-11.8 6.8-26.5-3.8-33.5-26.6L53.5 25.5Z" fill={paint(ids.material)} stroke={palette.dark} strokeWidth="4" strokeLinejoin="round" />
      <path d="M37.5 36.5c-6.2 7.8-9.6 17.1-10.2 27.8M62.5 36.5c6.2 7.8 9.6 17.1 10.2 27.8" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.64" />
      <path d="M43.4 48.7c-5.2 4.7-9.3 9.9-12.2 15.7M56.6 48.7c5.2 4.7 9.3 9.9 12.2 15.7" fill="none" stroke={palette.dark} strokeWidth="2.1" strokeLinecap="round" opacity="0.26" />
      <path d="M48 28.5h4v47h-4Z" fill={paint(ids.handle)} stroke={COLORS.outlineDark} strokeWidth="2.5" />
    </>
  );
}

function ShieldIcon({ ids }: IconRenderProps) {
  return (
    <>
      <path d="M23.5 22.5h53c7.4 9 8.2 31.1 1.2 47-5.1 11.4-15.2 18.4-27.7 22-12.5-3.6-22.6-10.6-27.7-22-7-15.9-6.2-38 1.2-47Z" fill={COLORS.steelLight} stroke={COLORS.outlineDark} strokeWidth="4" strokeLinejoin="round" />
      <path d="M31 29h38.2c5.2 9.1 5.4 25.4 0.6 37.1-4 8.8-10.6 14.6-19.8 17.5-9.2-2.9-15.8-8.7-19.8-17.5C25.6 54.4 25.8 38.1 31 29Z" fill={paint(ids.leather)} stroke={COLORS.outlineDark} strokeWidth="3.4" strokeLinejoin="round" />
      <path d="M50 29.5v52M35 42.5h30" fill="none" stroke="#f0b86f" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M27.5 24.2c9.5 4.4 24.1 4.4 43.8 0" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.82" />
      <Screw cx={28.5} cy={32.5} />
      <Screw cx={71.5} cy={32.5} />
      <Screw cx={50} cy={85.5} />
    </>
  );
}

function ShearsIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path d="M42 54 25 80M58 54 75 80" fill="none" stroke={COLORS.outlineDark} strokeWidth="10.5" strokeLinecap="round" />
      <path d="M42 54 25 80M58 54 75 80" fill="none" stroke={paint(ids.leather)} strokeWidth="6.8" strokeLinecap="round" />
      <path d="M45.2 50.4 28.5 24.5c11-2.7 20.1 7.1 23.5 23.6M54.8 50.4 71.5 24.5c-11-2.7-20.1 7.1-23.5 23.6" fill={paint(ids.material)} stroke={palette.dark} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="33" cy="68" r="11.5" fill="none" stroke={COLORS.woodDark} strokeWidth="6" />
      <circle cx="67" cy="68" r="11.5" fill="none" stroke={COLORS.woodDark} strokeWidth="6" />
      <circle cx="50" cy="52" r="5.2" fill={paint(ids.materialSoft)} stroke={palette.dark} strokeWidth="3" />
      <path d="M37.5 29.5c5.3 3.4 8.6 8.4 9.8 14.8M62.5 29.5c-5.3 3.4-8.6 8.4-9.8 14.8" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" opacity="0.8" />
    </>
  );
}

function FlintAndSteelIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path d="M47 22c16.5-8.5 33.7 3.5 29.5 21.4-2.4 10.5-16.7 15.4-28.2 8.5" fill="none" stroke={palette.dark} strokeWidth="12.2" strokeLinecap="round" />
      <path d="M47 22c16.5-8.5 33.7 3.5 29.5 21.4-2.4 10.5-16.7 15.4-28.2 8.5" fill="none" stroke={paint(ids.material)} strokeWidth="8" strokeLinecap="round" />
      <path d="M46.5 24.5c7.2 2.6 13.1 7.1 17.4 13.6" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.74" />
      <path d="M32.4 58.5c7.1 3.5 11.5 9.1 10.1 15-2.2 9.2-16.7 10.6-21.2 2.1-3.4-6.6 1.4-14.3 9.2-16.6 0.2-8.1 4.2-14.7 11.5-19.2-1.1 8.2 6.4 12.8 1.9 19.6" fill={COLORS.orange} stroke="#a35a0d" strokeWidth="3.1" strokeLinejoin="round" />
      <path d="M31.2 66.3c3.5 1.7 5.4 4.8 4.1 7.7-1.8 4.1-8.8 4.6-11 0.7-1.7-3.4 1.1-7.2 5.2-8.3" fill={COLORS.flame} stroke="none" />
      <path d="M58 59.5c-0.5 11.4-8 19.4-22.5 24.1 10.3 3.3 21 0.4 26.1-7.9 5.2-8.5 3.7-14.1-3.6-16.2Z" fill={COLORS.flint} stroke={COLORS.outlineDark} strokeWidth="4" strokeLinejoin="round" />
      <path d="M53.2 65.5c3.6 2.5 5.4 5.8 5.5 9.9" fill="none" stroke="#aeb5bf" strokeWidth="2.4" strokeLinecap="round" />
    </>
  );
}

function CarrotRodIcon({ ids }: IconRenderProps) {
  return (
    <>
      <FishingRodIcon palette={FIXED_PALETTES.fishing_rod ?? DEFAULT_PALETTE} ids={ids} />
      <path d="M56 70c8.5-6.4 19.8-3 23.8 7.1-6.2 9-18.8 10.2-26.5 1.9-0.2-3.5 0.6-6.6 2.7-9Z" fill={COLORS.orange} stroke="#9b4e0a" strokeWidth="3.1" strokeLinejoin="round" />
      <path d="M56.5 70c3-6.2 7.4-9.6 13-11" fill="none" stroke={COLORS.green} strokeWidth="5" strokeLinecap="round" />
      <path d="M62.5 73.5c4.5-1.1 8.5-0.3 12 2.5" fill="none" stroke="#ffd08a" strokeWidth="2.2" strokeLinecap="round" />
    </>
  );
}

function FungusRodIcon({ ids }: IconRenderProps) {
  return (
    <>
      <FishingRodIcon palette={FIXED_PALETTES.fishing_rod ?? DEFAULT_PALETTE} ids={ids} />
      <path d="M55.5 70.5c6.6-10.7 23.2-9.7 27.1 1.1-2 10.9-16 14.2-26 8.7-2.8-3-3.2-6.3-1.1-9.8Z" fill="#46ac7d" stroke="#246d4d" strokeWidth="3.1" strokeLinejoin="round" />
      <circle cx="69.3" cy="71.5" r="4.5" fill="#7b62c7" stroke="none" />
      <circle cx="78" cy="75" r="3" fill="#d6caff" stroke="none" />
    </>
  );
}

function BrushIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(17 50 50)">
      <Shaft d="M49 20 49 58" ids={ids} width={11} />
      <path d="M25 57c13.2-8.8 37.9-8.8 50 0v15.2c-13.9 9.5-37.2 9.5-50 0V57Z" fill={paint(ids.material)} stroke={palette.dark} strokeWidth="4" strokeLinejoin="round" />
      <path d="M33 58.7c8.9-4.1 24.7-4.1 34 0" fill="none" stroke={palette.accent} strokeWidth="3.5" strokeLinecap="round" opacity="0.86" />
      <path d="M33 71v8M43 69.5v10M54 69.5v10M65 71v8" stroke={palette.dark} strokeWidth="2.4" strokeLinecap="round" opacity="0.42" />
    </g>
  );
}
