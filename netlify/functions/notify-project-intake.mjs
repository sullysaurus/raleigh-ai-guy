const clean = (value, fallback = "Not provided") => {
  const text = String(value ?? "").trim();
  return text || fallback;
};

const escapeSlack = (value) =>
  clean(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const truncate = (value, length = 1200) => {
  const text = escapeSlack(value);
  return text.length > length ? `${text.slice(0, length - 1)}…` : text;
};

const section = (label, value) => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text: `*${label}*\n${truncate(value)}`,
  },
});

export default {
  async formSubmitted(event) {
    const data = event.data ?? {};

    // This site may gain other Netlify forms later. Only project briefs belong here.
    if (!data.goal || !data.email || !data.pain_points) return;

    const webhookUrl = process.env.SLACK_INTAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error("SLACK_INTAKE_WEBHOOK_URL is not configured");
    }

    const name = clean(data.name, "Someone");
    const company = clean(data.company, "No company provided");
    const payload = {
      text: `New project brief from ${name} (${company})`,
      blocks: [
        {
          type: "header",
          text: { type: "plain_text", text: "New project brief", emoji: true },
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*From*\n${truncate(name, 250)}` },
            { type: "mrkdwn", text: `*Company*\n${truncate(company, 250)}` },
            { type: "mrkdwn", text: `*Email*\n${truncate(data.email, 250)}` },
            { type: "mrkdwn", text: `*Role*\n${truncate(data.role, 250)}` },
          ],
        },
        { type: "divider" },
        section("What they want to do", data.goal),
        section("Biggest pain points", data.pain_points),
        section("Work they want to automate", data.repetitive_work),
        section("What success looks like", data.success),
        { type: "divider" },
        section("Current tools", [data.tools, data.other_tools].filter(Boolean).join(", ")),
        section("Current handoffs", data.tool_handoffs),
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Timeline*\n${truncate(data.timeline, 500)}` },
            { type: "mrkdwn", text: `*People involved*\n${truncate(data.stakeholders, 500)}` },
          ],
        },
        section("Constraints", data.constraints),
        section("Anything else", data.anything_else),
      ],
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Slack notification failed with status ${response.status}`);
    }
  },
};
