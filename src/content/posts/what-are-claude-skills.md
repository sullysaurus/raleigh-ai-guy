---
pubDate: 2026-05-20T09:00:00-04:00
title: "What Are Claude Skills?"
description: "Claude Skills explained in plain English: what they contain, when they load, and how they differ from Projects, connectors, and general instructions."
image:
  url: "/src/images/posts/claude-skills-v2.png"
  alt: "A modular set of AI instruction blocks arranged as a reusable system"
tags:
  - claude
  - skills
  - ai-basics
---

A Claude Skill is a reusable set of instructions that teaches Claude how to perform a particular kind of work.

If you repeatedly explain the same process—how to format a client brief, review an invoice, triage an inbox, prepare a presentation, or write in your company's voice—you may have the beginnings of a Skill.

Anthropic defines Skills as folders containing instructions, scripts, and resources that Claude loads when they are relevant. A simple Skill may contain only one Markdown file. A more advanced Skill can include templates, examples, reference material, or executable scripts.

The important idea is not the folder. It is the repeatability.

## What problem do Skills solve?

Claude already knows how to write, analyze, summarize, and reason. It does not automatically know how **you** want a specific job done.

Without a Skill, you may repeat instructions like:

- Use our four-part customer brief format
- Never change the source figures
- Separate facts from recommendations
- Use plain English and short sentences
- Flag missing evidence instead of guessing
- End with an owner and due date for every action

A Skill packages those expectations once so Claude can apply them consistently when the matching task appears.

## What is inside a Claude Skill?

At minimum, a Skill is a folder with a `SKILL.md` file. That file begins with a small YAML metadata block and then contains the actual instructions.

```markdown
---
name: weekly-client-brief
description: Create a concise weekly client brief from project notes, including progress, risks, decisions, and next actions. Use for weekly account updates.
---

# Weekly client brief

Create the brief in this order:

1. Progress this week
2. Decisions needed
3. Risks or blockers
4. Next actions with owner and due date

Never invent a status. If the source material is unclear, label the item "Needs confirmation."
```

The `name` identifies the Skill. The `description` tells Claude what it does and when it should load. The Markdown body provides the detailed procedure.

Anthropic's current [custom Skill guide](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills) says the best Skills solve one repeatable task, clearly define when they apply, and include examples when those examples make the result easier to understand.

## How Claude decides to use a Skill

Claude uses a pattern called progressive disclosure.

It first sees the short metadata for available Skills. When your request matches a Skill's description, Claude can load the full instructions and any additional resources it needs. It does not need to stuff every instruction from every Skill into every conversation.

This is why the description matters so much.

Weak description:

> Helps with email.

Stronger description:

> Triage a Gmail inbox into Action Today, Waiting, Read Later, and Archive. Use when reviewing unread mail or preparing a daily inbox summary.

The stronger version names both the job and the moments when the Skill should activate.

## Skills versus prompts

A prompt is an instruction for the work in front of you. A Skill is a reusable operating procedure.

Use a prompt when the request is one-off:

> Summarize this proposal and list the three biggest risks.

Use a Skill when the method should stay consistent across many requests:

> Every proposal review should use our risk categories, scoring rubric, and approval format.

You still prompt Claude when Skills are enabled. The Skill supplies the method; your prompt supplies the current assignment.

## Skills versus Projects

A Project holds persistent context for a body of work: background documents, project instructions, goals, and conversations.

A Skill holds a procedure that may be useful across many projects.

For example:

- A **Project** contains everything related to the 2026 website redesign.
- A **Skill** explains how to turn any meeting transcript into your preferred decision log.

Projects answer, “What should Claude know about this initiative?” Skills answer, “How should Claude perform this kind of task?”

## Skills versus connectors

A connector gives Claude access to an outside tool or data source. A Skill tells Claude what to do with that access.

- The Gmail connector can let Claude search and organize email.
- An inbox-triage Skill can define your labels, priorities, exceptions, and approval rules.

Anthropic's [overview of Skills](https://support.claude.com/en/articles/12512176-what-are-skills) summarizes the difference well: MCP and connectors provide access; Skills provide procedural knowledge.

They become more useful together.

## What makes a good first Skill?

Choose a workflow with these traits:

1. You perform it often.
2. You can explain the steps.
3. You recognize a good result quickly.
4. Mistakes are easy to catch and reverse.
5. The process does not require Claude to make a high-stakes judgment alone.

Good first Skills include:

- Turn a transcript into meeting notes
- Format a weekly operating report
- Review a draft against a brand checklist
- Categorize customer feedback
- Prepare a daily inbox summary
- Convert rough notes into a project brief

Avoid starting with a giant “run my business” Skill. Small Skills are easier to test, improve, and trust.

## How do you add a custom Skill to Claude?

As of July 2026, Anthropic's consumer workflow is:

1. Create the Skill folder and `SKILL.md` file.
2. Package the folder as a ZIP file.
3. In Claude, open **Customize → Skills**.
4. Choose **Create skill**, then upload the ZIP.
5. Enable the Skill and test requests that should—and should not—trigger it.

Skills require code execution and file creation to be enabled. Team and Enterprise settings may be controlled by an organization owner. Check [Anthropic's Skill usage guide](https://support.claude.com/en/articles/12512180-use-skills-in-claude) for the latest plan and interface details.

## The real value: captured judgment

The best Skills do more than save a prompt. They capture the little decisions an experienced person makes without noticing.

What counts as urgent? Which source wins when two reports disagree? What should never be published? When should the task stop and ask a human?

Those details turn a generic AI response into a workflow your team can actually use.

Next: [How to Create Your First Claude Skill: Organize Your Inbox](/blog/posts/create-first-claude-skill-organize-inbox)
