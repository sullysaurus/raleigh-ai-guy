# HoneyBook Command Center — Follow-up System

## Funnel rule

Keep the public funnel simple:

**Meta ad → one landing page → “Map my command center” → Calendly**

Do not add a second form or a second offer to the landing page. The landing page should continue to have one conversion goal: booking the complimentary Command Center Blueprint.

## Where Smartlead fits

Smartlead is useful for sales follow-up, but it should not replace Calendly's transactional appointment reminders.

- **Calendly owns:** booking confirmation, calendar invitation, 24-hour reminder, and 1-hour reminder.
- **Smartlead owns:** opted-in lead nurture, no-show recovery, and post-call sales follow-up.
- **CRM owns:** lifecycle stage, call outcome, next action, proposal status, and won/lost revenue.
- **The command center owns:** the combined view and alerts across all three.

Never add anonymous Meta visitors to Smartlead. A person must provide an email through Calendly, a Meta lead form, or another explicit opt-in. Keep cold outbound in a separate Smartlead campaign with its own copy, sending domain, and suppression rules.

## Smartlead campaign 1: opted in, not booked

Use this only if a Meta Lead Ad or another consent-based form collects an email. All messages have the same action: **Map my command center**.

### Email 1 — immediately

**Subject:** Your HoneyBook command center

Hi {{first_name}},

Thanks for asking about the HoneyBook Command Center.

The idea is simple: keep HoneyBook as the client workflow, then connect the owner-level answers around it—new inquiries, follow-up, booked and collected revenue, Google Ads, Meta Ads, Search Console, and the tasks that need attention now.

On a complimentary 30-minute Blueprint call, I’ll map the first useful version for {{company_name}} before you decide whether you want me to build it.

**Map my command center:** {{booking_url}}

— Danny

### Email 2 — day 2

**Subject:** What HoneyBook cannot see by itself

Hi {{first_name}},

HoneyBook can tell you what happened inside the client workflow. It usually cannot answer the whole owner question:

Which campaign created the inquiry, did that person book, how much was collected, and what should I do next?

That is the gap the command center closes. It does not replace the tools that already work; it makes them useful together.

**Map my command center:** {{booking_url}}

— Danny

### Email 3 — day 5

**Subject:** The owner view I built for Southern Revelry

Hi {{first_name}},

I built Southern Revelry a private command center so the owner could stop reconstructing the business from separate systems.

The most valuable part was not another chart. It was one prioritized view of leads, follow-up, pipeline, revenue, marketing performance, and the next decisions to make.

I can map the equivalent for {{company_name}} in one focused call.

**Map my command center:** {{booking_url}}

— Danny

### Email 4 — day 9

**Subject:** Should I close this out?

Hi {{first_name}},

I’ll close the loop after this.

If connecting HoneyBook, marketing performance, and revenue into one owner view is still useful, we can map the first version together. You will leave with the blueprint whether or not we build it.

**Map my command center:** {{booking_url}}

— Danny

## Smartlead campaign 2: no-show recovery

Remove the person from the unbooked nurture as soon as a meeting is booked.

### Email 1 — 15 minutes after a no-show

**Subject:** Want to find another time?

Hi {{first_name}},

Sorry we missed each other. I kept the notes for the HoneyBook Command Center Blueprint, so you do not need to start over.

**Map my command center:** {{booking_url}}

— Danny

### Email 2 — next business day

**Subject:** Keeping your blueprint open

Hi {{first_name}},

I can keep the complimentary Blueprint open if connecting HoneyBook to your ads, search data, and revenue reporting is still a priority.

Choose any time that works and I’ll come prepared to map the first useful view.

**Map my command center:** {{booking_url}}

— Danny

## Smartlead campaign 3: post-call decision

Only enroll prospects whose call outcome is **qualified — follow-up needed**. Do not enroll closed-won, closed-lost, or active-proposal contacts in a generic sequence.

### Email 1 — same day

**Subject:** Your command center blueprint

Hi {{first_name}},

Thanks for walking me through {{company_name}} today. Based on the call, the first useful build is:

1. {{priority_one}}
2. {{priority_two}}
3. {{priority_three}}

The goal is to give you one reliable owner view without changing the client workflow your team already knows.

**Map my command center:** {{booking_url}}

— Danny

### Email 2 — day 3

**Subject:** The first decision this should improve

Hi {{first_name}},

The right command center should earn its place by improving a real decision—not by adding more charts.

For {{company_name}}, that first decision is: **{{first_decision}}**.

That is what I would use to scope phase one and judge whether the build is working.

**Map my command center:** {{booking_url}}

— Danny

### Email 3 — day 7

**Subject:** Close the loop on the build?

Hi {{first_name}},

Would you like to move ahead with the first command-center phase, or should I close the loop for now?

If another conversation would help, use the same link:

**Map my command center:** {{booking_url}}

— Danny

## Required fields and automations

### Contact fields

- `first_name`
- `email`
- `company_name`
- `lead_source`
- `utm_source`
- `utm_campaign`
- `utm_content`
- `fbclid`
- `booking_status`
- `call_outcome`
- `next_action_at`
- `smartlead_campaign_id`

### Lifecycle stages

1. New lead
2. Blueprint booked
3. Blueprint completed
4. Qualified
5. Proposal sent
6. Closed won
7. Closed lost
8. Nurture

### Automation rules

- New opted-in lead without a booking → enroll in campaign 1 immediately.
- Calendly booking → stop campaign 1 and set stage to `Blueprint booked`.
- Meeting completed → set stage and call outcome; never infer this from email activity.
- No-show → enroll in campaign 2.
- Qualified call requiring a decision → enroll in campaign 3.
- Reply, unsubscribe, bounce, proposal sent, or closed stage → stop all generic sequences.
- Sync Smartlead replies back to the CRM and command center so a reply becomes a visible next action.

## Recommended stack decision

For the first version, keep the current stack:

- Calendly for booking and reminders
- Smartlead for controlled sales follow-up
- A CRM as the source of truth for stages and outcomes
- n8n for routing and synchronization
- The custom command center for attribution, priorities, and owner decisions

HighLevel is worth testing later if the business needs white-labeled client subaccounts, built-in SMS nurture, funnels, and CRM automation at scale. It should be treated as an optional operating platform—not as the offer and not as a reason to rebuild the current funnel before demand is proven.
