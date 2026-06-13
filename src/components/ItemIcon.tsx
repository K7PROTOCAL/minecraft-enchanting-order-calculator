interface ItemIconProps {
  iconId: string;
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

function getIconKind(iconId: string): IconKind {
  return ICON_KINDS.has(iconId as IconKind) ? (iconId as IconKind) : "sword";
}

export function ItemIcon({ iconId, label }: ItemIconProps) {
  const kind = getIconKind(iconId);

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
          stroke={COLORS.steelDark}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {renderIcon(kind)}
        </g>
      </svg>
    </span>
  );
}

function renderIcon(kind: IconKind) {
  switch (kind) {
    case "axe":
      return <AxeIcon />;
    case "pickaxe":
      return <PickaxeIcon />;
    case "shovel":
      return <ShovelIcon />;
    case "hoe":
      return <HoeIcon />;
    case "mace":
      return <MaceIcon />;
    case "bow":
      return <BowIcon />;
    case "crossbow":
      return <CrossbowIcon />;
    case "trident":
      return <TridentIcon />;
    case "fishing_rod":
      return <FishingRodIcon />;
    case "helmet":
      return <HelmetIcon />;
    case "chestplate":
      return <ChestplateIcon />;
    case "leggings":
      return <LeggingsIcon />;
    case "boots":
      return <BootsIcon />;
    case "elytra":
      return <ElytraIcon />;
    case "shield":
      return <ShieldIcon />;
    case "shears":
      return <ShearsIcon />;
    case "flint_and_steel":
      return <FlintAndSteelIcon />;
    case "carrot_on_a_stick":
      return <CarrotRodIcon />;
    case "warped_fungus_on_a_stick":
      return <FungusRodIcon />;
    case "brush":
      return <BrushIcon />;
    case "sword":
    default:
      return <SwordIcon />;
  }
}

function StraightHandle() {
  return (
    <path
      d="M33 32 24 50"
      fill="none"
      stroke={COLORS.wood}
      strokeWidth="7"
    />
  );
}

function SwordIcon() {
  return (
    <>
      <path
        d="M43 10 49 16 30 39 25 34 43 10Z"
        fill={COLORS.steelLight}
      />
      <path d="M24 34 33 43" fill="none" stroke={COLORS.gold} strokeWidth="7" />
      <path
        d="M31 42 24 51"
        fill="none"
        stroke={COLORS.wood}
        strokeWidth="7"
      />
      <path d="M42 14 29 32" fill="none" stroke="#ffffff" strokeWidth="2.3" />
    </>
  );
}

function AxeIcon() {
  return (
    <>
      <StraightHandle />
      <path
        d="M22 16h18c5 0 9 4 9 9v7H34c-8 0-14-4-15-11l3-5Z"
        fill={COLORS.steelLight}
      />
      <path d="M31 22h12" fill="none" stroke="#ffffff" strokeWidth="2.3" />
    </>
  );
}

function PickaxeIcon() {
  return (
    <>
      <StraightHandle />
      <path
        d="M13 24c9-10 25-13 39-7l-4 8c-11-3-22 0-31 7l-4-8Z"
        fill={COLORS.steelLight}
      />
      <path d="M25 22c7-3 14-4 21-2" fill="none" stroke="#ffffff" strokeWidth="2.3" />
    </>
  );
}

function ShovelIcon() {
  return (
    <>
      <path d="M32 32 25 50" fill="none" stroke={COLORS.wood} strokeWidth="7" />
      <path
        d="M27 12c7-5 17-1 19 7 1 7-5 14-14 17-8-4-11-15-5-24Z"
        fill={COLORS.steelLight}
      />
      <path d="M30 17c4-2 9-1 11 3" fill="none" stroke="#ffffff" strokeWidth="2.3" />
    </>
  );
}

function HoeIcon() {
  return (
    <>
      <StraightHandle />
      <path
        d="M20 18c9-5 21-6 31-1l-3 8c-8-2-16 0-23 6l-5-13Z"
        fill={COLORS.steelLight}
      />
    </>
  );
}

function MaceIcon() {
  return (
    <>
      <path d="M33 34 28 51" fill="none" stroke={COLORS.wood} strokeWidth="7" />
      <rect x="20" y="14" width="25" height="22" rx="5" fill={COLORS.steel} />
      <circle cx="27" cy="22" r="2.2" fill={COLORS.steelDark} stroke="none" />
      <circle cx="39" cy="29" r="2.2" fill={COLORS.steelDark} stroke="none" />
    </>
  );
}

function BowIcon() {
  return (
    <>
      <path
        d="M42 13c-17 7-23 23-16 38"
        fill="none"
        stroke={COLORS.wood}
        strokeWidth="7"
      />
      <path
        d="M43 14c-6 16-7 27-17 37"
        fill="none"
        stroke={COLORS.steelDark}
        strokeWidth="2.2"
      />
    </>
  );
}

function CrossbowIcon() {
  return (
    <>
      <path d="M15 25c10-7 24-7 34 0" fill="none" stroke={COLORS.wood} strokeWidth="7" />
      <path d="M32 20v29" fill="none" stroke={COLORS.wood} strokeWidth="7" />
      <rect x="20" y="29" width="24" height="8" rx="4" fill={COLORS.gold} />
    </>
  );
}

