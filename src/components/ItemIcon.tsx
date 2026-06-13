const PALETTE: Record<string, string> = {
  h: "#6b4b2a",
  s: "#d8dde6",
  d: "#a9b3c2",
  g: "#f4c950",
  m: "#8f7a45",
  e: "#4fc3b4",
  n: "#596375",
  r: "#b95045",
  b: "#3e75b7",
  p: "#6f56c8",
  w: "#f1f5f9",
  k: "#1f2937",
  l: "#7ccf6b",
  o: "#e28b3f",
  x: "#94a3b8"
};

const PATTERNS: Record<string, string[]> = {
  sword: [
    "...s....",
    "..sss...",
    "..sss...",
    "..sss...",
    "..sss...",
    ".ggggg..",
    "...h....",
    "...h...."
  ],
  axe: [
    "..sss...",
    ".sssss..",
    "..ssh...",
    "...h....",
    "...h....",
    "...h....",
    "...h....",
    "...h...."
  ],
  pickaxe: [
    ".sssss..",
    "s..h..s.",
    "...h....",
    "...h....",
    "...h....",
    "...h....",
    "...h....",
    "...h...."
  ],
  shovel: [
    "..sss...",
    "..sss...",
    "...h....",
    "...h....",
    "...h....",
    "...h....",
    "...h....",
    "...h...."
  ],
  hoe: [
    "..ssss..",
    "...h....",
    "...h....",
    "...h....",
    "...h....",
    "...h....",
    "...h....",
    "...h...."
  ],
  mace: [
    "..nnn...",
    ".nnnnn..",
    ".nnnnn..",
    "..nnn...",
    "...h....",
    "...h....",
    "...h....",
    "...h...."
  ],
  bow: [
    "..h.....",
    ".h.s....",
    "h..s....",
    "h..s....",
    "h..s....",
    ".h.s....",
    "..h.....",
    "........"
  ],
  crossbow: [
    "..h.h...",
    ".hhhhh..",
    "...s....",
    "...s....",
    "..hhh...",
    "...h....",
    "...h....",
    "........"
  ],
  trident: [
    ".s.s.s..",
    ".sssss..",
    "...s....",
    "...s....",
    "...h....",
    "...h....",
    "...h....",
    "...h...."
  ],
  fishing_rod: [
    "..h.....",
    "...h....",
    "....h...",
    ".....h..",
    "......h.",
    "......s.",
    ".....s..",
    "........"
  ],
  helmet: [
    "..xxxx..",
    ".xxxxxx.",
    ".xx..xx.",
    ".x....x.",
    "........",
    "........",
    "........",
    "........"
  ],
  chestplate: [
    ".x....x.",
    "xxx..xxx",
    "xxxxxxxx",
    "xxxxxxxx",
    ".xxxxxx.",
    ".xxxxxx.",
    "........",
    "........"
  ],
  leggings: [
    ".xxxxxx.",
    ".xxxxxx.",
    ".xx..xx.",
    ".xx..xx.",
    ".xx..xx.",
    ".xx..xx.",
    "........",
    "........"
  ],
  boots: [
    "........",
    "........",
    ".xx..xx.",
    ".xx..xx.",
    ".xxx.xxx",
    "........",
    "........",
    "........"
  ],
  elytra: [
    "p......p",
    "pp....pp",
    "ppp..ppp",
    ".pppppp.",
    "..pppp..",
    "...pp...",
    "........",
    "........"
  ],
  shield: [
    "..bbbb..",
    ".bbbbbb.",
    ".bbbbbb.",
    ".bbbbbb.",
    "..bbbb..",
    "...bb...",
    "........",
    "........"
  ],
  shears: [
    ".s....s.",
    "s.s..s.s",
    ".s.ss.s.",
    "...ss...",
    "..s..s..",
    ".s....s.",
    "........",
    "........"
  ],
  flint_and_steel: [
    "..ss....",
    ".s..s...",
    ".s..s...",
    "..ss.o..",
    "....oo..",
    "...ooo..",
    "........",
    "........"
  ],
  carrot_on_a_stick: [
    ".h......",
    "..h.....",
    "...h....",
    "....h...",
    ".....h..",
    "......o.",
    ".....lll",
    "........"
  ],
  warped_fungus_on_a_stick: [
    ".h......",
    "..h.....",
    "...h....",
    "....h...",
    ".....h..",
    ".....eee",
    "......p.",
    "........"
  ],
  brush: [
    "..hhhh..",
    "..hhhh..",
    "...h....",
    "...h....",
    ".oooooo.",
    ".oooooo.",
    "........",
    "........"
  ]
};

interface ItemIconProps {
  iconId: string;
  label: string;
}

export function ItemIcon({ iconId, label }: ItemIconProps) {
  const pattern = PATTERNS[iconId] ?? PATTERNS.sword;

  return (
    <span className="pixel-icon" role="img" aria-label={label}>
      {pattern.flatMap((row, rowIndex) =>
        row.split("").map((token, columnIndex) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={`${rowIndex}-${columnIndex}`}
            className="pixel-icon__cell"
            style={{
              backgroundColor: token === "." ? "transparent" : PALETTE[token]
            }}
          />
        ))
      )}
    </span>
  );
}

