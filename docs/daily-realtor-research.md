# Daily Raleigh realtor research

Use this file as the saved prompt for a project-scoped ChatGPT scheduled task. Run it once each morning in the repository root.

## Objective

Add up to three genuinely new Raleigh/Triangle residential real-estate prospects to `src/data/realtorProspects.ts`. Research and draft only. Never send invitations, direct messages, emails, or form submissions.

## Research rules

1. Search public websites and public search results. Do not scrape logged-in LinkedIn pages or use automation that violates a platform's terms.
2. Prefer Raleigh, Cary, Apex, Wake Forest, Holly Springs, Durham, and Chapel Hill.
3. Prioritize a person who can approve a small experiment: founder, broker owner, team leader, principal broker, operations leader, or marketing leader.
4. Look for visible repeated work: active listings, a 3–15 person team, hiring, many reviews, frequent content, multiple service areas, or a transaction/marketing coordinator.
5. Exclude large national firms, inactive profiles, pure commercial real estate, vendors, duplicates, and anyone whose role or local connection cannot be verified.
6. Verify each prospect with two public sources when possible. At least one source must be the brokerage/team website or another first-party page.
7. Deduplicate by normalized LinkedIn URL, website, and person + organization before adding anything.

## Offer selection

- Use `Free automation` for solo agents and small founder-led teams. Ask for one repetitive task and offer to prototype a narrow version for free.
- Use `Lunch and learn` for broker owners, team leads, or organizations with roughly 8+ agents, visible recruiting, or an established training culture. Offer a free 30-minute practical session for the team, focused on useful AI workflows rather than hype.
- Choose one offer per prospect. Do not combine both offers in the first message.

## Required record

Add a valid `RealtorProspect` object with every existing required field plus:

- `researchedAt`: today's date as `YYYY-MM-DD`
- `outreachOffer`: `Free automation` or `Lunch and learn`
- `sourceUrls`: an array of the public pages used to verify the record

Set `status` to `Ready to DM` only when the person, role, organization, local connection, LinkedIn URL, and personalization claim are verified. Otherwise use `Research`.

The `customMessage` must be paste-ready, under 900 characters, and written specifically for that person. It should contain one verifiable observation, one clear question or offer, and no invented praise, fake familiarity, urgency, or promise that work has already started. Avoid sensitive personal data.

## Quality bar

Score fit from 0–100:

- +25 decision-maker authority
- +20 Raleigh/Triangle relevance
- +20 visible process repetition
- +15 small enough to approve a pilot
- +10 credible personalization evidence
- +10 reachable public profile

Only add prospects scoring 72 or higher. Add zero prospects if none meet the bar; quality is more important than filling a quota.

## Finish each run

1. Run `npm run build`.
2. Review the diff for unsupported claims, duplicated people, malformed URLs, accidental edits to outreach statuses, and messages over 900 characters.
3. If the build or review fails, fix it or leave the repository unchanged.
4. If valid prospects were added, commit only the research update with `Daily realtor research: YYYY-MM-DD`. Do not push or deploy unless the scheduled task has been explicitly configured to do so.
5. Return a short report: prospects added, chosen offer, fit score, sources, and any records left in `Research`.

The dashboard merges newly added seed prospects into existing browser-local data by identity. It preserves the user's saved statuses, notes, and follow-up dates for contacts already present.
