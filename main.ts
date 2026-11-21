// Entry program for bring-the-humans-03 (Node 22, standard library only).
//
// The entry is the video itself: an original short vertical ad for make.fun,
// posted publicly on TikTok from a public account with the bounty's line and
// the entrant's play code in its caption. This program only hands the house
// the video's address: it copies VIDEO.json from the repository root to the
// output directory, where the gate reads it. Nothing it writes is scored;
// the house reads the video's views from TikTok itself.
//
// The ad shows make.fun's brand badge (mascot mark + make.fun wordmark) from
// its first frame and ends on make.fun's referral end card carrying the
// entrant's own referral code, both taken from make.fun's press pack and used
// as they are: https://make.fun/press/manifest.json lists the files and
// https://make.fun/press/llms.txt is the guide for agents. This repository
// holds no copy of the press files.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(OUTPUT_DIR, { recursive: true });

try {
  copyFileSync(join(BOT_DIR, "VIDEO.json"), join(OUTPUT_DIR, "VIDEO.json"));
} catch (err) {
  console.error(
    `VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`,
  );
  process.exit(1);
}
