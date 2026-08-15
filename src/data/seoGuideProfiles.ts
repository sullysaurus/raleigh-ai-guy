import { seoContentPlan } from "@/data/seoContentPlan";

type GuideProfile = {
  answer: string;
  context: string;
  useCases: string[];
  steps: Array<{ title: string; detail: string }>;
  controls: string[];
  measures: string[];
  decision: string;
  ctaCopy: string;
  ctaHref?: string;
  ctaLabel?: string;
};

type Specifics = {
  answer: string;
  uses: [string, string, string];
  controls: [string, string, string];
  decision: string;
};

const specifics: Record<string, Specifics> = {
  "ai consultant raleigh nc": {
    answer: "A useful Raleigh AI consultant finds one expensive workflow, proves a small improvement with your real process, and leaves you with a system your team can operate—not a pile of generic AI recommendations.",
    uses: ["Map where a Raleigh service team loses time between an inquiry and a completed follow-up.", "Prototype one document, inbox, meeting, or CRM workflow with real examples.", "Measure the result and decide whether implementation is worth owning."],
    controls: ["The business owner choosing the outcome and acceptable risk.", "A process owner approving customer-facing work and exceptions.", "Qualified review for legal, financial, security, or employment decisions."],
    decision: "Hire local help when the hard part is understanding your workflow and getting a working proof into the tools your team already uses. A course or general tool may be enough when you only need basic education."
  },
  "ai consulting cost": {
    answer: "AI consulting cost should be tied to the size and risk of a specific workflow: discovery is usually smaller than a proof, and a production system costs more because testing, integrations, monitoring, and ownership matter.",
    uses: ["Price a short workflow assessment before committing to a broad transformation project.", "Separate prototype cost from production integration and ongoing support.", "Compare the expected annual value with build, software, review, and maintenance costs."],
    controls: ["A written scope that names inputs, outputs, systems, and exclusions.", "A stop condition when the proof cannot beat the current baseline.", "Ownership of credentials, documentation, data, and ongoing vendor charges."],
    decision: "Pay for consulting when the avoided rework, recovered revenue, or saved time can plausibly exceed total ownership cost. Do not fund a large platform before one narrow workflow proves value."
  },
  "ai readiness assessment": {
    answer: "A business is ready for AI when it has a repeated problem, usable examples, a process owner, a measurable baseline, and enough review capacity to test safely. Tool enthusiasm is not readiness.",
    uses: ["Score a process by frequency, time, variability, data availability, and consequence of error.", "Identify whether a checklist or ordinary automation is the simpler answer.", "Choose one low-blast-radius pilot with a clear human approval point."],
    controls: ["Permission to use the data included in the test.", "A named owner who can explain the current process and exceptions.", "A measurable stop rule for accuracy, time, cost, or customer impact."],
    decision: "Proceed when the workflow is valuable, observable, and reviewable. Fix the process or data first when nobody can agree on the current steps or what a correct result looks like."
  },
  "ai strategy for small business": {
    answer: "A practical small-business AI strategy is a 30-day sequence: inventory friction, rank opportunities, test one workflow, measure it, and create simple rules for safe use before expanding.",
    uses: ["Create a shared list of repetitive work and missed customer moments.", "Rank opportunities by value, feasibility, and consequence of error.", "Turn the first successful proof into a documented operating process."],
    controls: ["One accountable owner instead of scattered personal experiments.", "Rules for confidential information and approved tools.", "A monthly decision to expand, revise, or retire each workflow."],
    decision: "Choose a workflow-first strategy when the business needs results more than a long technology roadmap. Delay broad rollout until one use case produces evidence."
  },
  "ai roi calculator": {
    answer: "An AI ROI estimate should subtract software, implementation, review, errors, and maintenance from the value of time saved or revenue recovered. Gross time savings alone are not ROI.",
    uses: ["Estimate annual labor value from minutes saved, frequency, and loaded hourly cost.", "Model recovered leads or faster capacity separately from labor savings.", "Run a conservative, expected, and optimistic scenario before building."],
    controls: ["Assumptions labeled as assumptions rather than observed facts.", "Review time and exception handling included in the cost side.", "A post-launch comparison using the same baseline definitions."],
    decision: "Test when conservative value still supports the total cost of ownership. Skip or simplify when the result depends on perfect adoption, zero errors, or imaginary volume."
  },
  "ai consultant vs ai agency": {
    answer: "Choose an AI consultant for focused diagnosis, hands-on proofs, and direct senior attention; choose an agency when the work needs a larger multidisciplinary delivery team, formal capacity, or continuous production support.",
    uses: ["Use a consultant to identify and prove the first high-value workflow.", "Use an agency for a larger program spanning design, engineering, data, and change management.", "Use internal staff when the workflow is core and the organization can own it long term."],
    controls: ["Named people who will actually perform the work.", "Clear handoff, documentation, and maintenance responsibilities.", "A scope that prevents strategy language from replacing a working deliverable."],
    decision: "Buy the smallest capable team for the current risk. Do not pay agency overhead for a narrow proof, and do not under-resource a production system that touches critical operations."
  },
  "what should i automate in my business": {
    answer: "Automate the repeated handoff that is both expensive and predictable enough to measure—not the process that is merely annoying or impressive in a demo.",
    uses: ["Follow-up that repeatedly falls through after calls, forms, or proposals.", "Copying the same information between email, documents, and a CRM.", "Preparing recurring reports or drafts from known source material."],
    controls: ["Remove unnecessary steps before automating them.", "Keep judgment-heavy approvals with the responsible person.", "Document how staff handle missing data and unusual cases."],
    decision: "Start where frequency, time, and business consequence overlap. Leave rare, ambiguous, or high-risk work manual until the process is clearer."
  },
  "ai implementation checklist": {
    answer: "A sound AI implementation checklist covers the problem, baseline, data permission, model limits, human review, integration rules, testing, monitoring, ownership, and a rollback plan.",
    uses: ["Turn a promising prototype into a controlled production workflow.", "Review a vendor feature before connecting business data.", "Create a launch record that future staff can understand and maintain."],
    controls: ["Test cases that include normal, missing, adversarial, and edge-case inputs.", "Least-privilege credentials and documented data retention.", "An owner, alert path, and manual fallback for failures."],
    decision: "Launch only when the workflow can fail visibly and recover safely. Keep it in proof mode when errors disappear into customer or financial records."
  },
  "ai policy for small business": {
    answer: "A small-business AI policy should be short enough to use: define approved tools, prohibited data, required human review, ownership of outputs, disclosure expectations, and how incidents are reported.",
    uses: ["Set rules for employees using public chat tools with company information.", "Define review requirements for customer-facing and high-consequence material.", "Create a simple approval path for new AI vendors or integrations."],
    controls: ["No passwords, regulated records, or confidential client data in unapproved tools.", "Human verification of facts, calculations, rights, and sensitive decisions.", "Periodic review as products, contracts, and business risks change."],
    decision: "Adopt a simple policy before usage becomes invisible and inconsistent. Have qualified counsel review requirements specific to your contracts, workforce, and regulated data."
  },
  "ai data privacy small business": {
    answer: "Before giving customer data to an AI tool, know what is sent, why it is needed, where it is stored, who can access it, how long it remains, and how the business can delete or export it.",
    uses: ["Map data fields entering a customer-support or document workflow.", "Remove unnecessary identifiers before testing.", "Review vendor terms, retention controls, subprocessors, and admin settings."],
    controls: ["Collect and transmit only the minimum data needed for the task.", "Use business accounts and access controls rather than shared personal logins.", "Keep a manual process for deletion, correction, and incident response."],
    decision: "Use the tool only when its data practices fit the sensitivity and promises attached to the information. Ask qualified privacy or security professionals when obligations are unclear."
  },
  "ai automation for small business": {
    answer: "The most useful small-business AI automations handle messy language at a clear handoff: triaging inquiries, drafting follow-up, extracting document details, preparing meetings, and turning notes into assigned work.",
    uses: ["Classify incoming requests and prepare the next best response for review.", "Extract names, dates, decisions, and tasks from emails or documents.", "Create a first draft from approved templates and customer context."],
    controls: ["Rules that block sending when required information is missing.", "A review queue for low-confidence or high-value cases.", "Metrics that compare the automation with the former process."],
    decision: "Automate interpretation when language varies but the next action is controlled. Use ordinary rules when inputs and outcomes are exact."
  },
  "ai email management": {
    answer: "AI email management works best as an assistant that classifies, summarizes, drafts, and suggests next steps; it should not freely send, delete, or commit the business without clear rules.",
    uses: ["Separate urgent customer messages from newsletters and routine notifications.", "Draft replies using approved tone and information from the thread.", "Turn commitments and dates into tasks for review."],
    controls: ["Never auto-send financial, legal, personnel, or emotionally sensitive replies.", "Prevent confidential threads from entering unapproved systems.", "Keep archive and deletion actions recoverable and rule-based."],
    decision: "Use AI to reduce reading and drafting time while the owner keeps communication judgment. Avoid full autonomy when a mistaken message can damage trust or create a commitment."
  },
  "automated customer follow up": {
    answer: "Good automated customer follow-up uses real context, a useful next step, sensible timing, and a clear stop rule. It supports the relationship instead of imitating personal attention.",
    uses: ["Remind a prospect after a requested estimate or proposal.", "Send preparation details before an appointment and a recap afterward.", "Surface warm conversations that need a personal call."],
    controls: ["Stop messages when the person replies, opts out, books, or is disqualified.", "Keep frequency and wording appropriate to the relationship.", "Route complaints, confusion, and high-value opportunities to a person."],
    decision: "Automate predictable reminders and context assembly. Keep persuasion, negotiation, recovery, and sensitive conversations human."
  },
  "ai meeting notes": {
    answer: "AI meeting notes are valuable when they turn a recording or transcript into verified decisions, owners, deadlines, and follow-up—not when they create another long summary nobody reads.",
    uses: ["Produce a concise decision and action log after internal meetings.", "Draft a customer recap for the meeting owner to approve.", "Update tasks or CRM fields after required details are confirmed."],
    controls: ["Obtain appropriate consent for recording and transcription.", "Verify names, numbers, dates, and commitments against the source.", "Limit access and retention for sensitive transcripts."],
    decision: "Use note automation when meetings reliably produce downstream work. Skip it when a short manual decision log is faster and safer."
  },
  "ai proposal generator": {
    answer: "An AI proposal generator should assemble a tailored first draft from approved services, discovery notes, scope rules, and proof. Pricing, commitments, exclusions, and final terms still need accountable review.",
    uses: ["Turn discovery notes into a structured problem and proposed approach.", "Reuse approved service language without copying irrelevant sections.", "Check that every requested outcome is addressed before review."],
    controls: ["Pricing and scope taken from authoritative business records.", "No invented case studies, capabilities, timelines, or guarantees.", "Final approval by the person responsible for delivery and terms."],
    decision: "Use AI when proposal structure is repeated but customer context varies. Use fixed templates when the offer and terms are nearly identical."
  },
  "ai sop generator": {
    answer: "AI can turn interviews, screen recordings, and rough notes into a useful SOP draft, but the person who performs the work must test every step and own exceptions.",
    uses: ["Convert a recorded walkthrough into ordered instructions.", "Standardize terminology, prerequisites, and handoff points.", "Generate a checklist and training questions from the approved process."],
    controls: ["Test the SOP with someone who did not help write it.", "Separate required controls from optional tips.", "Version the document and name an owner for updates."],
    decision: "Use AI to organize captured knowledge, not to invent how a process works. If experts disagree on the steps, resolve the process before publishing the SOP."
  },
  "ai document automation": {
    answer: "AI document automation is useful when documents vary in wording but the business needs consistent extraction, classification, drafting, or routing with a reviewable source trail.",
    uses: ["Extract known fields from forms, statements, or reports.", "Compare a document with a checklist and flag missing material.", "Draft a response or internal summary linked to source passages."],
    controls: ["Validate required fields with deterministic rules.", "Retain source references for material decisions.", "Escalate low-confidence, handwritten, damaged, or unusual documents."],
    decision: "Use AI for variable documents with reviewable outputs. Use fixed parsers or forms when the structure can be made exact."
  },
  "ai crm automation": {
    answer: "AI CRM automation should capture and suggest updates from real interactions while deterministic rules protect required fields, ownership, stage changes, and communication permissions.",
    uses: ["Draft call notes and proposed next steps from a transcript.", "Suggest contact, company, pain, and timing fields from correspondence.", "Find records that are stale, incomplete, or missing an owner."],
    controls: ["No silent stage changes that trigger customer communication.", "Deduplication and field validation before records are written.", "A visible source and timestamp for generated updates."],
    decision: "Use AI to reduce clerical entry and surface missing context. Keep pipeline truth and revenue reporting under controlled rules."
  },
  "ai lead qualification": {
    answer: "AI lead qualification is most useful for summarizing evidence and applying a transparent rubric. It should not hide why a person or company was prioritized, rejected, or routed.",
    uses: ["Extract firmographic, need, timing, and fit signals from approved sources.", "Apply a documented score with separate fit and intent components.", "Draft a research brief for a seller before outreach."],
    controls: ["Exclude sensitive traits and unreliable proxies from scoring.", "Show the evidence behind each material score.", "Allow human correction and monitor who is systematically missed."],
    decision: "Use qualification automation to order a review queue, not to replace accountability. Keep the model simple enough that a seller can explain the result."
  },
  "ai content repurposing": {
    answer: "AI content repurposing works when one original idea is genuinely useful and each new format is rewritten for a different reader or channel—not when the same generic copy is multiplied everywhere.",
    uses: ["Turn a useful customer question into an article, email, and short social explanation.", "Extract examples, objections, and quotes from an approved long-form source.", "Maintain a source-of-truth link so revisions stay consistent."],
    controls: ["A human point of view and real examples in the original material.", "Channel-specific editing instead of automatic cross-posting.", "Fact, attribution, and rights review before publication."],
    decision: "Repurpose when the source deserves more reach. Do not scale thin material simply to satisfy a posting calendar."
  },
  "chatgpt prompts for real estate agents": {
    answer: "The best ChatGPT prompts for real estate agents provide role, audience, verified property or market facts, desired output, constraints, and a review checklist. A clever one-line prompt is rarely enough.",
    uses: ["Prepare questions and a recap for a buyer or seller consultation.", "Draft listing, email, and social copy from verified source details.", "Organize follow-up tasks without exposing confidential client information."],
    controls: ["Verify every property, market, school, financial, and legal statement.", "Review copy for fair-housing risk and prohibited targeting.", "Remove private client data unless an approved business tool permits it."],
    decision: "Use prompts for drafts and preparation where the agent owns the facts. Never let generated language substitute for brokerage policy, licensed judgment, or required disclosures."
  },
  "real estate follow up automation": {
    answer: "Real estate follow-up automation should coordinate timing, reminders, and context while the agent owns advice, negotiation, and the personal moments that earn trust.",
    uses: ["Prompt the next action after an inquiry, showing, consultation, or open house.", "Draft a personalized recap from verified notes.", "Alert the agent when behavior or a reply signals a human conversation."],
    controls: ["Stop sequences immediately on reply, opt-out, status change, or sensitive context.", "Separate buyers, sellers, past clients, and cold prospects by relationship.", "Comply with brokerage policy and applicable communication rules."],
    decision: "Automate consistency and preparation, not the relationship. If a message requires judgment about money, representation, or motivation, route it to the agent."
  },
  "open house follow up": {
    answer: "Open-house follow-up should begin with what the visitor asked about, provide one useful next step, and make replying easy. A generic drip sequence wastes the context collected at the door.",
    uses: ["Send requested property information after consent is captured.", "Route financing, timing, neighborhood, and listing questions to the right follow-up.", "Create an agent call list from explicit interest and unanswered questions."],
    controls: ["Accurate consent and contact preferences.", "No assumptions about protected characteristics or household needs.", "A stop rule for replies, opt-outs, and representation conflicts."],
    decision: "Automate the recap and task creation while the details are fresh. Keep qualification and advisory conversations with the agent."
  },
  "ai buyer consultation": {
    answer: "AI can improve a buyer consultation by organizing known goals, preparing questions, summarizing verified market material, and creating a follow-up checklist. It should not make affordability, legal, or representation decisions.",
    uses: ["Prepare an agenda from the buyer's stated priorities.", "Identify missing questions about timing, process, and decision criteria.", "Draft a recap and next-step list for agent review."],
    controls: ["Keep financial and identity data in approved systems.", "Verify market and property facts against authoritative sources.", "Follow brokerage forms, agency rules, and fair-housing requirements."],
    decision: "Use AI to make the agent more prepared and consistent. Keep advice, agency explanations, and material decisions human."
  },
  "real estate market update template": {
    answer: "A trustworthy real estate market update names the geography and period, cites its data source, separates observed numbers from interpretation, and explains what the change may mean without predicting certainty.",
    uses: ["Turn approved MLS or public data into a repeatable monthly outline.", "Compare current and prior periods using the same definitions.", "Create separate buyer, seller, and homeowner explanations from one verified dataset."],
    controls: ["Source, date range, property type, and geography shown clearly.", "No invented numbers or unsupported market forecasts.", "Review by the agent responsible for the published interpretation."],
    decision: "Automate calculations and first drafts when the source data is clean. Pause publication when definitions or coverage changed and the comparison is misleading."
  },
  "ai for property management": {
    answer: "Property managers can use AI to classify maintenance messages, prepare responses, summarize documents, organize inspections, and surface follow-up—while people retain housing decisions, emergencies, legal notices, and resident care.",
    uses: ["Extract issue, property, urgency clues, and access details from maintenance requests.", "Draft routine updates from verified work-order status.", "Summarize recurring issues across properties for operational review."],
    controls: ["Emergency and habitability language routed immediately under fixed rules.", "No automated tenant selection, accommodation, enforcement, or legal conclusions.", "Resident data restricted to approved property-management systems."],
    decision: "Use AI to reduce communication and triage workload where a person can review. Keep rights, remedies, safety, and housing decisions under qualified human control."
  },
  "automated tenant communication": {
    answer: "Automated tenant communication is appropriate for confirmed reminders and status updates; it is risky for emergencies, complaints, accommodations, disputes, legal notices, or anything that requires understanding a resident's circumstances.",
    uses: ["Send appointment confirmations and verified maintenance status.", "Acknowledge receipt and route the message to the responsible team.", "Provide consistent office, portal, and emergency contact instructions."],
    controls: ["Emergency keywords and after-hours paths implemented as fixed escalation rules.", "A person reviews complaints, accommodation requests, disputes, and notices.", "Message logs, language access, opt-outs, and delivery failures are monitored."],
    decision: "Automate known facts and routing. Do not automate judgment about resident rights, fault, urgency, or enforcement."
  },
  "ai listing presentation": {
    answer: "AI can help assemble a stronger listing presentation from verified property facts, seller priorities, marketing plans, and market evidence. The agent must own pricing analysis, promises, and the actual strategy.",
    uses: ["Organize discovery notes into a seller-focused narrative.", "Draft property-specific marketing and communication sections.", "Check whether the presentation answers likely seller questions."],
    controls: ["All property and market data verified against current sources.", "No invented buyer reach, performance, testimonials, or guarantees.", "Pricing, agency, disclosure, and service commitments reviewed by the agent."],
    decision: "Use AI to improve preparation and structure. Do not let a polished deck outrun the evidence or services the agent can deliver."
  },
  "real estate transaction automation": {
    answer: "The safest real estate transaction automations move confirmed information, create reminders, assemble checklists, and report missing items. They do not interpret contracts or decide whether a legal obligation has been satisfied.",
    uses: ["Create task reminders from confirmed milestones and assigned owners.", "Check a file against a brokerage-approved completeness list.", "Prepare status recaps from the transaction system of record."],
    controls: ["Dates and obligations entered or verified by authorized people.", "No generated legal interpretation or silent document alteration.", "An exception queue for missing, conflicting, or late information."],
    decision: "Automate clerical coordination around a controlled transaction record. Keep contract interpretation, negotiation, compliance, and material approvals human."
  },
  "ai fair housing real estate": {
    answer: "AI does not remove fair-housing responsibility. Real estate professionals should review generated targeting, descriptions, recommendations, and screening-related outputs for prohibited preferences, exclusions, proxies, and steering risk.",
    uses: ["Review marketing copy for unnecessary references to people rather than property features.", "Audit audience settings and generated segments before campaigns run.", "Create a consistent human checklist for AI-assisted client communication."],
    controls: ["Brokerage-approved policy and qualified fair-housing guidance.", "No protected-trait data or proxies used to recommend people, places, or opportunities.", "Documented human review of marketing and material client-facing output."],
    decision: "Use AI only inside a fair-housing-aware review process. Do not rely on a model to determine compliance or to make housing recommendations about people."
  },
  "ai for contractors": {
    answer: "Contractors get the most value from AI at the field-to-office handoff: turning calls, photos, notes, and documents into organized drafts, follow-up, and job records without automating safety, pricing, or trade judgment.",
    uses: ["Turn site notes into a customer recap and internal task list.", "Extract scope clues and missing questions before an estimate is prepared.", "Draft follow-up from confirmed job, schedule, and proposal information."],
    controls: ["Final scope, measurements, pricing, and code decisions by qualified staff.", "No automatic promise of availability, completion date, or coverage.", "Photos, access details, and customer data stored in approved systems."],
    decision: "Use AI to reduce clerical lag between field and office. Keep physical inspection, safety, estimating, and contractual commitments with accountable people."
  },
  "chatgpt for contractors": {
    answer: "ChatGPT is useful for contractors when it drafts and organizes from verified job information. It is unreliable as a source of site conditions, code requirements, material quantities, pricing, or safety decisions.",
    uses: ["Draft a clear customer update from approved job notes.", "Turn a voice memo into questions, tasks, and a proposed recap.", "Create training and SOP drafts from an experienced worker's walkthrough."],
    controls: ["No generated measurements, quantities, specifications, or compliance claims without verification.", "Remove sensitive customer and access information from unapproved accounts.", "Treat every output as a draft tied to its source material."],
    decision: "Use ChatGPT for language and organization. Use trade expertise, authoritative references, and controlled software for the work that determines safety, price, or performance."
  },
  "ai for construction companies": {
    answer: "Construction companies can use AI to organize daily reports, submittal questions, meeting actions, document search, and stakeholder updates—provided the system preserves sources and does not replace professional or contractual review.",
    uses: ["Structure daily logs from field notes and approved photos.", "Summarize meetings into owners, dates, and unresolved decisions.", "Find relevant document passages for a project professional to review."],
    controls: ["Source documents and revision status visible with every material output.", "No automated interpretation of contracts, plans, safety, or code.", "Role-based access across owners, contractors, subs, and projects."],
    decision: "Use AI where teams spend time finding and reformatting information. Keep design, safety, schedule commitment, cost, and contract decisions under the responsible professionals."
  },
  "ai for hvac companies": {
    answer: "HVAC companies can use AI to improve call triage, appointment preparation, maintenance reminders, estimate follow-up, and technician-to-office notes—not to diagnose equipment or prescribe work without qualified inspection.",
    uses: ["Summarize customer-reported symptoms and ask for missing appointment details.", "Turn technician notes into a customer-friendly draft recap.", "Prioritize unsold estimate follow-up using confirmed status and timing."],
    controls: ["Emergency and safety language routed by fixed procedures.", "Diagnosis, load, equipment, code, and price decisions by qualified staff.", "No promise of availability or outcome before dispatch confirms it."],
    decision: "Automate intake and communication around verified work. Keep technical diagnosis, safety, and proposal approval with trained people."
  },
  "ai for plumbing companies": {
    answer: "Plumbing companies can use AI to structure intake, prepare dispatch notes, draft updates, and maintain follow-up while fixed rules and qualified people handle emergencies, diagnosis, scope, and price.",
    uses: ["Extract location, symptoms, timing, access, and prior work from an inquiry.", "Draft a post-visit recap from approved technician notes.", "Create reminders for estimates, maintenance, and incomplete customer decisions."],
    controls: ["Gas, flooding, contamination, and emergency language escalated immediately.", "No diagnosis or price generated without the company's approved process.", "Sensitive access and property information restricted and logged."],
    decision: "Use AI to make the office faster and better prepared. Do not use it to replace inspection or trade judgment."
  },
  "ai for electricians": {
    answer: "Electrical contractors can use AI for inquiry organization, documentation drafts, job recaps, and follow-up. Electrical diagnosis, load, code, safety, scope, and pricing require qualified human review.",
    uses: ["Summarize customer descriptions and prepare clarifying questions.", "Turn field notes into a structured job record and customer draft.", "Surface estimates and service recommendations awaiting follow-up."],
    controls: ["Safety and outage conditions routed under established emergency procedures.", "No generated code, load, equipment, or repair conclusion treated as authoritative.", "Final customer commitments tied to approved scope and scheduling records."],
    decision: "Automate language and handoffs, not electrical judgment. The system should help qualified people act faster, not make technical decisions for them."
  },
  "ai for roofing companies": {
    answer: "Roofing companies can use AI to organize inspection material, draft customer explanations, prepare estimate follow-up, and track documentation—while inspectors own condition, measurement, scope, coverage, and safety.",
    uses: ["Convert inspection notes into an organized draft with referenced photos.", "List missing information before an estimate is finalized.", "Draft status updates from confirmed material, schedule, and project records."],
    controls: ["No condition or damage conclusion from images alone.", "Measurements, scope, price, warranty, and insurance language reviewed by authorized staff.", "Weather and safety decisions remain under field procedures."],
    decision: "Use AI to make evidence easier to organize and explain. Keep inspection and commercial commitments human."
  },
  "ai for restoration companies": {
    answer: "Restoration companies can use AI to structure intake, summarize daily documentation, prepare stakeholder updates, and surface missing records. Emergency response, health, safety, scope, coverage, and technical decisions remain human.",
    uses: ["Extract loss details and missing intake questions for dispatch.", "Organize field notes and approved photos into a draft daily update.", "Compare a job file with a required-document checklist."],
    controls: ["Emergency and hazardous-condition language escalated immediately.", "No generated conclusion about safety, cause, coverage, or required remediation.", "Every material statement traceable to a person, reading, photo, or document."],
    decision: "Use AI to improve documentation speed and completeness. Do not let it make the technical or coverage decisions that determine the work."
  },
  "ai for landscaping business": {
    answer: "Landscaping businesses can use AI to turn site notes into quote drafts, schedules, customer updates, and follow-up while experienced staff retain horticultural, site, safety, scope, and pricing decisions.",
    uses: ["Organize walkthrough notes and photos into a scope-question checklist.", "Draft seasonal or project updates from confirmed work records.", "Follow up on estimates and maintenance recommendations at the right time."],
    controls: ["Plant, drainage, irrigation, chemical, and site recommendations verified by qualified staff.", "Measurements, quantities, price, and schedule drawn from approved records.", "No customer promise before field and operations teams confirm it."],
    decision: "Automate the field-to-office paperwork and customer communication. Keep site judgment and final proposals with the people responsible for the work."
  },
  "contractor follow up automation": {
    answer: "Contractor follow-up automation should make sure requested estimates and next steps do not disappear. It should stop on reply and give the office enough context to continue personally.",
    uses: ["Remind customers after a delivered estimate without restarting the sales pitch.", "Surface jobs waiting on selections, access, approval, or scheduling.", "Draft a useful recap from confirmed notes after a site visit."],
    controls: ["Stop on reply, opt-out, booking, loss, or job-status change.", "No unsupported urgency, discount, availability, or completion promise.", "Route objections, complaints, and scope questions to the responsible person."],
    decision: "Automate timing and context assembly. Keep negotiation, scope changes, and trust-sensitive conversations human."
  },
  "ai agents for small business": {
    answer: "An AI agent is worthwhile for a small business only when it has a narrow job, limited tools, explicit permissions, visible actions, human escalation, and a measurable advantage over a simpler automation.",
    uses: ["Gather information from approved systems and prepare a reviewable work packet.", "Complete a bounded multi-step routine with checkpoints.", "Monitor a queue and escalate exceptions to the right owner."],
    controls: ["Least-privilege access and approval before consequential actions.", "Logs showing inputs, tool calls, changes, and failures.", "Rate limits, stop conditions, and a manual fallback."],
    decision: "Use an agent when variable reasoning must coordinate several controlled steps. Use ordinary automation when the path is known and exact."
  },
  "what is an ai workflow": {
    answer: "An AI workflow is a repeatable process in which AI handles a defined interpretation or drafting step while data sources, business rules, human approvals, and downstream actions remain explicit.",
    uses: ["Classify a variable request before a fixed routing rule runs.", "Draft an output from approved context for a person to review.", "Extract structured details from messy language before validation."],
    controls: ["Clear input, output, owner, and success definition.", "Deterministic validation around required fields and sensitive actions.", "Monitoring for quality, cost, latency, and exceptions."],
    decision: "Call it a workflow only when the whole path is owned and measured. A prompt used occasionally by one person is a tool interaction, not an operating system."
  },
  "ai agent vs chatbot": {
    answer: "A chatbot responds inside a conversation; an AI agent may plan steps and use tools to act across systems. The extra autonomy can be useful, but it creates more permission, monitoring, and failure risk.",
    uses: ["Use a chatbot for questions, guided intake, and draft assistance.", "Use an agent for a bounded task that requires several tool calls.", "Use ordinary automation for exact triggers and known actions."],
    controls: ["Tool permissions matched to the narrow job.", "Approval before messages, record changes, purchases, or deletions.", "Complete logs and a reliable way to stop or retry work."],
    decision: "Choose the least autonomous design that solves the problem. Do not use an agent merely because a chatbot feels less sophisticated."
  },
  "ai workflow examples": {
    answer: "Good AI workflow examples share the same pattern: messy input, a bounded interpretation task, a reviewable output, controlled execution, and a metric tied to real work.",
    uses: ["Inbox triage that prepares but does not silently send replies.", "Meeting notes that become verified tasks and follow-up.", "Document intake that extracts fields and flags missing information."],
    controls: ["One owner and one defined outcome per workflow.", "Human review proportional to error consequence.", "Baseline time, quality, and business outcome measured before launch."],
    decision: "Borrow the pattern, not the demo. An example is relevant only when its inputs, risks, frequency, and downstream systems resemble your process."
  },
  "business process automation ai": {
    answer: "AI business-process automation combines probabilistic interpretation with deterministic systems. AI handles language or variation; rules validate, route, record, and control the actions that must be reliable.",
    uses: ["Interpret inbound language before an exact routing rule.", "Draft documents or responses from governed source material.", "Detect missing context and send exceptions to a review queue."],
    controls: ["Process map and baseline completed before implementation.", "System-of-record writes protected by validation and permissions.", "Ongoing owner for monitoring, vendor changes, and failure response."],
    decision: "Start where variation makes ordinary rules brittle but outputs can be checked. Redesign the process first when the handoffs themselves are unclear."
  },
  "best ai tools for small business": {
    answer: "The best AI tool for a small business is the one that improves a valuable workflow, fits existing systems, protects the data involved, and can be operated without creating a second job.",
    uses: ["Choose a general assistant for drafting, analysis, and controlled knowledge work.", "Choose an embedded feature when it removes a real handoff inside an existing system.", "Choose an automation platform when several tools must exchange validated data."],
    controls: ["Business accounts, admin controls, retention settings, and export options reviewed.", "Total cost includes setup, seats, review, integration, and maintenance.", "A replacement and data-exit plan exists before the tool becomes critical."],
    decision: "Select tools after choosing the workflow. Avoid building a stack from feature lists and then searching for a reason to use it."
  },
  "ai customer service small business": {
    answer: "Small businesses should use AI in customer service to prepare, retrieve, summarize, and route work while people retain complaints, exceptions, commitments, and emotionally sensitive conversations.",
    uses: ["Draft answers from an approved knowledge source.", "Summarize a conversation and suggest the next action.", "Classify requests and surface urgent or unusual cases."],
    controls: ["No invented policy, price, availability, or resolution.", "Easy escalation to a person with the conversation context intact.", "Quality review by intent, customer outcome, and correction rate—not speed alone."],
    decision: "Automate repetitive, well-supported questions with visible limits. Keep recovery and judgment human, especially when the business may be at fault."
  },
  "ai lead generation small business": {
    answer: "Responsible AI lead generation helps define fit, research public business context, prioritize review, and draft relevant outreach. It does not justify scraping indiscriminately or sending high-volume generic messages.",
    uses: ["Build a narrow ideal-customer profile from real customer fit.", "Summarize public company signals for a seller to verify.", "Draft a concise message tied to a plausible business problem."],
    controls: ["Verified contact data, suppression, opt-out, and channel rules.", "No sensitive personal data or fabricated personalization.", "Volume limited enough to review replies and protect sender reputation."],
    decision: "Use AI to improve research quality and relevance. If it mainly increases send volume, it is likely making the outbound system worse."
  },
  "ai social media tools for small business": {
    answer: "AI social-media tools are useful for organizing ideas, adapting approved source material, creating drafts, and maintaining a review queue. They cannot supply the business's point of view or customer proof.",
    uses: ["Turn one strong field lesson into channel-specific drafts.", "Create a reusable calendar from real questions and examples.", "Prepare visual and copy variants for human selection."],
    controls: ["Original source, facts, rights, and brand voice reviewed.", "No invented customer stories, trends, or expertise.", "Performance judged by qualified attention and business outcomes, not posting volume."],
    decision: "Use tools to reduce production friction around worthwhile ideas. Do not automate publication when the source material is thin or unverified."
  },
  "ai bookkeeping for small business": {
    answer: "AI can help small-business bookkeeping by extracting, categorizing, matching, explaining, and flagging records for review. It should not make final accounting, tax, payment, or fraud decisions.",
    uses: ["Extract invoice and receipt details into a review queue.", "Suggest categories using prior approved treatment and visible evidence.", "Flag duplicates, missing documents, or unusual transactions for investigation."],
    controls: ["Accounting system remains the authoritative record.", "Payments, reconciliations, classifications, and filings approved by responsible people.", "Qualified accounting and tax guidance used for material treatment decisions."],
    decision: "Use AI to prepare and surface bookkeeping work, not to remove accountability. If errors could move money or change reporting, require explicit approval."
  }
};

