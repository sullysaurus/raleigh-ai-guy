---
pubDate: 2026-07-20T09:00:00-04:00
title: "How to Create a Design in Claude Design and Share It with a Client"
description: "Create a flyer in Claude Design, refine it, and hand it to a client—even when they use a separate Claude account."
image:
  url: "/src/images/posts/claude-design-client-handoff.png"
  alt: "A flyer moving from one visual design workspace to another through an export package"
tags:
  - claude
  - claude-design
  - design
  - tutorial
---

Claude Design can turn a written idea into a flyer, one-pager, presentation, social graphic, or interactive prototype. You describe what you need, Claude builds a first draft on a canvas, and you refine it through chat, comments, or direct editing.

But sharing the finished design with a client has one important limitation: **a Claude Design editing link works within your Claude organization, not across unrelated Claude accounts.**

If your client belongs to the same Team or Enterprise organization, you can give them view, comment, or edit access. If they use their own separate Claude account, you need to export the work and hand off the files instead.

This guide walks through both options using a client flyer as the example.

## What is Claude Design?

Claude Design is an Anthropic beta product for creating designs, decks, prototypes, and other visual work through conversation. It is available on Claude Pro, Max, Team, and Enterprise plans at [claude.ai/design](https://claude.ai/design).

The workspace has two main areas:

- A chat where you describe the design and request changes
- A canvas where you review and directly adjust the result

Anthropic says Claude Design can export work as a ZIP project, PDF, PowerPoint file, or standalone HTML file. It can also send designs to tools such as Canva and Adobe. See Anthropic's current [Claude Design overview](https://claude.com/product/design) and [getting-started guide](https://support.claude.com/en/articles/14604416-get-started-with-claude-design) for the latest availability and export options.

## Step 1: Start a Claude Design project

Go to [claude.ai/design](https://claude.ai/design) and create a new project.

Before asking Claude to design the flyer, collect the material it needs:

- The exact headline and supporting copy
- The event date, time, location, price, and call to action
- Your logo and approved photos
- Brand colors and fonts
- The intended size, such as US Letter, A4, or a social-media format
- Examples of designs you like

Specific inputs produce a more useful first draft. Do not make Claude guess at important client information.

## Step 2: Prompt Claude to create the flyer

Your prompt should name the audience, purpose, content, format, and visual direction.

Try this:

> Create a one-page US Letter flyer for a small-business AI workshop. The audience is local business owners who are curious about AI but not technical. Use the attached logo and brand colors. Put the headline and workshop benefit at the top, the date and location in the middle, and a clear registration call to action at the bottom. Keep the design professional, friendly, and easy to read when printed. Do not invent any details. Ask me about missing information before designing.

If you already have a rough flyer, upload it as a reference and say what should stay and what should change.

## Step 3: Refine the design

The first result is a draft. Review the actual flyer rather than accepting it because it looks polished.

Check:

- Is every date, price, URL, and phone number correct?
- Can someone understand the offer in a few seconds?
- Is the smallest text readable at the final size?
- Does the call to action stand out?
- Are the logo, colors, and images approved for client use?
- Does the printed version still work without animation or interaction?

Use chat for broad changes:

> Give the headline more emphasis, reduce the amount of body copy, and make the registration section easier to find.

Use a comment for a change to one element:

> Increase the contrast of this date block and give it more space from the section above.

You can also move, resize, and align elements directly on the canvas. Anthropic recommends chat for structural changes, comments for targeted feedback, and direct editing for quick visual adjustments.

## Step 4: Choose the right sharing method

This is where the client's account matters.

### Option A: The client is in your Claude organization

Use Claude Design's built-in sharing controls.

1. Open the design project.
2. Click **Share**.
3. Choose view, comment, or edit access.
4. Copy the link and send it to the client.

Claude Design sharing is organization-scoped. Anthropic documents the available permissions as view-only, comment, and edit. It also warns that simultaneous multi-person editing is still basic because the product is in beta.

This is the best option when you and the client are members of the same Claude Team or Enterprise organization.

### Option B: The client uses a separate Claude account

Do not rely on the Share link. An unrelated account outside your organization will not receive the same live editing access.

Instead, create a handoff package:

1. Click **Export** in Claude Design.
2. Download the project as a **ZIP**.
3. Export a **PDF** for an easy visual reference.
4. If the design is interactive, also export **standalone HTML**.
5. Include the source logo, images, copy, and brand notes the client is allowed to use.
6. Send the files with a short handoff prompt.

The client can create a new project in their own Claude Design account, attach the exported files and reference material, and ask Claude to continue from them. If Claude Design does not accept the ZIP directly, the client can unzip it and upload the relevant HTML, images, and source files.

This creates a new project in the client's account. It does **not** transfer your original chat history, permissions, or live project as a shared editable document. The client should compare the imported result with the PDF before making changes.

Use this handoff prompt:

> I received this flyer project from my designer. Use the attached exported files and PDF as the source of truth. Recreate the design in a new Claude Design project while preserving the wording, dimensions, colors, spacing, and image placement. Do not rewrite the copy or replace the images unless I approve it. First compare the editable result with the PDF and list any differences.

## A simpler option: Send it to Canva

If the real goal is collaborative client editing rather than keeping the work inside Claude, sending the design to Canva may be easier.

Claude Design lists Canva as an export destination. Once the design is in Canva, you can use Canva's normal client-sharing and permission controls. This avoids asking the client to reconstruct the project in a separate Claude account.

For many flyer projects, the practical workflow is:

1. Create the first concept in Claude Design.
2. Refine the message and layout with Claude.
3. Send the design to Canva.
4. Invite the client to review or edit it there.
5. Export the approved flyer for print or distribution.

Use the ZIP handoff when the client specifically wants to continue working with Claude. Use Canva when both parties mainly need dependable visual collaboration.

## What to send the client

A complete handoff should include:

- The exported Claude Design ZIP
- A PDF showing the approved visual reference
- Standalone HTML if the design includes interactions
- Original images and logos the client may reuse
- The exact approved copy in a separate document
- Font names and brand colors
- Final dimensions and print requirements
- A note explaining what the client may change
- The handoff prompt above

Keep sensitive source material out of the package. Only send files the client is authorized to receive.

## Common mistakes

### Sending only the Claude Design link

A client on a separate account may not be part of your organization. Test access in a private browser window or ask the client to confirm before treating the link as the handoff.

### Sending only a PDF

A PDF is useful for review and printing, but it is not a complete editable Claude Design project. Include the ZIP and source assets when the client needs to continue editing.

### Expecting a perfect cross-account transfer

Claude Design currently documents organization-scoped sharing, not a one-click transfer between unrelated organizations. Treat the exported package as a handoff to a new project and verify the result against the PDF.

### Forgetting usage and plan requirements

Claude Design is currently available on Pro, Max, Team, and Enterprise plans. A client without access may need the final PDF, HTML file, PowerPoint file, or a version shared through another design tool instead.

### Letting Claude rewrite approved details

Tell Claude that the copy and facts are locked. Ask it to list proposed changes before applying them.

## The short version

If your client is in the same Claude organization, share the Claude Design project and give them view, comment, or edit access.

If your client uses a separate Claude account, export the ZIP plus a PDF, send the files, and have the client start a new Claude Design project from that package. For smoother collaborative editing, send the design to Canva instead.

Claude Design can make the first draft much faster. A careful handoff is what makes the design useful after it leaves your account.
