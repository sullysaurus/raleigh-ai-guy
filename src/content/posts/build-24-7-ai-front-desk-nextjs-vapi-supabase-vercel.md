---
pubDate: 2026-07-19T09:00:00-04:00
title: "Build a 24/7 AI Front Desk with Next.js, Vapi, Supabase, and Vercel"
description: "An advanced architecture guide for answering calls, capturing qualified leads, notifying a business, and operating an AI front desk safely."
image:
  url: "/src/images/posts/vapi-voice-agents-product.png"
  alt: "Vapi voice agent product page showing a person taking a customer call"
tags:
  - advanced
  - voice-ai
  - nextjs
  - vapi
  - supabase
  - small-business
---

A plumber underneath a sink cannot answer every call. A salon owner with a client cannot stop mid-appointment. A missed call still may be the most valuable event on their phone that day.

This is a good use of AI: not because a talking bot is impressive, but because answering quickly can recover an opportunity that would otherwise disappear.

In this guide, we will design a 24/7 front desk with:

- **Vapi** for the phone number, live voice conversation, and assistant tools
- **Next.js** for the business dashboard and webhook endpoints
- **Supabase** for leads, calls, configuration, and follow-up status
- **Vercel** for hosting the Next.js application and server-side functions

> **Advanced build:** This system handles customer conversations and personal data. Build it first with test numbers and synthetic callers. Review recording-consent, privacy, telemarketing, and industry rules that apply to your location and use case.

## The architecture

```text
Customer calls
      ↓
Vapi voice assistant
      ├── answers approved questions
      ├── captures the caller's need
      └── calls a protected tool or webhook
                         ↓
Next.js Route Handler on Vercel
      ├── verifies the request
      ├── normalizes the result
      └── writes an idempotent event
                         ↓
Supabase
      ├── business settings
      ├── calls and summaries
      ├── leads and urgency
      └── follow-up status
                         ↓
Owner notification + dashboard
```

Vapi’s [assistant quickstart](https://docs.vapi.ai/assistants/quickstart) covers creating an assistant, attaching a phone number, and adding tools. Its [server URL documentation](https://docs.vapi.ai/server-url) explains the events your application can receive, including status updates, transcripts, tool calls, and end-of-call reports.

## Step 1: Define the front desk’s job

The assistant should not pretend to run the company. Give it a narrow role:

1. Greet the caller and identify the business.
2. Learn why they are calling.
3. Capture name, callback number, location, and urgency.
4. Answer only approved, stable questions.
5. Transfer the call or set an honest follow-up expectation.
6. Send a structured lead to the business.

Explicitly prohibit unapproved quotes, guaranteed appointment times, professional advice, payment collection, and invented policies. If the assistant is uncertain, it should capture the question for a human.

## Step 2: Model the data in Supabase

Start with five tables:

- `businesses`: name, phone configuration, hours, escalation number
- `callers`: normalized phone number and contact details
- `calls`: provider call ID, status, timestamps, summary, recording policy
- `leads`: need, urgency, service address, owner, follow-up status
- `call_events`: provider event ID, event type, received time, minimal raw payload

Use unique constraints on provider IDs so a retried webhook does not create a second lead. Enable Row Level Security on exposed tables. Supabase warns in its [RLS guide](https://supabase.com/docs/guides/database/postgres/row-level-security) that service keys bypass RLS; keep the service-role key on the server and never expose it to the browser.

## Step 3: Create the Vapi assistant

Write the system prompt like an operations manual, not a personality exercise. Include:

- The business name and service area
- The questions it must collect
- Approved answers and sources
- Transfer rules during business hours
- Emergency and out-of-scope language
- What it must never promise
- When to stop asking questions
- How to confirm names, numbers, and addresses

Add a structured tool such as `capture_lead`. Require fields that the business actually uses. Do not collect information merely because you can.

Test interruptions, accents, background noise, silence, angry callers, repeat callers, and questions outside the script. A voice system has to recover gracefully, not just perform well in a quiet demo.

## Step 4: Receive events in Next.js

Create a Route Handler at:

```text
app/api/vapi/webhook/route.ts
```

Next.js [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers) support `POST` requests inside the App Router. The handler should follow this order:

```ts
export async function POST(request: Request) {
  // 1. Authenticate the request using Vapi's current server-auth method.
  // 2. Parse and validate only the event types you support.
  // 3. Reject missing business and provider identifiers.
  // 4. Insert the event idempotently.
  // 5. Upsert the call and lead using a server-only Supabase client.
  // 6. Queue the owner notification.
  // 7. Return quickly with a successful response.
}
```

Do not copy a signature example from an old tutorial. Implement the current method in Vapi’s [server authentication documentation](https://docs.vapi.ai/server-url/server-authentication), rotate the credential, and reject arbitrary internet traffic before processing a payload.

Perform slow enrichment and notifications after the event is safely recorded. Store the smallest useful payload and set a retention policy for transcripts and recordings.

## Step 5: Build the owner dashboard

The dashboard should make the next action obvious. Show:

- New leads requiring a callback
- Caller, need, urgency, and call time
- A concise summary with access to the source when permitted
- Call-back, assign, resolved, and not-a-fit actions
- Failed calls or notifications that need attention

An AI summary is not the record of truth. Let the owner inspect the relevant transcript or recording when consent and retention policies allow it.

## Step 6: Deploy safely on Vercel

Deploy the Next.js application to Vercel and configure secrets as environment variables:

- Vapi server credential
- Supabase project URL
- Supabase service-role key for server-only operations
- Notification-provider credentials

Vercel’s [environment variable guide](https://vercel.com/docs/environment-variables) explains how values are scoped to deployments. Never prefix secrets with `NEXT_PUBLIC_`; that makes them available to browser code.

Use separate development and production projects. After deployment, point Vapi’s server URL to the production webhook and run the complete call flow.

## Step 7: Test the failures

The launch checklist should include more than happy calls:

- The webhook arrives twice
- Supabase is temporarily unavailable
- The caller refuses recording
- The transfer number does not answer
- The owner notification fails
- The caller changes details mid-conversation
- The assistant does not understand an address
- A caller tries to override the assistant’s rules
- The model or voice provider times out

Provide a fallback: transfer, take a minimal message, or route to voicemail. Alert the operator when delivery fails. “24/7” should describe when the system can answer—not promise that no dependency will ever fail.

## Measure the business result

Track:

- Calls answered outside working hours
- Leads with complete contact details
- Time from call to human follow-up
- Transfer success rate
- Incorrect answers and escalations
- Leads won, lost, or marked unqualified
- Cost per useful conversation

The voice quality matters, but the business outcome matters more. If owners cannot act on the captured information, the system is only producing attractive transcripts.

## Want the result without building the stack?

I built [Raleigh Lead Recovery](https://raleighleadrecovery.com/) for small business owners who cannot always answer the phone.

Dana answers calls that would have gone to voicemail, captures what the customer needs, and texts the opportunity to the team—so the owner can keep working without letting a good lead disappear.

[See Raleigh Lead Recovery →](https://raleighleadrecovery.com/)