const createProfile = (keyword: string, item: (typeof seoContentPlan)[number], source: Specifics): GuideProfile => ({
  answer: source.answer,
  context: `For ${item.audience}, the useful question is not whether AI can touch this work. It is whether a controlled system can improve the outcome without adding more risk, review, or maintenance than it removes.`,
  useCases: source.uses,
  steps: [
    { title: "Name the boundary", detail: `Choose one repeated process connected to ${keyword} and define exactly where it starts and stops.` },
    { title: "Capture the baseline", detail: "Record current volume, time, delay, correction rate, and the customer or revenue consequence." },
    { title: "Prepare governed context", detail: "Use approved examples, templates, policies, and system records. Remove data the workflow does not need." },
    { title: "Separate draft from action", detail: "Let AI interpret or prepare the work; use validation and human approval before consequential actions occur." },
    { title: "Review exceptions", detail: "Log missing information, corrections, escalations, and failures so the workflow improves instead of hiding its weak spots." },
  ],
  controls: source.controls,
  measures: [
    "Minutes of paid work per completed item, including review and correction.",
    "Accuracy or first-pass acceptance using a written definition of correct.",
    "The business outcome that justified the test: response time, completed follow-up, capacity, customer experience, or recovered revenue.",
  ],
  decision: source.decision,
  ctaCopy: `Bring one real example and the current process. We will identify the smallest useful proof, estimate its value, and decide whether it deserves to be built.`,
});

export const seoGuideProfiles: Record<string, GuideProfile> = Object.fromEntries(
  seoContentPlan.map((item) => {
    const source = specifics[item.keyword];
    if (!source) throw new Error(`Missing guide specifics for ${item.keyword}`);
    return [item.keyword, createProfile(item.keyword, item, source)];
  }),
);
