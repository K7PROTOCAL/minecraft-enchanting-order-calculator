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
  primary: string;
  handle: string;
  accent: string;
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
  outline: "#394553",
  steel: "#7f8d9c",
  steelLight: "#d8e0e8",
  steelDark: "#4c5968",
  wood: "#a76831",
  woodLight: "#e0a35b",
  woodDark: "#623716",
  gold: "#e9a729",
  cyan: "#1cb7cd",
  blue: "#4a8ec7",
  purple: "#5b5067",
  green: "#409f63",
  orange: "#f08a27",
  red: "#dc4d3f",
  flint: "#59616d"
};

const DEFAULT_PALETTE: IconPalette = {
  primary: COLORS.steel,
  secondary: COLORS.steelLight,
  dark: COLORS.steelDark,
  handle: COLORS.wood,
  accent: "#c3ccd5",
  highlight: "#ffffff"
};

const MATERIAL_PALETTES: Record<string, IconPalette> = {
  wooden: {
    primary: "#8f5526",
    secondary: "#c77b38",
    dark: "#5f3418",
    handle: "#7a451d",
    accent: "#d7954c",
    highlight: "#efc28a"
  },
  stone: {
    primary: "#78828c",
    secondary: "#b3bdc7",
    dark: "#434d57",
    handle: COLORS.wood,
    accent: "#c8d0d8",
    highlight: "#eef3f7"
  },
  iron: {
    primary: "#b9c3ce",
    secondary: "#e8eef4",
    dark: "#5f6f80",
    handle: COLORS.wood,
    accent: "#d1dbe4",
    highlight: "#ffffff"
  },
  golden: {
    primary: "#e7a51f",
    secondary: "#ffd35a",
    dark: "#875806",
    handle: COLORS.wood,
    accent: "#ffe38a",
    highlight: "#fff4bd"
  },
  diamond: {
    primary: "#1bbad0",
    secondary: "#74e3ee",
    dark: "#087487",
    handle: COLORS.wood,
    accent: "#baf7ff",
    highlight: "#effeff"
  },
  netherite: {
    primary: "#514659",
    secondary: "#7a6c83",
    dark: "#241d2b",
    handle: COLORS.wood,
    accent: "#a796b1",
    highlight: "#d4c7dd"
  },
  leather: {
    primary: "#9f633b",
    secondary: "#c98752",
    dark: "#5a341f",
    handle: COLORS.wood,
    accent: "#e0aa72",
    highlight: "#f2cca2"
  },
  chainmail: {
    primary: "#8692a1",
    secondary: "#c4ced9",
    dark: "#485461",
    handle: COLORS.wood,
    accent: "#d9e1e9",
    highlight: "#fbfdff"
  },
  turtle: {
    primary: "#48a463",
    secondary: "#8ed89f",
    dark: "#1d6937",
    handle: COLORS.wood,
    accent: "#b8efc6",
    highlight: "#effff3"
  }
};

