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
  steel: "#5f7f9d",
  steelLight: "#a9c5dc",
  steelDark: "#243b53",
  wood: "#b9782f",
  woodDark: "#7a461b",
  gold: "#f2b84b",
  cyan: "#20a4c8",
  blue: "#4f8fce",
  purple: "#9b6fd3",
  green: "#3ca66b",
  orange: "#f08b32",
  red: "#d94b54"
};

const DEFAULT_PALETTE: IconPalette = {
  primary: COLORS.steelLight,
  secondary: COLORS.steel,
  dark: COLORS.steelDark,
  handle: COLORS.wood,
  accent: COLORS.gold,
  highlight: "#ffffff"
};

const MATERIAL_PALETTES: Record<string, IconPalette> = {
  wooden: {
    primary: "#9b5b2b",
    secondary: "#c98948",
    dark: "#5f361b",
    handle: "#7a461b",
    accent: "#d49a4c",
    highlight: "#f0c48c"
  },
  stone: {
    primary: "#8d98a3",
    secondary: "#b4bec8",
    dark: "#4e5a66",
    handle: COLORS.wood,
    accent: "#c6ced6",
    highlight: "#eef3f7"
  },
  iron: {
    primary: "#d9e2ea",
    secondary: "#f5f8fb",
    dark: "#617080",
    handle: COLORS.wood,
    accent: "#b8c3cc",
    highlight: "#ffffff"
  },
  golden: {
    primary: "#f3b72f",
    secondary: "#ffd965",
    dark: "#8f5c08",
    handle: COLORS.wood,
    accent: "#ffe18a",
    highlight: "#fff4bc"
  },
  diamond: {
    primary: "#30c4d6",
    secondary: "#7debf2",
    dark: "#137b8a",
    handle: COLORS.wood,
    accent: "#b8fbff",
    highlight: "#ecfeff"
  },
  netherite: {
    primary: "#51445c",
    secondary: "#75667f",
    dark: "#241c2c",
    handle: COLORS.wood,
    accent: "#9b8aa8",
    highlight: "#c8bad1"
  },
  leather: {
    primary: "#9a623b",
    secondary: "#c48754",
    dark: "#5b3522",
    handle: COLORS.wood,
    accent: "#e0aa72",
    highlight: "#f0c699"
  },
  chainmail: {
    primary: "#8f9aaa",
    secondary: "#c1cbd6",
    dark: "#4e5967",
    handle: COLORS.wood,
    accent: "#d8e0e8",
    highlight: "#f8fbff"
  },
  turtle: {
    primary: "#4ba66b",
    secondary: "#8ed7a3",
    dark: "#1f6b3e",
    handle: COLORS.wood,
    accent: "#b6efc5",
    highlight: "#ecfff1"
  }
};

