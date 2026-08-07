const clean = (value, fallback = "Not provided") => {
  const text = String(value ?? "").trim();
  return text || fallback;
};

const escapeSlack = (value) =>
  clean(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const truncate = (value, length = 1400) => {
  const text = escapeSlack(value);
  return text.length > length ? `${text.slice(0, length - 1)}…` : text;
};

const section = (label, value) => ({
  type: "section",
  text: { type: "mrkdwn", text: `*${label}*\n${truncate(value)}` },
});

export default {
  async formSubmitted(event) {
    const data = event.data ?? {};

    // Only assessment applications belong in this notification workflow.
    if (!data.typical_day || !data.magic_wand || !data.email) return;

    const webhookUrl = process.env.SLACK_INTAKE_WEBHOOK_URL;
    if (!webhookUrl) throw new Error("SLACK_INTAKE_WEBHOOK_URL is not configured");

    const name = clean(data.name, "Someone");
    const company = clean(data.company, "No company provided");
    const payload = {
      text: `New AI assessment application from ${name} (${company})`,
      blocks: [
        { type: "header", text: { type: "plain_text", text: "New AI assessment application", emoji: true } },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*From*\n${truncate(name, 250)}` },
            { type: "mrkdwn", text: `*Company*\n${truncate(company, 250)}` },
            { type: "mrkdwn", text: `*Email*\n${truncate(data.email, 250)}` },
            { type: "mrkdwn", text: `*Role*\n${truncate(data.role, 250)}` },
            { type: "mrkdwn", text: `*Team size*\n${truncate(data.team_size, 250)}` },
            { type: "mrkdwn", text: `*Location*\n${truncate(data.location, 250)}` },
            { type: "mrkdwn", text: `*Revenue*\n${truncate(data.revenue, 250)}` },
            { type: "mrkdwn", text: `*Timing*\n${truncate(data.timeline, 250)}` },
          ],
        },
        { type: "divider" },
        section("Typical workday", data.typical_day),
        section("Tasks they dread", data.dreaded_tasks),
        section("Where work piles up", data.work_pileup),
        section("Process they would delete", data.magic_wand),
        { type: "divider" },
        section("Past attempts", data.past_attempts),
        section("Current tools", data.current_tools),
        section("What makes this a win", data.success),
        section("Recording consent", data.recording_consent),
      ],
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Slack notification failed with status ${response.status}`);
  },
};