const FIXED_PALETTES: Partial<Record<IconKind, IconPalette>> = {
  mace: DEFAULT_PALETTE,
  bow: {
    primary: COLORS.wood,
    secondary: COLORS.woodLight,
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: "#ead2ad",
    highlight: "#ffe4b8"
  },
  crossbow: {
    primary: COLORS.wood,
    secondary: COLORS.woodLight,
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.gold,
    highlight: "#ffe4b8"
  },
  trident: {
    primary: COLORS.cyan,
    secondary: "#78dce9",
    dark: "#0c6677",
    handle: COLORS.steel,
    accent: "#b8f4ff",
    highlight: "#ecfdff"
  },
  fishing_rod: {
    primary: COLORS.wood,
    secondary: COLORS.woodLight,
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.steel,
    highlight: "#ffe4b8"
  },
  elytra: {
    primary: "#8fb2d4",
    secondary: "#c7def2",
    dark: "#355a77",
    handle: COLORS.wood,
    accent: "#e4f2ff",
    highlight: "#f6fbff"
  },
  shield: {
    primary: COLORS.wood,
    secondary: COLORS.woodLight,
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.steelLight,
    highlight: "#ffe0aa"
  },
  shears: DEFAULT_PALETTE,
  flint_and_steel: DEFAULT_PALETTE,
  carrot_on_a_stick: {
    primary: COLORS.wood,
    secondary: COLORS.woodLight,
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.orange,
    highlight: COLORS.green
  },
  warped_fungus_on_a_stick: {
    primary: COLORS.wood,
    secondary: COLORS.woodLight,
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.green,
    highlight: COLORS.purple
  },
  brush: {
    primary: COLORS.orange,
    secondary: "#ffc36a",
    dark: "#965019",
    handle: COLORS.wood,
    accent: "#ffe4bc",
    highlight: "#fff0d7"
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

function svgPaint(id: string) {
  return `url(#${id})`;
}

function makeIconIds(baseId: string): IconIds {
  const safeId = baseId.replace(/[^a-zA-Z0-9_-]/g, "");

  return {
    card: `item-card-${safeId}`,
    primary: `item-primary-${safeId}`,
    handle: `item-handle-${safeId}`,
    accent: `item-accent-${safeId}`,
    shadow: `item-shadow-${safeId}`
  };
}

export function ItemIcon({ iconId, itemId, label }: ItemIconProps) {
  const kind = getIconKind(iconId);
  const palette = getPalette(kind, itemId);
  const ids = makeIconIds(useId());

  return (
    <span className="item-icon" role="img" aria-label={label}>
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient
            id={ids.card}
            x1="7"
            y1="6"
            x2="57"
            y2="60"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.56" stopColor="#f2f9ff" />
            <stop offset="1" stopColor="#e5f3ff" />
          </linearGradient>
          <linearGradient
            id={ids.primary}
            x1="18"
            y1="11"
            x2="48"
            y2="54"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={palette.highlight} />
            <stop offset="0.38" stopColor={palette.secondary} />
            <stop offset="1" stopColor={palette.primary} />
          </linearGradient>
          <linearGradient
            id={ids.handle}
            x1="20"
            y1="13"
            x2="43"
            y2="54"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#efb66d" />
            <stop offset="0.48" stopColor={palette.handle} />
            <stop offset="1" stopColor={COLORS.woodDark} />
          </linearGradient>
          <linearGradient
            id={ids.accent}
            x1="16"
            y1="12"
            x2="48"
            y2="52"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={palette.highlight} />
            <stop offset="0.48" stopColor={palette.accent} />
            <stop offset="1" stopColor={palette.primary} />
          </linearGradient>
          <filter
            id={ids.shadow}
            x="-20%"
            y="-20%"
            width="140%"
            height="145%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="1.5"
              floodColor="#1f2c3b"
              floodOpacity="0.2"
            />
          </filter>
        </defs>

        <rect
          x="4.5"
          y="4.5"
          width="55"
          height="55"
          rx="14"
          fill={svgPaint(ids.card)}
          stroke="#9fc8eb"
          strokeWidth="2.3"
        />
        <path
          d="M13 15c8-5 24-6 38 0"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.86"
        />
        <g filter={svgPaint(ids.shadow)}>{renderIcon(kind, palette, ids)}</g>
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

function ToolHandle({
  d,
  palette,
  ids,
  width = 6
}: IconRenderProps & { d: string; width?: number }) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={palette.dark}
        strokeWidth={width + 3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke={svgPaint(ids.handle)}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke="#f3c07c"
        strokeWidth={Math.max(1.2, width * 0.22)}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.72"
      />
    </>
  );
}

function MaterialLine({
  d,
  palette,
  ids,
  width = 5
}: IconRenderProps & { d: string; width?: number }) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={palette.dark}
        strokeWidth={width + 3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke={svgPaint(ids.primary)}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke={palette.highlight}
        strokeWidth={Math.max(1.1, width * 0.22)}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.72"
      />
    </>
  );
}

function SwordIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M42 9c3.5-.5 6 1 8 3-0.2 5.1-2.5 9.5-6.4 13.3L31.3 38l-5.4-5.4L38.2 14c1-1.6 2.1-3.3 3.8-5Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M42.7 14.2 30.1 31.8"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.84"
      />
      <path
        d="M20.5 32.8 33 45.3"
        fill="none"
        stroke={palette.dark}
        strokeWidth="8.5"
        strokeLinecap="round"
      />
      <path
        d="M21.1 33.4 32.4 44.7"
        fill="none"
        stroke={svgPaint(ids.accent)}
        strokeWidth="5.8"
        strokeLinecap="round"
      />
      <ToolHandle d="M27.5 43 20 50.5" palette={palette} ids={ids} width={6} />
      <circle
        cx="17.5"
        cy="53"
        r="5"
        fill={svgPaint(ids.accent)}
        stroke={palette.dark}
        strokeWidth="2.5"
      />
    </>
  );
}

function AxeIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(-34 32 32)">
      <ToolHandle d="M32 26 32 52" palette={palette} ids={ids} width={7} />
      <path
        d="M25 16c8-6 18-5 25 1-1 8-7 15-17 16l-8-4 4-5h-9c-1.1-3.9 0.4-6.5 5-8Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.7"
        strokeLinejoin="round"
      />
      <rect
        x="28"
        y="24"
        width="11"
        height="11"
        rx="2.5"
        fill={svgPaint(ids.accent)}
        stroke={palette.dark}
        strokeWidth="2.4"
      />
      <path
        d="M30 19c4.8-2 10.4-1.8 15 0.9"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.86"
      />
    </g>
  );
}

function PickaxeIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(-35 32 32)">
      <ToolHandle d="M32 23 32 53" palette={palette} ids={ids} width={7} />
      <path
        d="M13 23c10-9 27-11 39-3-4.3 0.7-8.2 3.5-11.9 8.2-7-2.9-15.5-1.8-24.3 3.4L13 23Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <rect
        x="28.5"
        y="23"
        width="8.5"
        height="9.5"
        rx="2.2"
        fill={svgPaint(ids.accent)}
        stroke={palette.dark}
        strokeWidth="2.3"
      />
      <path
        d="M21 23.4c8-3.8 17.1-4.5 24.8-1.7"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.85"
      />
    </g>
  );
}

function ShovelIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(30 32 32)">
      <ToolHandle d="M32 15 32 39" palette={palette} ids={ids} width={7} />
      <path
        d="M24.5 38c0-6.2 3.1-11.3 7.5-13.5 4.4 2.2 7.5 7.3 7.5 13.5 0 7-3.4 12.1-7.5 15.4-4.1-3.3-7.5-8.4-7.5-15.4Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.7"
        strokeLinejoin="round"
      />
      <path
        d="M32 29.5c2.8 2.5 4.1 6.4 3.2 10.6"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.82"
      />
    </g>
  );
}

function HoeIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(-34 32 32)">
      <ToolHandle d="M32 24 32 53" palette={palette} ids={ids} width={7} />
      <path
        d="M28 15c8-2.7 18-1.7 25.2 3-2.4 5.4-6.3 9-11.8 10.7-4.2-4.1-9.1-6.2-14.6-6.2L28 15Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M33.5 17.6c4.8-0.3 9.1 0.5 13 2.5"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.82"
      />
    </g>
  );
}

function MaceIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(-33 32 32)">
      <ToolHandle d="M32 30 32 53" palette={palette} ids={ids} width={7} />
      <rect
        x="20"
        y="13"
        width="24"
        height="21"
        rx="4.5"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.7"
      />
      <path
        d="M18 19h28M18 28h28"
        fill="none"
        stroke={palette.dark}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.62"
      />
      <path
        d="M25 17h10"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.86"
      />
      <circle cx="25" cy="24" r="2.3" fill={palette.dark} stroke="none" opacity="0.58" />
      <circle cx="39" cy="24" r="2.3" fill={palette.dark} stroke="none" opacity="0.58" />
    </g>
  );
}

function BowIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M43 13c-15.4 6.2-24.8 23-16 38"
        fill="none"
        stroke={palette.dark}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M43 13c-15.4 6.2-24.8 23-16 38"
        fill="none"
        stroke={svgPaint(ids.handle)}
        strokeWidth="5.4"
        strokeLinecap="round"
      />
      <path
        d="M42.7 13.8c-6.1 14.4-8.8 26.4-15.3 36.7"
        fill="none"
        stroke={COLORS.woodDark}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M43 13 27 51"
        fill="none"
        stroke="#6d421e"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="28" cy="49" r="2.5" fill={palette.accent} stroke={palette.dark} strokeWidth="1.8" />
      <circle cx="43" cy="14" r="2.5" fill={palette.accent} stroke={palette.dark} strokeWidth="1.8" />
    </>
  );
}

function CrossbowIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M15 27c10.5-7.5 23.5-7.5 34 0"
        fill="none"
        stroke={palette.dark}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M15 27c10.5-7.5 23.5-7.5 34 0"
        fill="none"
        stroke={svgPaint(ids.handle)}
        strokeWidth="5.4"
        strokeLinecap="round"
      />
      <ToolHandle d="M31 23 38 50" palette={palette} ids={ids} width={7} />
      <path
        d="M17 47 48 18"
        fill="none"
        stroke={palette.dark}
        strokeWidth="3.3"
        strokeLinecap="round"
      />
      <path
        d="M25 39 48 18"
        fill="none"
        stroke={palette.accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M48 18 47 26 41 20Z"
        fill={palette.accent}
        stroke={palette.dark}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="23"
        y="30"
        width="22"
        height="7"
        rx="3.5"
        fill={svgPaint(ids.accent)}
        stroke={palette.dark}
        strokeWidth="2.2"
      />
    </>
  );
}

function TridentIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(-32 32 32)">
      <ToolHandle d="M32 28 32 54" palette={palette} ids={ids} width={6} />
      <MaterialLine d="M32 11 32 31" palette={palette} ids={ids} width={5} />
      <MaterialLine d="M21 14v11c0 6 22 6 22 0V14" palette={palette} ids={ids} width={5} />
      <path d="M32 8 27 15h10Z" fill={svgPaint(ids.primary)} stroke={palette.dark} strokeWidth="2.1" />
      <path d="M21 11 17 18h8Z" fill={svgPaint(ids.primary)} stroke={palette.dark} strokeWidth="2.1" />
      <path d="M43 11 39 18h8Z" fill={svgPaint(ids.primary)} stroke={palette.dark} strokeWidth="2.1" />
    </g>
  );
}

function FishingRodIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M18 15c14 7.2 23.8 19.2 29 35"
        fill="none"
        stroke={palette.dark}
        strokeWidth="7.2"
        strokeLinecap="round"
      />
      <path
        d="M18 15c14 7.2 23.8 19.2 29 35"
        fill="none"
        stroke={svgPaint(ids.handle)}
        strokeWidth="4.8"
        strokeLinecap="round"
      />
      <path
        d="M44 34c-0.2 9.2-4 14.6-9 19"
        fill="none"
        stroke={COLORS.outline}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M35 53c2.8-3 7.3-0.9 6.6 3-0.6 3.4-5.7 4.5-7.5 1.1"
        fill="none"
        stroke={COLORS.outline}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <circle
        cx="30.5"
        cy="42"
        r="5"
        fill={svgPaint(ids.accent)}
        stroke={palette.dark}
        strokeWidth="2.2"
      />
      <circle cx="30.5" cy="42" r="2" fill="#ffffff" stroke="none" opacity="0.75" />
      <circle cx="44" cy="34" r="2.8" fill={palette.accent} stroke={palette.dark} strokeWidth="1.8" />
    </>
  );
}

function HelmetIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M15 37c0-15.5 9.5-24.2 22-22.2 9.5 1.5 15.5 10.1 14 22.2l-4.2 10.5H19.2L15 37Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.7"
        strokeLinejoin="round"
      />
      <path
        d="M20 37h29"
        fill="none"
        stroke={palette.dark}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.58"
      />
      <path
        d="M20.5 36h28"
        fill="none"
        stroke={svgPaint(ids.accent)}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M25 38v9M37 38v9" stroke={palette.dark} strokeWidth="4.2" strokeLinecap="round" />
      <path d="M27 39v8M39 39v8" stroke={palette.highlight} strokeWidth="2" strokeLinecap="round" opacity="0.72" />
      <path
        d="M23 30c5-9 15.5-12.5 23-5"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.82"
      />
    </>
  );
}

function ChestplateIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M17 18.5c5.1 2.5 9.6 1.5 13.2-2.4h3.6c3.6 3.9 8.1 4.9 13.2 2.4 4.3 9.3 5.2 20.2 1.2 31.3H15.8c-4-11.1-3.1-22 1.2-31.3Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.7"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 21.5c3.4 7.4 3.6 16 0.8 25.1M46.5 21.5c-3.4 7.4-3.6 16-0.8 25.1"
        fill="none"
        stroke={palette.dark}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M24 25c4.5 3 11.5 3 16 0M23 39h18"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.84"
      />
      <circle cx="24" cy="20.5" r="2.4" fill={palette.accent} stroke={palette.dark} strokeWidth="1.7" />
      <circle cx="40" cy="20.5" r="2.4" fill={palette.accent} stroke={palette.dark} strokeWidth="1.7" />
    </>
  );
}

function LeggingsIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M19 15h26c2.8 12 2 24.2-2.5 36h-9.3c-1.1-7.2-1.1-14 0-20.6h-2.4c-0.2 6.9-1.6 13.8-4.1 20.6h-9.2C19.8 38.8 20.1 26.8 19 15Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.7"
        strokeLinejoin="round"
      />
      <path
        d="M20 16.5h24"
        fill="none"
        stroke={svgPaint(ids.handle)}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect
        x="29"
        y="13.5"
        width="6"
        height="6"
        rx="1.4"
        fill={palette.accent}
        stroke={palette.dark}
        strokeWidth="1.7"
      />
      <path
        d="M25 25h14M23 38c2.7 2.5 5.6 2.5 8.6 0M35 38c2.7 2.5 5.6 2.5 8.6 0"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.78"
      />
    </>
  );
}

function BootsIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M17.5 25.5c7-3.2 13.5 1.5 13.5 10.2v10.8H13.7c1-7.7 2.3-14.8 3.8-21Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.7"
        strokeLinejoin="round"
      />
      <path
        d="M37 25.5c7-3.2 13.5 1.5 13.5 10.2v10.8H33.2c1-7.7 2.3-14.8 3.8-21Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.7"
        strokeLinejoin="round"
      />
      <path
        d="M15 46.5h17M34.5 46.5h17"
        fill="none"
        stroke={palette.dark}
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M20 31.5c3-1.5 6.5-1.2 8.6 1.4M39.5 31.5c3-1.5 6.5-1.2 8.6 1.4"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.82"
      />
    </>
  );
}

function ElytraIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M30 16.5c-9.5 2.1-16.6 9.2-17.6 23.5 7.5 4 16.7-2.6 20-15.8L30 16.5Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.7"
        strokeLinejoin="round"
      />
      <path
        d="M34 16.5c9.5 2.1 16.6 9.2 17.6 23.5-7.5 4-16.7-2.6-20-15.8L34 16.5Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.7"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 24c-3.2 4.5-5 9.5-5.2 15M39.5 24c3.2 4.5 5 9.5 5.2 15"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path d="M31 20h2v24h-2Z" fill={palette.dark} stroke="none" opacity="0.78" />
    </>
  );
}

function ShieldIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M19 15h26c4.1 4.8 5.1 17.5 1.2 27.2C43.3 49 37.8 53 32 55c-5.8-2-11.3-6-14.2-12.8C13.9 32.5 14.9 19.8 19 15Z"
        fill={palette.accent}
        stroke={COLORS.steelDark}
        strokeWidth="2.7"
        strokeLinejoin="round"
      />
      <path
        d="M23 19h18c2.7 5 3 14.1 0.6 21.1-2 5.2-5.4 8.7-9.6 10.7-4.2-2-7.6-5.5-9.6-10.7C20 33.1 20.3 24 23 19Z"
        fill={svgPaint(ids.handle)}
        stroke={palette.dark}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M32 20v29M24.5 27.5h15"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </>
  );
}

function ShearsIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M27 31 18 49"
        fill="none"
        stroke={palette.dark}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M37 31 46 49"
        fill="none"
        stroke={palette.dark}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M27 31 18 49M37 31 46 49"
        fill="none"
        stroke={svgPaint(ids.primary)}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse
        cx="23"
        cy="24"
        rx="7.2"
        ry="6.2"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.5"
        transform="rotate(-28 23 24)"
      />
      <ellipse
        cx="42"
        cy="24"
        rx="7.2"
        ry="6.2"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.5"
        transform="rotate(28 42 24)"
      />
      <circle cx="23" cy="24" r="3" fill="#f7fbff" stroke="none" />
      <circle cx="42" cy="24" r="3" fill="#f7fbff" stroke="none" />
      <circle cx="32" cy="32" r="3" fill={palette.accent} stroke={palette.dark} strokeWidth="1.8" />
    </>
  );
}

function FlintAndSteelIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <path
        d="M21 18c9-7.5 23-1.2 22 10.6-0.6 7.3-8.6 11-15.7 8.3"
        fill="none"
        stroke={palette.dark}
        strokeWidth="8.4"
        strokeLinecap="round"
      />
      <path
        d="M21 18c9-7.5 23-1.2 22 10.6-0.6 7.3-8.6 11-15.7 8.3"
        fill="none"
        stroke={svgPaint(ids.primary)}
        strokeWidth="5.4"
        strokeLinecap="round"
      />
      <path
        d="M41 39c4.7 1.8 7.2 5.4 5.9 9.4-2.2 6.2-12.4 6-14.4-0.4-1.1-4 2.1-8.1 6.5-8.9-0.1-5.3 2.8-8.8 6.8-11.5-0.3 5.2 4.7 8.1 1.5 12.5"
        fill={COLORS.orange}
        stroke="#a7560b"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      <path
        d="M39 43c2.4 1 3.6 3.1 2.8 5.1-1.2 3.2-6.3 3.1-7.3-0.2-0.5-2.1 1.1-4.2 3.5-4.8"
        fill="#ffd769"
        stroke="none"
      />
      <path
        d="M44 36c-0.9 2.3-2.6 3.7-5 4.2"
        fill="none"
        stroke="#fff1a6"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M48 41c-0.6 6.7-4.3 11-11 13 5.7 1.8 11.9 0.5 15-4.3 3-4.5 1-8.1-4-8.7Z"
        fill={COLORS.flint}
        stroke={COLORS.outline}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M45 44c1.8 1.3 2.8 2.9 3 4.8" fill="none" stroke="#aeb7c2" strokeWidth="1.7" />
    </>
  );
}

function CarrotRodIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <FishingRodIcon palette={palette} ids={ids} />
      <path
        d="M39 43c5.5-3 11.4-1.2 13.6 4.3-4.1 5.5-10.8 6.3-15.3 1.4-0.1-2.1 0.5-4 1.7-5.7Z"
        fill={COLORS.orange}
        stroke="#9b4d08"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M39 43c1.2-3.2 3.7-5.1 7-6.5"
        fill="none"
        stroke={COLORS.green}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </>
  );
}

function FungusRodIcon({ palette, ids }: IconRenderProps) {
  return (
    <>
      <FishingRodIcon palette={palette} ids={ids} />
      <path
        d="M38 43c4.2-6.8 14.9-6.1 17.2 0.5-1.2 6.9-9.8 9.1-16.2 5.6-1.7-1.9-2-4-1-6.1Z"
        fill="#45ad7a"
        stroke="#246d4d"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="47" cy="43.5" r="3" fill="#7d67c8" stroke="none" />
      <circle cx="52" cy="45.5" r="2" fill="#d4c9ff" stroke="none" />
    </>
  );
}

function BrushIcon({ palette, ids }: IconRenderProps) {
  return (
    <g transform="rotate(-18 32 32)">
      <ToolHandle d="M32 13 32 39" palette={palette} ids={ids} width={7} />
      <path
        d="M18 38c8-5.2 22.2-5.2 29 0v9.5c-7.8 5.7-21.4 5.7-29 0V38Z"
        fill={svgPaint(ids.primary)}
        stroke={palette.dark}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M23 39.8c5-2.4 13.5-2.4 19 0"
        fill="none"
        stroke={palette.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path d="M22 47v5M29 46v7M36 46v7M43 47v5" stroke={palette.dark} strokeWidth="1.8" opacity="0.45" />
    </g>
  );
}