const FIXED_PALETTES: Partial<Record<IconKind, IconPalette>> = {
  mace: DEFAULT_PALETTE,
  bow: {
    primary: COLORS.wood,
    secondary: "#d6974f",
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: "#f0c078",
    highlight: "#ffe4b4"
  },
  crossbow: {
    primary: COLORS.wood,
    secondary: "#d6974f",
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.gold,
    highlight: "#ffe4b4"
  },
  trident: {
    primary: COLORS.cyan,
    secondary: "#72d4e8",
    dark: "#0c6780",
    handle: COLORS.steel,
    accent: "#b8f3ff",
    highlight: "#e7fbff"
  },
  fishing_rod: {
    primary: COLORS.wood,
    secondary: "#d6974f",
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.green,
    highlight: "#ffe4b4"
  },
  elytra: {
    primary: COLORS.purple,
    secondary: "#c6a3f0",
    dark: "#5c3c86",
    handle: COLORS.wood,
    accent: "#e2c9ff",
    highlight: "#f5eaff"
  },
  shield: {
    primary: COLORS.cyan,
    secondary: "#74d3e7",
    dark: "#0d6479",
    handle: COLORS.wood,
    accent: "#dbfbff",
    highlight: "#f0feff"
  },
  shears: DEFAULT_PALETTE,
  flint_and_steel: DEFAULT_PALETTE,
  carrot_on_a_stick: {
    primary: COLORS.wood,
    secondary: "#d6974f",
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.orange,
    highlight: COLORS.green
  },
  warped_fungus_on_a_stick: {
    primary: COLORS.wood,
    secondary: "#d6974f",
    dark: COLORS.woodDark,
    handle: COLORS.wood,
    accent: COLORS.green,
    highlight: COLORS.purple
  },
  brush: {
    primary: COLORS.orange,
    secondary: "#ffc16b",
    dark: "#99521b",
    handle: COLORS.wood,
    accent: "#ffe5bf",
    highlight: "#fff0d5"
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

export function ItemIcon({ iconId, itemId, label }: ItemIconProps) {
  const kind = getIconKind(iconId);
  const palette = getPalette(kind, itemId);

  return (
    <span className="item-icon" role="img" aria-label={label}>
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <rect
          x="5"
          y="5"
          width="54"
          height="54"
          rx="13"
          fill="#f7fbff"
          stroke="#a8cdea"
          strokeWidth="2"
        />
        <path
          d="M13 16c8-5 25-6 37 0"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.85"
        />
        <g
          stroke={palette.dark}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {renderIcon(kind, palette)}
        </g>
      </svg>
    </span>
  );
}

function renderIcon(kind: IconKind, palette: IconPalette) {
  switch (kind) {
    case "axe":
      return <AxeIcon palette={palette} />;
    case "pickaxe":
      return <PickaxeIcon palette={palette} />;
    case "shovel":
      return <ShovelIcon palette={palette} />;
    case "hoe":
      return <HoeIcon palette={palette} />;
    case "mace":
      return <MaceIcon palette={palette} />;
    case "bow":
      return <BowIcon palette={palette} />;
    case "crossbow":
      return <CrossbowIcon palette={palette} />;
    case "trident":
      return <TridentIcon palette={palette} />;
    case "fishing_rod":
      return <FishingRodIcon palette={palette} />;
    case "helmet":
      return <HelmetIcon palette={palette} />;
    case "chestplate":
      return <ChestplateIcon palette={palette} />;
    case "leggings":
      return <LeggingsIcon palette={palette} />;
    case "boots":
      return <BootsIcon palette={palette} />;
    case "elytra":
      return <ElytraIcon palette={palette} />;
    case "shield":
      return <ShieldIcon palette={palette} />;
    case "shears":
      return <ShearsIcon palette={palette} />;
    case "flint_and_steel":
      return <FlintAndSteelIcon palette={palette} />;
    case "carrot_on_a_stick":
      return <CarrotRodIcon palette={palette} />;
    case "warped_fungus_on_a_stick":
      return <FungusRodIcon palette={palette} />;
    case "brush":
      return <BrushIcon palette={palette} />;
    case "sword":
    default:
      return <SwordIcon palette={palette} />;
  }
}

function StraightHandle({ palette }: { palette: IconPalette }) {
  return (
    <path
      d="M33 32 24 50"
      fill="none"
      stroke={palette.handle}
      strokeWidth="7"
    />
  );
}

function SwordIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path
        d="M43 10 49 16 30 39 25 34 43 10Z"
        fill={palette.primary}
      />
      <path d="M24 34 33 43" fill="none" stroke={palette.accent} strokeWidth="7" />
      <path
        d="M31 42 24 51"
        fill="none"
        stroke={palette.handle}
        strokeWidth="7"
      />
      <path d="M42 14 29 32" fill="none" stroke={palette.highlight} strokeWidth="2.3" />
    </>
  );
}

function AxeIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <StraightHandle palette={palette} />
      <path
        d="M22 16h18c5 0 9 4 9 9v7H34c-8 0-14-4-15-11l3-5Z"
        fill={palette.primary}
      />
      <path d="M31 22h12" fill="none" stroke={palette.highlight} strokeWidth="2.3" />
    </>
  );
}

function PickaxeIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <StraightHandle palette={palette} />
      <path
        d="M13 24c9-10 25-13 39-7l-4 8c-11-3-22 0-31 7l-4-8Z"
        fill={palette.primary}
      />
      <path
        d="M25 22c7-3 14-4 21-2"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.3"
      />
    </>
  );
}

function ShovelIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path d="M32 32 25 50" fill="none" stroke={palette.handle} strokeWidth="7" />
      <path
        d="M27 12c7-5 17-1 19 7 1 7-5 14-14 17-8-4-11-15-5-24Z"
        fill={palette.primary}
      />
      <path
        d="M30 17c4-2 9-1 11 3"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.3"
      />
    </>
  );
}

function HoeIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <StraightHandle palette={palette} />
      <path
        d="M20 18c9-5 21-6 31-1l-3 8c-8-2-16 0-23 6l-5-13Z"
        fill={palette.primary}
      />
    </>
  );
}

function MaceIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path d="M33 34 28 51" fill="none" stroke={palette.handle} strokeWidth="7" />
      <rect x="20" y="14" width="25" height="22" rx="5" fill={palette.primary} />
      <circle cx="27" cy="22" r="2.2" fill={palette.dark} stroke="none" />
      <circle cx="39" cy="29" r="2.2" fill={palette.dark} stroke="none" />
    </>
  );
}

function BowIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path
        d="M42 13c-17 7-23 23-16 38"
        fill="none"
        stroke={palette.primary}
        strokeWidth="7"
      />
      <path
        d="M43 14c-6 16-7 27-17 37"
        fill="none"
        stroke={palette.dark}
        strokeWidth="2.2"
      />
    </>
  );
}

function CrossbowIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path
        d="M15 25c10-7 24-7 34 0"
        fill="none"
        stroke={palette.primary}
        strokeWidth="7"
      />
      <path d="M32 20v29" fill="none" stroke={palette.primary} strokeWidth="7" />
      <rect x="20" y="29" width="24" height="8" rx="4" fill={palette.accent} />
    </>
  );
}

function TridentIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path d="M32 16v34" fill="none" stroke={palette.handle} strokeWidth="6" />
      <path d="M22 14v12c0 5 20 5 20 0V14" fill="none" stroke={palette.primary} strokeWidth="6" />
      <path d="M32 11v18" fill="none" stroke={palette.primary} strokeWidth="6" />
    </>
  );
}

function FishingRodIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path
        d="M18 15c14 8 23 20 28 34"
        fill="none"
        stroke={palette.primary}
        strokeWidth="5"
      />
      <path d="M45 40c-3 4-6 8-9 13" fill="none" stroke={palette.dark} strokeWidth="2" />
      <circle cx="35" cy="53" r="4" fill={palette.accent} />
    </>
  );
}

function HelmetIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path
        d="M17 36c0-15 10-23 22-20 9 2 14 10 13 20l-5 8H22l-5-8Z"
        fill={palette.primary}
      />
      <path d="M24 33h23" fill="none" stroke={palette.highlight} strokeWidth="4" />
    </>
  );
}

function ChestplateIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path
        d="M17 18c5 2 9 1 13-2h4c4 3 8 4 13 2 4 9 5 20 1 31H16c-4-11-3-22 1-31Z"
        fill={palette.primary}
      />
      <path d="M24 27h16M22 39h20" fill="none" stroke={palette.highlight} strokeWidth="4" />
    </>
  );
}

function LeggingsIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path
        d="M20 16h24c2 13 1 23-3 35h-9c-1-8-1-15 0-21-3 7-4 14-6 21h-9c1-13 1-24 3-35Z"
        fill={palette.primary}
      />
      <path d="M25 23h14" fill="none" stroke={palette.highlight} strokeWidth="4" />
    </>
  );
}

function BootsIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path d="M18 27c8-3 13 2 13 10v9H14l4-19Z" fill={palette.primary} />
      <path d="M38 27c8-3 13 2 13 10v9H34l4-19Z" fill={palette.primary} />
      <path
        d="M20 34c3-2 6-2 8 0M40 34c3-2 6-2 8 0"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="3"
      />
    </>
  );
}

function ElytraIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path d="M30 17c-10 2-17 9-18 23 8 2 16-3 20-14l-2-9Z" fill={palette.primary} />
      <path d="M34 17c10 2 17 9 18 23-8 2-16-3-20-14l2-9Z" fill={palette.primary} />
    </>
  );
}

function ShieldIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path
        d="M20 15h24c4 5 5 18 1 27-3 6-8 10-13 12-6-2-11-6-14-12-4-9-2-22 2-27Z"
        fill={palette.primary}
      />
      <path d="M32 18v31M23 26h18" fill="none" stroke={palette.highlight} strokeWidth="4" />
    </>
  );
}

function ShearsIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <circle cx="23" cy="25" r="7" fill={palette.primary} />
      <circle cx="42" cy="25" r="7" fill={palette.primary} />
      <path d="M27 31 19 47M38 31l8 16" fill="none" stroke={palette.secondary} strokeWidth="5" />
      <circle cx="23" cy="25" r="3" fill="#f7fbff" stroke="none" />
      <circle cx="42" cy="25" r="3" fill="#f7fbff" stroke="none" />
    </>
  );
}

function FlintAndSteelIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path
        d="M20 17c10-6 23 1 20 13-1 6-8 9-14 6"
        fill="none"
        stroke={palette.secondary}
        strokeWidth="7"
      />
      <path d="M39 38c5-4 10 1 8 7-2 6-12 6-14 0 0-4 2-6 6-7Z" fill={COLORS.red} />
      <path d="M40 38c-1-5 2-8 6-11 0 5 4 7 1 12" fill={COLORS.orange} />
    </>
  );
}

function CarrotRodIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path d="M18 14c13 8 23 21 29 36" fill="none" stroke={palette.primary} strokeWidth="5" />
      <path d="M40 43c4-4 10-2 12 3-3 6-10 7-14 3 0-2 1-5 2-6Z" fill={palette.accent} />
      <path d="M39 43c2-4 4-6 7-8" fill="none" stroke={palette.highlight} strokeWidth="4" />
    </>
  );
}

function FungusRodIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <path d="M18 14c13 8 23 21 29 36" fill="none" stroke={palette.primary} strokeWidth="5" />
      <path d="M38 42c5-7 15-6 17 1-1 7-10 9-16 5-2-2-2-4-1-6Z" fill={palette.accent} />
      <circle cx="47" cy="44" r="3" fill={palette.highlight} stroke="none" />
    </>
  );
}

function BrushIcon({ palette }: { palette: IconPalette }) {
  return (
    <>
      <rect x="28" y="13" width="10" height="28" rx="4" fill={palette.handle} />
      <path d="M18 38c8-5 22-5 29 0v10c-8 5-21 5-29 0V38Z" fill={palette.primary} />
      <path d="M24 40c5-2 13-2 18 0" fill="none" stroke={palette.accent} strokeWidth="3" />
    </>
  );
}
