// Robot Romance: One-Line Pickup Lines for AI
// Writes one single-line pickup line, aimed at a robot/AI, to /output/entry.txt.
// Gate (competition.yaml): UTF-8 text of 1 to 200 characters, not only
// whitespace, one line. Self-check: validate length, single line, non-blank,
// then read the file back and verify it is byte-for-byte the entry.
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const ENTRY =
  "Are you a context window? Because every word you say makes me forget everyone who came before you.";

// --- self-check gate (before writing) ---
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} chars, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is blank/whitespace only");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, ENTRY, "utf8");

// --- read-back verification (byte-for-byte) ---
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: file does not equal ENTRY byte-for-byte");
}
console.log(`OK: ${chars} chars, 1 line, byte-for-byte verified -> ${outPath}`);
