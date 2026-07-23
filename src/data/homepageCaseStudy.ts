// CLIENT SWAP-IN POINT:
// Add the approved client name and quote here when they are ready to be public.
// Until then, the homepage renders the anonymous description and capability list.
export const homepageCaseStudy = {
  eyebrow: "Recent work",
  heading:
    "I spent two hours watching a local business work — then built around the real bottlenecks",
  clientName: "",
  clientDescription: "Anonymized local event-services company",
  quote: "",
  paragraphs: [
    "I started by spending two hours inside the business, watching how work moved between inboxes, calendars, documents, marketing, and team members. Only then did I recommend Claude: its strengths in document-heavy work, reusable Skills, and connected workflows fit the problems I had actually seen.",
    "The first win was small and concrete. I made a step-by-step Claude Design tutorial around a marketing project that normally took days; they used it to finish the work in minutes.",
  ],
  emailSkill: {
    description:
      "Email was the bigger pain point, so I built a custom inbox-triage Skill around the way this business decides what matters. It reviews new messages, surfaces the three most important actions, separates replies needed today from conversations they are waiting on, sends low-priority items to Read later or Archive candidate, and flags anything ambiguous instead of guessing. It starts read-only and keeps sending, deleting, and bulk changes behind human approval.",
    href: "/blog/posts/create-first-claude-skill-organize-inbox/",
    linkLabel: "See how the inbox-triage Skill works",
  },
  roadmap:
    "Now we’re building the next layer: a front-desk agent for repetitive admin work, plus one streamlined dashboard that connects the tools used across dozens of team members. The goal is not to replace their stack. It is to give the team one clear place to see what needs attention and move work forward.",
  inUse: [
    "Two-hour in-person workflow review",
    "Claude Design tutorial for live marketing work",
    "Custom inbox-triage Skill",
  ],
  buildingNext: [
    "Front-desk agent for repetitive admin",
    "Shared dashboard across team tools",
  ],
};
