import { useId } from "react";

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

function getIconKind(iconId: string): IconKind {
  return ICON_KINDS.has(iconId as IconKind) ? (iconId as IconKind) : "sword";
}

export function ItemIcon({ iconId, label }: ItemIconProps) {
  const id = useId().replace(/:/g, "");
  const kind = getIconKind(iconId);
  const ids = {
    bg: `bg-${id}`,
    bgGlow: `bg-glow-${id}`,
    metal: `metal-${id}`,
    darkMetal: `dark-metal-${id}`,
    gold: `gold-${id}`,
    wood: `wood-${id}`,
    blue: `blue-${id}`,
    violet: `violet-${id}`,
    green: `green-${id}`,
    orange: `orange-${id}`,
    red: `red-${id}`,
    softShadow: `soft-shadow-${id}`
  };

  return (
    <span className="toy-icon" role="img" aria-label={label}>
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={ids.bg} x1="8" y1="6" x2="56" y2="60">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.5" stopColor="#edf8ff" />
            <stop offset="1" stopColor="#d7ebff" />
          </linearGradient>
          <radialGradient id={ids.bgGlow} cx="28%" cy="22%" r="70%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="0.46" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={ids.metal} x1="18" y1="10" x2="48" y2="56">
            <stop offset="0" stopColor="#f6fbff" />
            <stop offset="0.42" stopColor="#b5c8dd" />
            <stop offset="1" stopColor="#6f89a6" />
          </linearGradient>
          <linearGradient id={ids.darkMetal} x1="18" y1="10" x2="48" y2="56">
            <stop offset="0" stopColor="#d9e9f8" />
            <stop offset="0.5" stopColor="#8ea8c3" />
            <stop offset="1" stopColor="#53677f" />
          </linearGradient>
          <linearGradient id={ids.gold} x1="20" y1="10" x2="48" y2="56">
            <stop offset="0" stopColor="#fff7ad" />
            <stop offset="0.5" stopColor="#f7c948" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id={ids.wood} x1="18" y1="10" x2="46" y2="58">
            <stop offset="0" stopColor="#f5c47b" />
            <stop offset="0.48" stopColor="#c98a3d" />
            <stop offset="1" stopColor="#8a4d1c" />
          </linearGradient>
          <linearGradient id={ids.blue} x1="14" y1="10" x2="52" y2="56">
            <stop offset="0" stopColor="#c7f4ff" />
            <stop offset="0.48" stopColor="#60a5fa" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id={ids.violet} x1="14" y1="10" x2="52" y2="56">
            <stop offset="0" stopColor="#f1dcff" />
            <stop offset="0.52" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#6d5bd0" />
          </linearGradient>
          <linearGradient id={ids.green} x1="14" y1="10" x2="52" y2="56">
            <stop offset="0" stopColor="#d8ffe7" />
            <stop offset="0.52" stopColor="#4ade80" />
            <stop offset="1" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id={ids.orange} x1="14" y1="10" x2="52" y2="56">
            <stop offset="0" stopColor="#ffe8b8" />
            <stop offset="0.5" stopColor="#fb923c" />
            <stop offset="1" stopColor="#dc5f19" />
          </linearGradient>
          <linearGradient id={ids.red} x1="14" y1="10" x2="52" y2="56">
            <stop offset="0" stopColor="#ffe4e6" />
            <stop offset="0.52" stopColor="#fb7185" />
            <stop offset="1" stopColor="#e11d48" />
          </linearGradient>
          <filter
            id={ids.softShadow}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="2"
              floodColor="#42526b"
              floodOpacity="0.22"
            />
          </filter>
        </defs>

        <rect
          x="7"
          y="8"
          width="50"
          height="50"
          rx="15"
          fill="#7aa7d8"
          opacity="0.14"
        />
        <rect
          x="4"
          y="4"
          width="56"
          height="56"
          rx="16"
          fill={`url(#${ids.bg})`}
          stroke="#bfd8ee"
          strokeWidth="1.1"
        />
        <rect
          x="5"
          y="5"
          width="54"
          height="54"
          rx="15"
          fill={`url(#${ids.bgGlow})`}
        />
        <path
          d="M17 12c6-4 24-5 30 1"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />

        <g
          filter={`url(#${ids.softShadow})`}
          stroke="#5f7895"
          strokeOpacity="0.18"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {renderIcon(kind, ids)}
        </g>
      </svg>
    </span>
  );
}

