export type RealtorProspect = {
  id: string;
  organization: string;
  name: string;
  role: string;
  email: string;
  linkedinUrl: string;
  websiteUrl: string;
  sourceUrl: string;
  status: "Research" | "Ready to DM" | "Invite sent" | "Connected" | "DM sent" | "Follow-up due" | "Replied" | "Discovery booked" | "Free build" | "Nurture" | "Not a fit";
  fitScore: number;
  segment: "Boutique team" | "Growing brokerage" | "Established team";
  lastContact: string;
  nextFollowUp: string;
  personalization: string;
  automationIdea: string;
  customMessage: string;
  notes: string;
};

export const realtorProspects: RealtorProspect[] = [
  {
    id: "renee-hillman",
    organization: "Hillman Real Estate Group",
    name: "Renée Hillman",
    role: "Team Leader · Strategic Listing Specialist",
    email: "",
    linkedinUrl: "https://www.linkedin.com/in/reneesells",
    websiteUrl: "https://hregsells.com/about/",
    sourceUrl: "https://hregsells.com/about/",
    status: "Ready to DM",
    fitScore: 95,
    segment: "Boutique team",
    lastContact: "",
    nextFollowUp: "",
    personalization: "Small, high-output Raleigh team with an office manager, marketing director, buyer specialists, and 200+ five-star reviews.",
    automationIdea: "Turn a signed listing intake into a verified task brief, marketing checklist, and first-draft client timeline.",
    customMessage: `Hi Renée, thanks for connecting! I saw that Hillman Real Estate Group has dedicated office, marketing, and buyer-side roles while still operating as a boutique team. I imagine that creates a lot of handoffs behind every listing.

Quick, genuine cold pitch: I build AI automations that support millions in GMV at startups, and I’m learning which day-to-day problems Raleigh business owners actually want solved.

What’s one repetitive task your team wishes were already handled—listing intake, client updates, lead follow-up, or something else?

If one comes to mind, I’d be happy to build a small version for free. No catch—I’m looking for a real problem and honest feedback.`,
    notes: "Best first target: enough repeated work to matter, but a team leader can still approve a small experiment quickly.",
  },
  {
    id: "courtney-whalen",
    organization: "Whalen Group · Compass",
    name: "Courtney Whalen",
    role: "Principal Broker · Team Lead",
    email: "",
    linkedinUrl: "https://www.linkedin.com/in/courtney-whalen-536aa388",
    websiteUrl: "https://whalenandco.com/about",
    sourceUrl: "https://whalenandco.com/about",
    status: "Ready to DM",
    fitScore: 93,
    segment: "Boutique team",
    lastContact: "",
    nextFollowUp: "",
    personalization: "Inside-the-beltline boutique team; Courtney publicly highlighted a 2025 WRAL Voters’ Choice win and Top 100 recognition.",
    automationIdea: "Convert listing facts and approved photography notes into a channel-ready launch packet without re-copying details.",
    customMessage: `Hi Courtney, thanks for connecting—and congratulations on the WRAL Voters’ Choice win and Top 100 recognition. Building that kind of reputation with a boutique team usually means there’s a lot of careful work happening behind the scenes.

Quick, genuine cold pitch: I build AI automations that support millions in GMV at startups, and I’m learning which repetitive work Raleigh business owners most want off their plates.

Is there one part of listing prep, client follow-up, or team coordination you wish were already handled?

If so, I’d be happy to build a small version for free. No catch—I’m looking for a useful problem and honest feedback.`,
    notes: "Strong brand and visible activity create natural personalization hooks. Ask about listing-launch coordination, not generic content generation.",
  },
  {
    id: "annmarie-janni-williams",
    organization: "Element Realty Group · Howard Hanna Allen Tate",
    name: "AnnMarie Janni Williams",
    role: "Founder · Team Leader",
    email: "annmarie@elementrealtygroup.net",
    linkedinUrl: "https://www.linkedin.com/in/annmariejanni",
    websiteUrl: "https://elementrealtygroup.net/the-element-team/annmarie-janni/",
    sourceUrl: "https://elementrealtygroup.net/the-element-team/annmarie-janni/",
    status: "Ready to DM",
    fitScore: 91,
    segment: "Boutique team",
    lastContact: "",
    nextFollowUp: "",
    personalization: "Founder who still leads the team directly; her public bio emphasizes detailed client service and managing a high-performing team.",
    automationIdea: "Summarize new buyer or seller intake into a missing-information list, owner brief, and next-action checklist.",
    customMessage: `Hi AnnMarie, thanks for connecting! I noticed you still lead Element Realty Group directly while emphasizing detailed, high-touch client service. I imagine keeping that standard consistent creates plenty of repetitive coordination for you and the team.

Quick, genuine cold pitch: I build AI automations that support millions in GMV at startups, and I’m learning which day-to-day problems Raleigh-area business owners actually want solved.

What’s one recurring task you wish were already handled—new-client intake, follow-up, transaction updates, or something else?

If one comes to mind, I’d be happy to build a small version for free. No catch—just looking for honest feedback.`,
    notes: "A practical operations question should resonate better than an AI-forward pitch.",
  },
  {
    id: "jennifer-patterson",
    organization: "J Patterson Realty",
    name: "Jennifer Patterson",
    role: "Founder · Owner",
    email: "jennifer@jpattersonrealty.com",
    linkedinUrl: "https://www.linkedin.com/in/jennifer-patterson",
    websiteUrl: "https://jpattersonrealty.com/",
    sourceUrl: "https://www.linkedin.com/in/jennifer-patterson",
    status: "Ready to DM",
    fitScore: 89,
    segment: "Boutique team",
    lastContact: "",
    nextFollowUp: "",
    personalization: "Founder-led boutique serving Raleigh, Durham, Chapel Hill, and Cary with a deliberately high-touch client model.",
    automationIdea: "Create a post-showing follow-up system that organizes feedback, flags unanswered questions, and drafts the next client update.",
    customMessage: `Hi Jennifer, thanks for connecting! I like that J Patterson Realty has stayed intentionally boutique while serving clients across Raleigh, Durham, Chapel Hill, and Cary. That kind of high-touch model can create a surprising amount of follow-up and coordination.

Quick, genuine cold pitch: I build AI automations that support millions in GMV at startups, and I’m learning which repetitive problems local business owners actually want solved.

What’s one task you wish were already handled each week—showing feedback, client updates, follow-up, or something else?

If one comes to mind, I’d be happy to build a small version for free. No catch—I’m looking for a real workflow and honest feedback.`,
    notes: "Frame automation as protecting the personal service model, not replacing it.",
  },
  {
    id: "rebekah-lindsey",
    organization: "Carolina Collective Realty · Real Broker",
    name: "Rebekah Lindsey",
    role: "Realtor · Team Connector",
    email: "",
    linkedinUrl: "https://www.linkedin.com/in/heybekaruth",
    websiteUrl: "https://carolinacollectiverealty.com/",
    sourceUrl: "https://www.linkedin.com/company/carolina-collective-realty",
    status: "Invite sent",
    fitScore: 84,
    segment: "Growing brokerage",
    lastContact: "",
    nextFollowUp: "",
    personalization: "Connected across a recently launched Raleigh brokerage with 11–50 employees and an active listing-marketing cadence.",
    automationIdea: "Turn property updates into a reviewed multi-channel content queue and notify the right listing partner before publishing.",
    customMessage: `Hi Rebekah, thanks for connecting! I’ve noticed Carolina Collective building a very active, team-oriented presence across the Triangle. With that many listings and people involved, I imagine there are still a few repetitive handoffs that take more time than they should.

Quick, genuine cold pitch: I build AI automations that support millions in GMV at startups, and I’m learning which day-to-day problems Raleigh business owners actually want solved.

What’s one recurring task your team wishes would just disappear—property updates, content prep, lead routing, or something else?

If you have one, I’d be happy to build a small version for free in exchange for honest feedback.`,
    notes: "Confirm decision authority or ask for an introduction to the person who owns team operations.",
  },
  {
    id: "ryan-fitzgerald",
    organization: "Raleigh Realty",
    name: "Ryan Fitzgerald",
    role: "Founder · Owner",
    email: "",
    linkedinUrl: "https://www.linkedin.com/in/ryanfitzgerald5",
    websiteUrl: "https://raleighrealty.com/agents/ryan-fitzgerald",
    sourceUrl: "https://raleighrealty.com/agents/ryan-fitzgerald",
    status: "Research",
    fitScore: 80,
    segment: "Growing brokerage",
    lastContact: "",
    nextFollowUp: "",
    personalization: "Founder of a locally owned, fast-growing brokerage with a sophisticated website, CRM, automated follow-up, and content engine.",
    automationIdea: "Audit one lead handoff or content-production bottleneck that remains manual despite an already mature tech stack.",
    customMessage: `Hi Ryan, thanks for connecting! Raleigh Realty already seems unusually strong on technology—between the website, CRM, automated follow-up, and content engine. That made me curious about what still stays stubbornly manual between those systems.

Quick, genuine cold pitch: I build AI automations that support millions in GMV at startups, and I’m learning which operational problems Raleigh business owners still consider worth solving.

Is there one repetitive handoff or exception your team wishes were already handled?

If so, I’d be happy to build a small version for free. No catch—I’m looking for a real edge case and candid feedback on whether the result is useful.`,
    notes: "Good learning partner, but not the first free build: existing systems increase integration and approval complexity.",
  },
  {
    id: "marti-hampton",
    organization: "Marti Hampton Real Estate · eXp Realty",
    name: "Marti Hampton",
    role: "Team Founder",
    email: "",
    linkedinUrl: "https://www.linkedin.com/in/martihampton",
    websiteUrl: "https://martihampton.com/",
    sourceUrl: "https://www.linkedin.com/company/marti-hampton-team",
    status: "Invite sent",
    fitScore: 77,
    segment: "Established team",
    lastContact: "",
    nextFollowUp: "",
    personalization: "High-volume 11–50 person team with 10,000+ closings, active content, experienced agents, and transaction coordinators.",
    automationIdea: "Triage incoming transaction and listing requests into owner, priority, missing data, and due-date queues.",
    customMessage: `Hi Marti, thanks for connecting! I saw that your team is hiring experienced agents and transaction coordinators. At your volume, I imagine the hard part isn’t finding more software—it’s keeping requests, missing details, and next actions from getting buried.

Quick, genuine cold pitch: I build AI automations that support millions in GMV at startups, and I’m learning which real operational problems Raleigh business owners want solved.

What’s one repetitive task your team wishes were already handled?

If there’s a narrow one, I’d be happy to build a small version for free. No catch—I’m looking for honest feedback on what actually helps a working team.`,
    notes: "The pain is likely real, but start only if a narrow workflow owner is identified; enterprise-like coordination can expand scope fast.",
  },
  {
    id: "linda-craft",
    organization: "Linda Craft Team, REALTORS",
    name: "Linda Craft",
    role: "Team Founder",
    email: "",
    linkedinUrl: "https://www.linkedin.com/in/raleighrealestate",
    websiteUrl: "https://www.lindacraft.com/",
    sourceUrl: "https://www.linkedin.com/in/raleighrealestate",
    status: "Research",
    fitScore: 74,
    segment: "Established team",
    lastContact: "",
    nextFollowUp: "",
    personalization: "Long-running Raleigh team with a visible relationship-led brand and substantial process maturity.",
    automationIdea: "Build a daily exception digest that surfaces only stalled leads, missing transaction details, and overdue client updates.",
    customMessage: `Hi Linda, thanks for connecting! Your team has built a long-running Raleigh reputation around relationships and thorough service. With that history and volume, I imagine the real burden is often the small exceptions—stalled follow-ups, missing details, and updates that need someone’s attention.

Quick, genuine cold pitch: I build AI automations that support millions in GMV at startups, and I’m learning which repetitive problems local business owners actually want solved.

What’s one recurring task your team wishes were already handled?

If one comes to mind, I’d be happy to build a small version for free. No catch—just looking for a useful problem and honest feedback.`,
    notes: "Credible target for discovery, but likely slower to approve a free experiment than a founder-led boutique team.",
  },
];
