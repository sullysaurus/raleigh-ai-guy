export interface IndustryLandingPage {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  pageTitle: string;
  pageDescription: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  workflow: string[];
  frictionTitle: string;
  frictionIntro: string;
  frictions: Array<{ title: string; body: string }>;
  proofTitle: string;
  proofIntro: string;
  proofIdeas: Array<{ label: string; title: string; body: string }>;
  fitSignals: string[];
  formPrompt: string;
}

export const industryLandingPages: IndustryLandingPage[] = [
  {
    slug: "specialty-contractors",
    name: "specialty contractors",
    shortName: "Contractors",
    eyebrow: "For Raleigh HVAC, plumbing & electrical contractors",
    pageTitle: "AI Workflow Automation for Raleigh Specialty Contractors",
    pageDescription:
      "Raleigh AI Guy helps HVAC, plumbing, and electrical contractors recover estimates, reduce office busywork, and build a working proof before they invest.",
    headline: "Win more of the work",
    headlineAccent: "you already quoted.",
    intro:
      "Your team should not have to remember every estimate, retype every technician note, or chase every customer by hand. I find one expensive workflow and build a focused working proof in one week—before you pay a build fee.",
    workflow: ["New lead", "Estimate", "Follow-up", "Booked job"],
    frictionTitle: "Good work gets lost between the field and the office.",
    frictionIntro:
      "The problem is rarely a lack of effort. It is a growing business held together by inboxes, callbacks, notes, and people remembering what happens next.",
    frictions: [
      {
        title: "Estimates go quiet",
        body: "Quoted work sits without a consistent follow-up rhythm, even when the customer is still deciding.",
      },
      {
        title: "Missed calls become missed jobs",
        body: "A lead calls while everyone is busy, leaves a message, and starts calling the next company.",
      },
      {
        title: "Field notes create office work",
        body: "Photos, voice notes, and job details have to be translated into updates, invoices, and next steps.",
      },
      {
        title: "Maintenance revenue depends on memory",
        body: "Renewals, reminders, reviews, and past-customer follow-up happen inconsistently—or not at all.",
      },
    ],
    proofTitle: "Start with one workflow that can pay for itself.",
    proofIntro:
      "We do not begin with a giant software project. We choose one measurable bottleneck and prove the value first.",
    proofIdeas: [
      {
        label: "Revenue",
        title: "Estimate recovery",
        body: "Monitor open estimates, send useful follow-up, and alert a person when a customer shows intent.",
      },
      {
        label: "Response",
        title: "Missed-lead rescue",
        body: "Acknowledge missed calls and web leads quickly, collect the basics, and route urgent opportunities.",
      },
      {
        label: "Capacity",
        title: "Field-to-office handoff",
        body: "Turn technician notes and photos into clean summaries, customer updates, and office-ready next steps.",
      },
    ],
    fitSignals: [
      "You have a field team and at least one person coordinating work",
      "Open estimates, callbacks, or admin regularly fall through the cracks",
      "Fixing one workflow could save 5+ hours a week or recover meaningful revenue",
      "You can show me how the current process works",
    ],
    formPrompt: "Tell me which part of lead, estimate, or job follow-up feels hardest to keep consistent.",
  },
  {
    slug: "restoration-remediation",
    name: "restoration and remediation companies",
    shortName: "Restoration",
    eyebrow: "For Raleigh restoration & remediation companies",
    pageTitle: "AI Workflow Automation for Raleigh Restoration Companies",
    pageDescription:
      "Raleigh AI Guy helps restoration and remediation teams improve intake, job handoffs, documentation, and customer updates with a one-week proof of value.",
    headline: "Move urgent jobs faster—",
    headlineAccent: "without more office chaos.",
    intro:
      "When every lead feels urgent, the handoffs matter: first call, dispatch, documentation, customer updates, and insurance communication. I find one weak link and build a focused working proof in one week—before you pay a build fee.",
    workflow: ["Emergency call", "Dispatch", "Documentation", "Clear next step"],
    frictionTitle: "Urgency exposes every manual handoff.",
    frictionIntro:
      "Your team is coordinating people, properties, photos, documents, customers, and insurers at the same time. Small communication gaps become expensive quickly.",
    frictions: [
      {
        title: "Intake varies by who answers",
        body: "Critical job details arrive by phone, form, text, and voicemail and still have to reach the right person.",
      },
      {
        title: "Documentation is scattered",
        body: "Photos, field notes, readings, and customer details live across tools before someone assembles the record.",
      },
      {
        title: "Customers need repeated updates",
        body: "Homeowners want to know what happened, what comes next, and who is waiting on whom.",
      },
      {
        title: "The office becomes the connector",
        body: "Staff manually bridge technicians, project managers, customers, adjusters, and vendors all day.",
      },
    ],
    proofTitle: "Prove one calmer, faster handoff first.",
    proofIntro:
      "The first build is intentionally focused. We agree on the workflow, the baseline, and what a useful result should change.",
    proofIdeas: [
      {
        label: "Intake",
        title: "Emergency lead routing",
        body: "Capture consistent loss details, flag urgency, and send the right information to the right person faster.",
      },
      {
        label: "Documentation",
        title: "Job record assembly",
        body: "Turn field inputs into a structured summary that is easier for the office and project team to use.",
      },
      {
        label: "Communication",
        title: "Status update workflow",
        body: "Create timely, accurate customer updates from job activity without asking the office to rewrite everything.",
      },
    ],
    fitSignals: [
      "You coordinate multiple active jobs, field staff, and office handoffs",
      "Important information moves through calls, texts, photos, and separate systems",
      "Faster intake or clearer documentation could protect meaningful revenue",
      "You can give me access to understand and safely test one process",
    ],
    formPrompt: "Tell me where information most often slows down between intake, the field, and the customer.",
  },
  {
    slug: "commercial-landscaping",
    name: "commercial landscaping companies",
    shortName: "Landscaping",
    eyebrow: "For Raleigh commercial landscaping companies",
    pageTitle: "AI Workflow Automation for Raleigh Commercial Landscaping",
    pageDescription:
      "Raleigh AI Guy helps commercial landscaping companies improve field handoffs, enhancement quoting, client reporting, and follow-up with a one-week proof.",
    headline: "Turn field activity into",
    headlineAccent: "clear next steps.",
    intro:
      "Property notes, crew updates, enhancement opportunities, client requests, and photos should not require hours of office translation. I find one expensive workflow and build a focused working proof in one week—before you pay a build fee.",
    workflow: ["Property visit", "Field notes", "Office action", "Client update"],
    frictionTitle: "The work happens outside. The paperwork waits inside.",
    frictionIntro:
      "Commercial landscaping creates valuable information in the field every day. The bottleneck is turning it into quotes, schedules, client communication, and completed follow-up.",
    frictions: [
      {
        title: "Field notes need translation",
        body: "Voice notes, texts, and photos arrive in different formats before the office can act on them.",
      },
      {
        title: "Enhancement opportunities stall",
        body: "Good ideas spotted on-site wait for scope, pricing, approval, and customer follow-up.",
      },
      {
        title: "Client reporting takes too long",
        body: "Account managers rebuild updates from crew activity instead of starting with a clean summary.",
      },
      {
        title: "Recurring work creates recurring admin",
        body: "Schedules, exceptions, quality checks, and change requests create the same coordination work every week.",
      },
    ],
    proofTitle: "Choose one handoff and make it visibly better.",
    proofIntro:
      "The goal is not technology for its own sake. It is fewer dropped details, faster action, and more capacity from the team you already have.",
    proofIdeas: [
      {
        label: "Growth",
        title: "Enhancement follow-through",
        body: "Turn field observations into organized opportunities, draft scopes, and a consistent approval follow-up process.",
      },
      {
        label: "Operations",
        title: "Crew-to-office handoff",
        body: "Structure photos and notes into issues, assignments, and updates without another round of copy-and-paste.",
      },
      {
        label: "Retention",
        title: "Client report preparation",
        body: "Build clear account updates from actual property activity so managers spend more time with customers.",
      },
    ],
    fitSignals: [
      "You manage recurring commercial properties and multiple crews",
      "Field information regularly has to be re-entered or reorganized by the office",
      "Enhancement work or client follow-up sometimes waits too long",
      "A better workflow could save 5+ hours a week or create meaningful capacity",
    ],
    formPrompt: "Tell me which field-to-office or client workflow creates the most repeat work today.",
  },
  {
    slug: "property-management",
    name: "property management companies",
    shortName: "Property management",
    eyebrow: "For Raleigh property management companies",
    pageTitle: "AI Workflow Automation for Raleigh Property Management",
    pageDescription:
      "Raleigh AI Guy helps property managers reduce maintenance coordination, resident communication, vendor follow-up, and reporting work with a one-week proof.",
    headline: "Keep every request moving—",
    headlineAccent: "without living in the inbox.",
    intro:
      "Maintenance requests, resident questions, vendor updates, owner reporting, and renewals create an endless coordination loop. I find one expensive workflow and build a focused working proof in one week—before you pay a build fee.",
    workflow: ["Resident request", "Triage", "Vendor action", "Everyone updated"],
    frictionTitle: "Property management is a communication business disguised as an inbox.",
    frictionIntro:
      "Every issue touches several people. The work multiplies when information has to be read, categorized, forwarded, followed up, and explained again.",
    frictions: [
      {
        title: "Maintenance starts as unstructured text",
        body: "Requests arrive with incomplete details and require back-and-forth before anyone can assign the right vendor.",
      },
      {
        title: "Vendor follow-up is manual",
        body: "Someone has to chase acceptance, scheduling, completion, invoices, and missing documentation.",
      },
      {
        title: "Residents ask for status",
        body: "When the process is hard to see, your team becomes the status dashboard for every open request.",
      },
      {
        title: "Owners need a different summary",
        body: "Activity across properties has to be reorganized into the concise updates owners actually want.",
      },
    ],
    proofTitle: "Fix one coordination loop before changing everything.",
    proofIntro:
      "We choose a workflow with clear volume and measurable effort, then build enough to see whether the improvement deserves a full implementation.",
    proofIdeas: [
      {
        label: "Maintenance",
        title: "Request triage",
        body: "Collect missing details, classify urgency, and prepare a cleaner handoff for your team or vendor.",
      },
      {
        label: "Coordination",
        title: "Vendor follow-up",
        body: "Track the next expected action and surface stalled work without someone scanning every open thread.",
      },
      {
        label: "Communication",
        title: "Resident and owner updates",
        body: "Turn real activity into accurate status messages and summaries without rewriting the same story twice.",
      },
    ],
    fitSignals: [
      "You manage enough units that coordination work repeats every day",
      "Requests and status updates move across residents, staff, vendors, and owners",
      "Your team spends 5+ hours a week routing, chasing, or rewriting information",
      "You can show me one process and what a successful result would change",
    ],
    formPrompt: "Tell me which maintenance, vendor, resident, or owner workflow creates the most back-and-forth.",
  },
];

