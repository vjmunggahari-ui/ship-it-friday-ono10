import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "fix: the users were the bug, so I removed them — deploying Friday 4:59pm, see you Monday";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Gate self-check: entry.txt must be UTF-8 text of 1 to 159 characters,
// not only white space, and a single line.
if (LINE.length < 1 || LINE.length > 159 || LINE.trim().length === 0) {
  throw new Error(`entry length ${LINE.length} is outside the 1-159 gate`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read-back self-check: the file on disk must be byte-identical to the line.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}