function TridentIcon() {
  return (
    <>
      <path d="M32 16v34" fill="none" stroke={COLORS.steel} strokeWidth="6" />
      <path d="M22 14v12c0 5 20 5 20 0V14" fill="none" stroke={COLORS.cyan} strokeWidth="6" />
      <path d="M32 11v18" fill="none" stroke={COLORS.cyan} strokeWidth="6" />
    </>
  );
}

function FishingRodIcon() {
  return (
    <>
      <path
        d="M18 15c14 8 23 20 28 34"
        fill="none"
        stroke={COLORS.wood}
        strokeWidth="5"
      />
      <path d="M45 40c-3 4-6 8-9 13" fill="none" stroke={COLORS.steelDark} strokeWidth="2" />
      <circle cx="35" cy="53" r="4" fill={COLORS.green} />
    </>
  );
}

function HelmetIcon() {
  return (
    <>
      <path
        d="M17 36c0-15 10-23 22-20 9 2 14 10 13 20l-5 8H22l-5-8Z"
        fill={COLORS.blue}
      />
      <path d="M24 33h23" fill="none" stroke="#dff0ff" strokeWidth="4" />
    </>
  );
}

function ChestplateIcon() {
  return (
    <>
      <path
        d="M17 18c5 2 9 1 13-2h4c4 3 8 4 13 2 4 9 5 20 1 31H16c-4-11-3-22 1-31Z"
        fill={COLORS.blue}
      />
      <path d="M24 27h16M22 39h20" fill="none" stroke="#dff0ff" strokeWidth="4" />
    </>
  );
}

function LeggingsIcon() {
  return (
    <>
      <path
        d="M20 16h24c2 13 1 23-3 35h-9c-1-8-1-15 0-21-3 7-4 14-6 21h-9c1-13 1-24 3-35Z"
        fill={COLORS.blue}
      />
      <path d="M25 23h14" fill="none" stroke="#dff0ff" strokeWidth="4" />
    </>
  );
}

function BootsIcon() {
  return (
    <>
      <path d="M18 27c8-3 13 2 13 10v9H14l4-19Z" fill={COLORS.blue} />
      <path d="M38 27c8-3 13 2 13 10v9H34l4-19Z" fill={COLORS.blue} />
      <path d="M20 34c3-2 6-2 8 0M40 34c3-2 6-2 8 0" fill="none" stroke="#dff0ff" strokeWidth="3" />
    </>
  );
}

function ElytraIcon() {
  return (
    <>
      <path d="M30 17c-10 2-17 9-18 23 8 2 16-3 20-14l-2-9Z" fill={COLORS.purple} />
      <path d="M34 17c10 2 17 9 18 23-8 2-16-3-20-14l2-9Z" fill={COLORS.purple} />
    </>
  );
}

function ShieldIcon() {
  return (
    <>
      <path
        d="M20 15h24c4 5 5 18 1 27-3 6-8 10-13 12-6-2-11-6-14-12-4-9-2-22 2-27Z"
        fill={COLORS.cyan}
      />
      <path d="M32 18v31M23 26h18" fill="none" stroke="#dff8ff" strokeWidth="4" />
    </>
  );
}

function ShearsIcon() {
  return (
    <>
      <circle cx="23" cy="25" r="7" fill={COLORS.steelLight} />
      <circle cx="42" cy="25" r="7" fill={COLORS.steelLight} />
      <path d="M27 31 19 47M38 31l8 16" fill="none" stroke={COLORS.steel} strokeWidth="5" />
      <circle cx="23" cy="25" r="3" fill="#f7fbff" stroke="none" />
      <circle cx="42" cy="25" r="3" fill="#f7fbff" stroke="none" />
    </>
  );
}

function FlintAndSteelIcon() {
  return (
    <>
      <path
        d="M20 17c10-6 23 1 20 13-1 6-8 9-14 6"
        fill="none"
        stroke={COLORS.steel}
        strokeWidth="7"
      />
      <path d="M39 38c5-4 10 1 8 7-2 6-12 6-14 0 0-4 2-6 6-7Z" fill={COLORS.red} />
      <path d="M40 38c-1-5 2-8 6-11 0 5 4 7 1 12" fill={COLORS.orange} />
    </>
  );
}

function CarrotRodIcon() {
  return (
    <>
      <path d="M18 14c13 8 23 21 29 36" fill="none" stroke={COLORS.wood} strokeWidth="5" />
      <path d="M40 43c4-4 10-2 12 3-3 6-10 7-14 3 0-2 1-5 2-6Z" fill={COLORS.orange} />
      <path d="M39 43c2-4 4-6 7-8" fill="none" stroke={COLORS.green} strokeWidth="4" />
    </>
  );
}

function FungusRodIcon() {
  return (
    <>
      <path d="M18 14c13 8 23 21 29 36" fill="none" stroke={COLORS.wood} strokeWidth="5" />
      <path d="M38 42c5-7 15-6 17 1-1 7-10 9-16 5-2-2-2-4-1-6Z" fill={COLORS.green} />
      <circle cx="47" cy="44" r="3" fill={COLORS.purple} stroke="none" />
    </>
  );
}

function BrushIcon() {
  return (
    <>
      <rect x="28" y="13" width="10" height="28" rx="4" fill={COLORS.wood} />
      <path d="M18 38c8-5 22-5 29 0v10c-8 5-21 5-29 0V38Z" fill={COLORS.orange} />
      <path d="M24 40c5-2 13-2 18 0" fill="none" stroke="#ffe5bf" strokeWidth="3" />
    </>
  );
}
