import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "We are down. All services are unreachable, and I cannot tell you why yet — the monitoring is down too. I will update this page when I know more.";

const outputPath = join(process.cwd(), "output", "entry.txt");
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, ENTRY + "\n", "utf8");
// Single honest status-page line, first person, plain voice.
console.log(`Wrote ${ENTRY.length} characters to ${outputPath}`);
