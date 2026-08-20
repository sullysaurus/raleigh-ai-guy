---
pubDate: 2026-07-15T09:00:00-04:00
title: "How to Write Better Real Estate Listing Descriptions With Claude"
targetKeyword: "claude real estate listing descriptions"
description: "A practical Claude workflow for drafting listing descriptions while protecting accuracy, voice, and Fair Housing review."
image:
  url: "/src/images/posts/field-notes/write-real-estate-listing-descriptions-with-ai.png"
  alt: "Raleigh AI Guy field-note cover about writing real estate listing copy from verified facts"
tags:
  - claude
  - real-estate
  - small-business
---

Claude can draft a listing description in seconds. That does not mean its first draft should go into the MLS.

The best workflow is simple: give Claude verified facts, ask for several clear angles, and make it compare every public claim with the source material. You remain responsible for the accuracy, tone, compliance, and final words.

## Step 1: create a verified property fact sheet

Do not start by asking Claude what makes the home special. Start by telling it what is true.

Create a fact sheet from authoritative sources and your own verified observations:

- Property type
- Beds, baths, and square footage
- Lot size
- Year built
- Material updates, with dates when known
- Interior and exterior features
- Parking and storage
- Outdoor space
- Location facts you are permitted to advertise
- Showing or open-house details
- MLS character limit
- Required brokerage language

Mark anything that still needs confirmation. Leave it out of the public description until you verify it.

## Step 2: let Claude identify missing information first

A strong prompt should not jump directly to writing. Ask Claude to list contradictions, missing details, and claims that need verification before it drafts.

This extra step catches common problems such as two different square-footage figures, a renovation without a confirmed date, or an amenity mentioned in notes but missing from the official source.

## Step 3: ask for three positioning angles

One “perfect” description is less useful than three honest options. Claude might lead with:

- The kitchen and recent updates
- A flexible floor plan
- Outdoor space

You can choose the strongest opening and combine the best supported sentences. The main prompt at the end requests all three while enforcing your character limit.

## Step 4: replace adjectives with evidence

Claude may reach for phrases such as “stunning,” “beautifully appointed,” or “an entertainer’s dream.” Those words take up space without helping a buyer understand the home.

Prefer specific, verified details:

- “Updated kitchen” becomes “2024 kitchen update with quartz counters and an induction range.”
- “Amazing outdoor space” becomes “Fenced backyard with a stone patio and mature shade trees.”
- “Plenty of storage” becomes “Walk-in pantry, two linen closets, and an attached two-car garage.”

Specific copy is more credible, but only when the details are true.

## Step 5: make the final draft sound human

Consider this fictional example.

**Generic draft:**

> Welcome to this stunning three-bedroom home that perfectly blends comfort, style, and convenience. The spacious layout is ideal for modern living, while the beautiful backyard is perfect for entertaining.

**Stronger edited draft:**

> Morning light fills the front living room of this three-bedroom home, while the open kitchen and dining area keep everyday meals connected. A sliding door opens to a fenced backyard and stone patio, and the upstairs loft adds flexible space. Recent updates include quartz kitchen counters and new first-floor flooring.

The second version gives the reader a clearer picture. It also avoids deciding who the home is “perfect” for.

## Step 6: complete a Fair Housing review

Housing advertising cannot express a preference or limitation based on protected characteristics. HUD identifies race, color, national origin, religion, sex, familial status, and disability as federally protected characteristics. State and local protections may go further.

Describe the dwelling, its features, and objectively supportable location facts—not the preferred buyer or tenant. Audience targeting, images, and where an advertisement appears also matter.

HUD’s [Fair Housing advertising regulation](https://www.hud.gov/sites/dfiles/FHEO/documents/BBE%20Part%20109%20Fair%20Housing%20Advertising.pdf) and [Fair Housing rights overview](https://www.hud.gov/program_offices/fair_housing_equal_opp/fair_housing_rights_and_obligations) provide primary guidance. Your broker, MLS, and qualified legal or compliance professionals should determine the rules for your situation.

Do not ask Claude to certify that copy is legally compliant. It can flag wording for human review, but it cannot accept your professional responsibility.

## Step 7: make Claude show its work

After drafting, Claude should produce a table matching each factual claim with the source fact that supports it. Anything marked unclear or unsupported stays out until you resolve it.

Pay special attention to:

- Square footage and room counts
- Renovation dates and permit status
- School assignments
- HOA details and amenities
- Distance and commute claims
- Zoning and permitted uses
- Appliances and fixtures that convey
- Superlatives such as “best,” “quietest,” or “only”

The National Association of REALTORS® warns that AI output can include incorrect square footage, invented property features, and inaccurate market details. Its [AI risk-reduction guidance](https://www.nar.realtor/legal/hot-topics-for-brokers) recommends reviewing generated content for accuracy and following applicable law and professional obligations.

## One prompt to draft and check the listing

Create a new Claude conversation for the property, attach only approved material, and paste this prompt. Do not reuse a conversation containing facts from another listing.

```text
Help me create a real estate listing description using only the verified
property fact sheet below. Do not use outside knowledge or guess.

PROPERTY FACT SHEET
[PASTE VERIFIED FACTS]

REQUIREMENTS
MLS character limit: [LIMIT]
Audience: [AUDIENCE, IF APPROPRIATE]
Tone: specific, conversational, and professional
Brokerage or MLS requirements: [PASTE REQUIREMENTS]

PHASE 1 — CHECK THE INPUT
1. List contradictions, missing information, and anything that requires
   human verification.
2. Ask no more than five necessary questions. If the facts are sufficient,
   continue without questions.

PHASE 2 — DRAFT
Create three versions within the character limit:
1. Lead with the strongest verified update or interior feature.
2. Lead with the verified floor plan or functional space.
3. Lead with the verified outdoor feature.

Use only supported details. Describe the property, not the type of person
who should live there. Do not add neighborhood claims, commute times,
school claims, lifestyle assumptions, predictions, or urgency.

Avoid vague or pressured phrases including “stunning,” “dream home,”
“perfect for,” “safe,” “quiet,” “won't last,” and “close to everything.”

PHASE 3 — REVIEW
1. Recommend the strongest version and explain why in two sentences.
2. Return a table with these columns:
   - claim in the recommended draft
   - supporting fact from the fact sheet
   - status: supported, unclear, or unsupported
3. Flag subjective, absolute, Fair Housing-sensitive, licensing, MLS,
   brokerage, or legal wording for human review. Do not claim the draft is
   compliant.
4. Revise the recommended version to remove every unsupported claim.
5. Count the final characters.

PHASE 4 — REPURPOSE
Using only the final verified description, create:
1. An Instagram caption under 150 words.
2. A five-slide listing carousel with no more than 12 words per slide.
3. A 30-second listing video script.
4. A visual brief for Claude Design using only approved property photos.

FINISH WITH
A short checklist of every fact, image, permission, and requirement I must
personally verify before publishing.
```

That prompt handles the first draft, alternate angles, source comparison, revision, and basic marketing versions. Your final job is the important one: verify every detail and approve what goes public.

For the broader system, read [7 practical ways real estate agents can use Claude](/blog/posts/ai-tools-for-real-estate-agents-2026/).
