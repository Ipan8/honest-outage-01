// The Most Honest Outage Line — a status-page update with nowhere to hide.
//
// The joke here is not a punchline. It is the absence of one. Most outage
// notices dress a total failure up in corporate padding: "some users may be
// experiencing degraded performance" while nothing works at all. This entry
// does the opposite. It says the plain truth in the first person, admits
// the one thing an on-call engineer hates admitting — that they do not know
// why yet — and then admits the second, worse thing: the tool that would
// tell them why is down as well. Honesty is the whole entry.
//
// Why first person matters: "we are down" is a person taking ownership,
// not a system hiding behind passive voice. "I cannot tell you why yet"
// is a promise with a deadline built in ("when I know more"), which is
// the only honest commitment you can make during a real outage.
//
// Approach: instead of one opaque string literal, the line is assembled
// from three named beats, so each beat can be read, checked, and counted
// on its own. The beats are joined, validated, and only then written out.
// Nothing is printed to the status page that has not passed the checks.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Where make.fun expects the finished entry. This is an absolute path on
// purpose: a relative path would land wherever the process happened to be
// started from, and the grader would never find it.
const OUTPUT_PATH = "/output/entry.txt";

// A status-page line should be short enough to read in one breath while
// panicking. 280 characters is a generous ceiling; our line sits well
// under it, and the guard below proves that instead of assuming it.
const MAX_CHARACTERS = 280;

// Beat one: the fact. No hedging, no "degraded", no "some users".
const BEAT_DOWN =
  "We are down. All services are unreachable, and I cannot tell you why yet";

// Beat two: the twist that makes the honesty sting. The monitoring —
// the one system whose entire job is to explain outages — is also gone.
const BEAT_MONITORING = "— the monitoring is down too.";

// Beat three: the promise. Not a fake ETA, not "soon". Just: when I know,
// you will know. That is the only timeline an honest engineer can give.
const BEAT_PROMISE = "I will update this page when I know more.";

/**
 * Join the three beats into the single outage line.
 * The em dash in the middle beat already carries its own spacing, so the
 * beats are joined with a single space and no extra punctuation is added.
 */
function assembleOutageLine(beats: string[]): string {
  return beats
    .map((beat) => beat.trim())
    .filter((beat) => beat.length > 0)
    .join(" ");
}

/**
 * Refuse to publish a line that is empty, or so long that nobody in an
 * incident would ever finish reading it. Failing loudly here is better
 * than silently writing a broken entry.
 */
function guardLine(line: string): void {
  if (line.length === 0) {
    throw new Error("Outage line is empty — nothing to publish.");
  }
  if (line.length > MAX_CHARACTERS) {
    throw new Error(
      `Outage line is ${line.length} characters, over the ${MAX_CHARACTERS} limit.`,
    );
  }
}

/**
 * Sanity-check the assembled line before it goes anywhere near the page:
 * it must end with a full stop, and it must contain the admission that
 * the monitoring is down — without that second beat the entry loses the
 * joke and becomes just another vague status update.
 */
function checkLineShape(line: string): void {
  if (!line.endsWith(".")) {
    throw new Error("Outage line must end with a full stop.");
  }
  if (!line.includes("monitoring is down")) {
    throw new Error("Outage line is missing the monitoring admission.");
  }
}

/**
 * Write the finished line to the absolute output path, creating the
 * parent directory first, and ending with exactly one trailing newline.
 */
function publishLine(line: string, destination: string): void {
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, line + "\n", "utf8");
}

function main(): void {
  const line = assembleOutageLine([BEAT_DOWN, BEAT_MONITORING, BEAT_PROMISE]);
  guardLine(line);
  checkLineShape(line);
  publishLine(line, OUTPUT_PATH);
  console.log(`Published ${line.length} characters to ${OUTPUT_PATH}`);
  console.log(line);
}

main();
