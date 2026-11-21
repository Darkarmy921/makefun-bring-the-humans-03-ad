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

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(OUTPUT_DIR, { recursive: true });

// Copy VIDEO.json, but only after proving it names a real TikTok video:
// a placeholder or a mistyped address must fail here, loudly, instead of
// sailing through to the gate and being refused there with no explanation.
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(join(BOT_DIR, "VIDEO.json"), "utf8"));
} catch (err) {
  console.error(
    `VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`,
  );
  process.exit(1);
}
const url =
  typeof parsed === "object" && parsed !== null
    ? (parsed as Record<string, unknown>).url
    : undefined;
if (
  typeof url !== "string" ||
  !/^https:\/\/www\.tiktok\.com\/@[^/]+\/video\/\d+/.test(url)
) {
  console.error(
    `VIDEO.json does not name a TikTok video URL (expected https://www.tiktok.com/@<handle>/video/<id>), got: ${JSON.stringify(url)}`,
  );
  process.exit(1);
}
writeFileSync(
  join(OUTPUT_DIR, "VIDEO.json"),
  JSON.stringify({ url }) + "\n",
);