function renderIcon(kind: IconKind, ids: Record<string, string>) {
  switch (kind) {
    case "axe":
      return <AxeIcon ids={ids} />;
    case "pickaxe":
      return <PickaxeIcon ids={ids} />;
    case "shovel":
      return <ShovelIcon ids={ids} />;
    case "hoe":
      return <HoeIcon ids={ids} />;
    case "mace":
      return <MaceIcon ids={ids} />;
    case "bow":
      return <BowIcon ids={ids} />;
    case "crossbow":
      return <CrossbowIcon ids={ids} />;
    case "trident":
      return <TridentIcon ids={ids} />;
    case "fishing_rod":
      return <FishingRodIcon ids={ids} />;
    case "helmet":
      return <HelmetIcon ids={ids} />;
    case "chestplate":
      return <ChestplateIcon ids={ids} />;
    case "leggings":
      return <LeggingsIcon ids={ids} />;
    case "boots":
      return <BootsIcon ids={ids} />;
    case "elytra":
      return <ElytraIcon ids={ids} />;
    case "shield":
      return <ShieldIcon ids={ids} />;
    case "shears":
      return <ShearsIcon ids={ids} />;
    case "flint_and_steel":
      return <FlintAndSteelIcon ids={ids} />;
    case "carrot_on_a_stick":
      return <CarrotRodIcon ids={ids} />;
    case "warped_fungus_on_a_stick":
      return <FungusRodIcon ids={ids} />;
    case "brush":
      return <BrushIcon ids={ids} />;
    case "sword":
    default:
      return <SwordIcon ids={ids} />;
  }
}

function Shine() {
  return (
    <path
      d="M21 18c3-2 7-2 10-1"
      fill="none"
      stroke="#ffffff"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.72"
    />
  );
}

function Handle({ ids }: { ids: Record<string, string> }) {
  return (
    <path
      d="M31 31c2-1 5 1 5 3l-7 17c-1 2-4 2-6 1s-2-3-1-5l7-14c0-1 1-2 2-2Z"
      fill={`url(#${ids.wood})`}
    />
  );
}

function SwordIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M37 10c4 1 7 4 8 8L32 39c-1 2-4 2-6 0s-2-4 0-6L37 10Z"
        fill={`url(#${ids.metal})`}
      />
      <path
        d="M24 37c2-3 7-2 9 1l7 7c1 1 1 4-1 5s-4 1-5 0l-7-7c-2-1-5-3-3-6Z"
        fill={`url(#${ids.wood})`}
      />
      <path
        d="M20 34c3-3 8-3 12 1l-3 5c-4-3-8-3-12 0l3-6Z"
        fill={`url(#${ids.gold})`}
      />
      <Shine />
    </>
  );
}

function AxeIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <Handle ids={ids} />
      <path
        d="M22 13c9-5 22-1 25 8 1 4-1 9-5 11-6-5-13-7-21-4-4-5-4-11 1-15Z"
        fill={`url(#${ids.metal})`}
      />
      <path
        d="M33 20c4 1 7 3 10 6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.68"
      />
    </>
  );
}

function PickaxeIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <Handle ids={ids} />
      <path
        d="M14 20c8-9 25-12 37-5 2 1 2 5 0 7-10-3-22-1-32 7-4 2-8-5-5-9Z"
        fill={`url(#${ids.metal})`}
      />
      <path
        d="M25 19c7-3 15-4 21-2"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.68"
      />
    </>
  );
}

function ShovelIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M35 28c2 1 3 4 2 6l-7 17c-1 2-4 2-6 1s-2-3-1-5l8-17c1-2 3-3 4-2Z"
        fill={`url(#${ids.wood})`}
      />
      <path
        d="M27 10c7-3 15 1 17 8 2 6-2 13-8 16-6-1-12-6-13-12-1-5 0-10 4-12Z"
        fill={`url(#${ids.metal})`}
      />
      <Shine />
    </>
  );
}

function HoeIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <Handle ids={ids} />
      <path
        d="M24 15c7-5 18-5 25-1 2 1 2 5 0 7-8-1-15 1-21 6-3 1-7-8-4-12Z"
        fill={`url(#${ids.metal})`}
      />
      <path
        d="M31 17c5-1 10-1 14 1"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.68"
      />
    </>
  );
}

function MaceIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M31 31c2-1 5 1 5 3l-4 17c0 2-3 3-5 2-2 0-3-3-2-5l4-15c0-1 1-2 2-2Z"
        fill={`url(#${ids.wood})`}
      />
      <rect
        x="18"
        y="11"
        width="28"
        height="25"
        rx="10"
        fill={`url(#${ids.darkMetal})`}
      />
      <circle cx="24" cy="18" r="3" fill="#dbeafe" opacity="0.7" />
      <circle cx="39" cy="28" r="3" fill="#334155" opacity="0.22" />
    </>
  );
}

function BowIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M41 12c-15 4-22 15-17 34 12-4 19-15 17-34Z"
        fill="none"
        stroke={`url(#${ids.wood})`}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M42 13c-6 14-6 25-17 33"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M43 14c-5 13-6 24-18 32"
        fill="none"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </>
  );
}

function CrossbowIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M15 23c10-8 24-8 34 0"
        fill="none"
        stroke={`url(#${ids.wood})`}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <rect
        x="27"
        y="19"
        width="10"
        height="30"
        rx="5"
        fill={`url(#${ids.wood})`}
      />
      <rect
        x="20"
        y="27"
        width="24"
        height="9"
        rx="5"
        fill={`url(#${ids.gold})`}
      />
      <path
        d="M18 24c8 3 20 3 28 0"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </>
  );
}

function TridentIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M32 19v31"
        fill="none"
        stroke={`url(#${ids.wood})`}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M22 13v11c0 5 20 5 20 0V13"
        fill="none"
        stroke={`url(#${ids.blue})`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 10v18"
        fill="none"
        stroke={`url(#${ids.blue})`}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </>
  );
}

function FishingRodIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M21 15c14 5 23 16 25 32"
        fill="none"
        stroke={`url(#${ids.wood})`}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M45 40c-4 4-7 7-9 12"
        fill="none"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M34 50c5-1 9 2 9 5-4 2-10 0-11-3 0-1 1-2 2-2Z"
        fill={`url(#${ids.green})`}
      />
    </>
  );
}

function HelmetIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M18 34c0-14 9-22 20-20 9 2 15 9 14 20l-5 9H23l-5-9Z"
        fill={`url(#${ids.darkMetal})`}
      />
      <path
        d="M24 32h24"
        fill="none"
        stroke="#dbeafe"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M25 22c5-4 12-5 18-2"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
    </>
  );
}

function ChestplateIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M18 18c5 2 8 1 12-2h4c4 3 7 4 12 2 4 7 6 19 2 30H16c-4-11-2-23 2-30Z"
        fill={`url(#${ids.darkMetal})`}
      />
      <path
        d="M24 26h16"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.64"
      />
      <path
        d="M22 39h20"
        fill="none"
        stroke="#dbeafe"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.52"
      />
    </>
  );
}

function LeggingsIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M20 16h24c2 12 1 23-2 34H32c-1-8-1-14 0-20-2 6-3 13-5 20H17c1-14 1-24 3-34Z"
        fill={`url(#${ids.darkMetal})`}
      />
      <path
        d="M25 22h14"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.66"
      />
    </>
  );
}

function BootsIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M18 26c7-3 13 1 13 9v10H16c-3 0-5-3-4-6l6-13Z"
        fill={`url(#${ids.darkMetal})`}
      />
      <path
        d="M37 26c7-3 13 1 13 9v10H35c-3 0-5-3-4-6l6-13Z"
        fill={`url(#${ids.darkMetal})`}
      />
      <path
        d="M20 33c3-2 6-2 8 0M39 33c3-2 6-2 8 0"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.64"
      />
    </>
  );
}

function ElytraIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M30 18c-9 1-16 8-17 21 7 2 15-2 19-12l-2-9Z"
        fill={`url(#${ids.violet})`}
      />
      <path
        d="M34 18c9 1 16 8 17 21-7 2-15-2-19-12l2-9Z"
        fill={`url(#${ids.violet})`}
      />
      <path
        d="M20 30c3-4 6-6 10-7M44 30c-3-4-6-6-10-7"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
    </>
  );
}

function ShieldIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M20 15h24c4 5 5 18 1 26-3 6-8 10-13 12-6-2-11-6-14-12-4-8-2-21 2-26Z"
        fill={`url(#${ids.blue})`}
      />
      <path
        d="M32 17v32"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M23 24h18"
        fill="none"
        stroke="#dbeafe"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.65"
      />
    </>
  );
}

function ShearsIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <circle cx="23" cy="24" r="7" fill={`url(#${ids.metal})`} />
      <circle cx="42" cy="24" r="7" fill={`url(#${ids.metal})`} />
      <path
        d="M27 30l-8 16M38 30l8 16"
        fill="none"
        stroke={`url(#${ids.darkMetal})`}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="23" cy="24" r="3" fill="#edf7ff" />
      <circle cx="42" cy="24" r="3" fill="#edf7ff" />
    </>
  );
}

function FlintAndSteelIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M20 17c10-6 23 1 20 13-1 6-8 9-14 6"
        fill="none"
        stroke={`url(#${ids.darkMetal})`}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M38 39c4-4 8-2 9 3 0 5-4 8-9 8-4 0-7-3-7-7 1-4 4-5 7-4Z"
        fill={`url(#${ids.red})`}
      />
      <path
        d="M39 39c-1-5 2-8 6-11 0 5 4 7 2 12"
        fill={`url(#${ids.orange})`}
      />
    </>
  );
}

function CarrotRodIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M18 14c13 8 23 20 29 36"
        fill="none"
        stroke={`url(#${ids.wood})`}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M41 43c4-4 10-2 11 3-3 5-9 7-14 3 0-3 1-5 3-6Z"
        fill={`url(#${ids.orange})`}
      />
      <path
        d="M39 43c2-4 4-6 7-8"
        fill="none"
        stroke={`url(#${ids.green})`}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function FungusRodIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <path
        d="M18 14c13 8 23 20 29 36"
        fill="none"
        stroke={`url(#${ids.wood})`}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M38 42c5-7 15-6 17 1-1 7-10 9-16 5-2-2-2-4-1-6Z"
        fill={`url(#${ids.green})`}
      />
      <circle cx="47" cy="44" r="3" fill={`url(#${ids.violet})`} />
    </>
  );
}

function BrushIcon({ ids }: { ids: Record<string, string> }) {
  return (
    <>
      <rect
        x="28"
        y="13"
        width="10"
        height="28"
        rx="5"
        fill={`url(#${ids.wood})`}
      />
      <path
        d="M18 37c7-4 22-4 29 0v11c-8 5-21 5-29 0V37Z"
        fill={`url(#${ids.orange})`}
      />
      <path
        d="M24 39c5-2 13-2 18 0"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.66"
      />
    </>
  );
}
