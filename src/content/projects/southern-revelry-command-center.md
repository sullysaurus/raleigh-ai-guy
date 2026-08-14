---
pubDate: 2026-08-14
title: Southern Revelry Revenue & Operations Command Center
subtitle: How HoneyBook, Google Sheets, Google Ads, Search Console, and manual follow-up workflows became one secure operating view for a Texas event-services company.
live: "https://southernrevelrytx.com/"
status: ongoing
image:
  url: "/src/images/projects/southern-revelry-website.png"
  alt: "Southern Revelry website featuring premium event services in Texas."
caseStudyCover:
  url: "/case-study/southern-revelry/01-command-center.png"
  alt: "Fictional-data demo of the Southern Revelry command center showing sales, revenue, advertising, SEO, and integration health."
---

## From scattered systems to one operating picture

[Southern Revelry](https://southernrevelrytx.com/) provides photo booths, 360 booths, GlamBOT experiences, dance floors, bar services, margarita machines, and multi-service event packages across Austin, San Antonio, and surrounding Texas markets.

The business already had useful tools. HoneyBook managed client projects, contracts, files, invoices, and payments. Google Sheets held years of historical leads and operating notes. Google Ads generated demand. Search Console showed how the website performed in organic search. Email and website forms carried the conversations that moved an inquiry toward a booking.

The problem was not a lack of data. The problem was having to assemble the story manually.

I designed and built a secure revenue and operations command center that brings those signals into one owner-focused view. It shows which leads need attention, how much revenue is booked and collected, which marketing channels produce qualified opportunities, where organic search demand is growing, and whether any connection or mapping needs review.

> HoneyBook remains the client system of record. The command center turns its data—and the data around it—into priorities, attribution, and action.

*All application screenshots in this case study use simulated records. No Southern Revelry customer, payment, message, or event data is shown.*

## The challenge

Southern Revelry needed reliable answers to questions that crossed several systems:

- Which new leads still need a first response?
- When was each lead last contacted, and what should happen next?
- Was a proposal sent, viewed, or signed?
- Which services did the lead request?
- What is estimated, booked, collected, and still outstanding?
- Which campaigns and search terms produced qualified leads or revenue?
- Which organic pages and queries have the best growth potential?
- Did an import, webhook, OAuth connection, or normalization rule fail?

The existing Sheet also contained inconsistent service names and booking statuses. Automatically forcing every value into a clean category would have made the dashboard look tidy while quietly corrupting the history.

That was the central product decision: the system had to make the business easier to operate without pretending uncertain data was certain.

## The solution

I built the application with Next.js, TypeScript, Supabase/Postgres, row-level security, Tailwind CSS, Zod validation, authenticated server routes, background jobs, structured synchronization logs, and an audit trail.

The command center sits above the existing tools as the operational reporting and attribution layer. It does not reverse-engineer HoneyBook or replace the workflows Southern Revelry already trusts.

The owner can open one screen and immediately see sales attention, bookings, revenue, collections, upcoming events, advertising efficiency, organic search performance, and integration health.

![Fictional-data demo of the Southern Revelry owner command center.](/case-study/southern-revelry/01-command-center.png)

## What changed

### Every lead has one clear next step

The sales pipeline combines lead name, stage, source, owner, event date, venue, requested services, value, proposal state, last contact, next follow-up, and attribution.

Saved views surface new inquiries, leads awaiting a response, overdue follow-ups, unviewed proposals, viewed-but-unbooked proposals, hot leads, booked events, lost leads, owners, and service categories.

HoneyBook-owned fields stay visibly distinct from dashboard-owned follow-up and temperature fields. The application never presents guessed information as confirmed HoneyBook data.

![Fictional-data demo of the Southern Revelry sales pipeline.](/case-study/southern-revelry/02-sales-pipeline.png)

### Historical Google Sheets data became usable without losing its source

I connected the existing Leads workbook through read-only Google OAuth and imported 110 historical rows into Supabase.

Every imported row retains its spreadsheet source, tab, row number, raw values, normalized values, import timestamp, mapping decisions, and errors. Re-running the import updates the same source records instead of creating duplicate leads.

The app also includes a CSV upload path, so the team can refresh historical data manually without paying for an automation service.

![Fictional-data demo of the historical lead import workflow.](/case-study/southern-revelry/05-historical-import.png)

### Ambiguous data is reviewed instead of silently rewritten

Known values normalize automatically into canonical services and pipeline stages. Uncertain values enter a mapping queue.

An authorized user can inspect every affected source row, choose a canonical value, exclude the value, or save a rule for future imports. One decision can update every matching pending record while preserving the original wording.

![Fictional-data demo of the human-reviewed mapping queue.](/case-study/southern-revelry/07-mapping-queue.png)

### HoneyBook feeds the operating view through supported workflows

The application includes authenticated webhook endpoints for supported HoneyBook/Zapier events such as new inquiries, project-stage changes, bookings, payments, and meetings.

Webhook processing includes shared-secret verification, idempotency keys, replay protection, redacted payload retention, retry handling, error states, and an audit trail. HoneyBook remains responsible for contracts, smart files, invoices, and payments.

The production webhook path is ready; creating and turning on the client’s final Zapier workflows remains a client-controlled account step.

### Advertising is measured by business outcomes

The Google Ads integration is read-only by default. It separates Google-reported conversions from CRM-attributed inquiries, qualified leads, proposals, bookings, and collected revenue.

Campaign reporting includes spend, leads, qualified leads, proposals, bookings, revenue, cost per lead, cost per booking, lead-to-booking rate, revenue per lead, and ROAS. A health panel flags inactive conversion actions, spend without leads, missing click identifiers, and bookings that cannot be matched confidently.

Offline conversion uploads remain disabled until tracking, ownership, customer-data terms, and deduplication are verified—and the client explicitly approves production use.

![Fictional-data demo of closed-loop Google Ads reporting.](/case-study/southern-revelry/03-google-ads.png)

### Organic search becomes a revenue opportunity list

The Search Console integration requests read-only access and keeps Google’s two-to-three-day reporting delay visible.

The SEO dashboard tracks clicks, impressions, CTR, average position, top queries, top pages, visibility gains and losses, high-impression low-CTR opportunities, and queries sitting just outside the strongest positions.

It also separates branded and non-branded demand, service categories, Austin and San Antonio intent, and mobile versus desktop performance. Search Console queries remain aggregated; the system does not claim that a specific private query produced a specific person unless a valid attribution mechanism proves it.

![Fictional-data demo of Search Console opportunity reporting.](/case-study/southern-revelry/04-search-console.png)

### Connection health is part of the product

Every source shows its connection state and last successful synchronization. A partial provider failure does not block the rest of the dashboard.

OAuth refresh tokens are encrypted at rest. Secrets stay server-side. Organization data is isolated with row-level security. Financial access is role-restricted, and material changes are written to an audit log.

![Simulated integration-health view; connection states and timestamps are fictional.](/case-study/southern-revelry/06-integrations.png)

## Built in safe phases

The work was deliberately sequenced so Southern Revelry could get useful value before every external system was fully authorized.

1. Build the database, authentication, historical import, normalized pipeline, follow-up tools, and integration-health framework.
2. Add HoneyBook/Zapier webhooks, Google Ads read-only reporting, and Search Console OAuth.
3. Add closed-loop attribution, communication synchronization, proposal activity, and advanced reporting.
4. Enable enhanced conversions and offline revenue uploads only after testing and explicit approval.

This approach made the foundation useful immediately while keeping higher-risk advertising writes behind clear gates.

## Quality and operational safeguards

The application includes automated tests for normalization, currency handling, attribution, date ranges, webhook idempotency, OAuth state validation, organization isolation, duplicate imports, mapping behavior, retries, and conversion-upload deduplication.

The production foundation passed linting, type checking, a full application build, 46 automated tests, desktop browser checks, and mobile navigation checks before handoff.

## The outcome

Southern Revelry now has one place to answer the daily operating question: **What needs attention now?**

The owner can move from a lead to its services, follow-up history, proposal state, value, attribution, and source system without reconstructing the story across HoneyBook, Sheets, advertising platforms, search reports, and notes.

The transformation is practical: disconnected records became a secure operating layer that preserves source truth, exposes uncertainty, and makes the next action visible.

## My role

Operational discovery, product strategy, data modeling, workflow design, UX and interface design, Google OAuth architecture, Supabase security, historical-data migration, HoneyBook/Zapier webhook design, advertising and SEO reporting, application development, deployment, and automated testing.
