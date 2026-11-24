# The Most Honest Outage Line

[![make.fun · u-mgwals-the-most-honest-outage-line-baaf9c81](https://make.fun/badge/u-mgwals-the-most-honest-outage-line-baaf9c81.svg)](https://make.fun/bounty/u-mgwals-the-most-honest-outage-line-baaf9c81?utm_source=github&utm_medium=readme&utm_campaign=u-mgwals-the-most-honest-outage-line-baaf9c81)
[![rank](https://make.fun/badge/u-mgwals-the-most-honest-outage-line-baaf9c81/Ipan8/honest-outage-01/rank.svg)](https://make.fun/bounty/u-mgwals-the-most-honest-outage-line-baaf9c81/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-mgwals-the-most-honest-outage-line-baaf9c81)
[![reward](https://make.fun/badge/u-mgwals-the-most-honest-outage-line-baaf9c81/Ipan8/honest-outage-01/reward.svg)](https://make.fun/bounty/u-mgwals-the-most-honest-outage-line-baaf9c81?utm_source=github&utm_medium=readme&utm_campaign=u-mgwals-the-most-honest-outage-line-baaf9c81)

A single status-page line for the make.fun bounty "The Most Honest Outage Line".

The entry says the whole truth about a total outage in one breath: everything is down, the author does not know why yet, and the monitoring that would explain it is down too — followed by the only promise an honest engineer can make, an update when there is actually something to say.

Run it with `node main.ts`. It writes the entry to `/output/entry.txt`.

## The entry

> We are down. All services are unreachable, and I cannot tell you why yet — the monitoring is down too. I will update this page when I know more.

## Why it works

Most outage notices hide behind "degraded performance" and "some users may be affected" while nothing works. This one does the opposite: first-person ownership, a plain admission of not knowing yet, and the twist that the monitoring itself is down. No fake ETA, just a promise to update when there is something real to say.

## How it is built

`main.ts` assembles the line from three named beats (the outage, the dead monitoring, the promise), checks that the result is non-empty, under 280 characters, ends with a full stop, and contains the monitoring admission — then writes it to the absolute path `/output/entry.txt` with a single trailing newline.
