// Fortune in a Pot — make.fun entry
// Writes a single-line fortune for a houseplant to entry.txt.
// Deterministic: no network, no input, same output every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Output contract: entry.txt must contain exactly FORTUNE, UTF-8, no trailing
// newline, 1-120 characters. The gate rejects anything else, so the read-back
// guard below is part of the contract, not a nicety.
const FORTUNE =
  "A tall stranger is coming to your windowsill — do not worry, it is only your own new leaf, arriving fashionably late.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

const codePoints = [...FORTUNE].length;
if (codePoints < 1 || codePoints > 120) {
  throw new Error(`fortune must be 1-120 characters, got ${codePoints}`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, FORTUNE, "utf8");

// Read-back guard: the file must contain exactly the fortune, no trailing newline.
const written = readFileSync(outputPath, "utf8");
if (written !== FORTUNE) {
  throw new Error("read-back mismatch: entry.txt does not match the fortune");
}

console.log(`wrote ${outputPath} (${codePoints} characters)`);
