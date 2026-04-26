const NANOCORP_BACKEND_URL =
  process.env.NANOCORP_BACKEND_URL ??
  "https://phospho-nanocorp-prod--nanocorp-api-fastapi-app.modal.run";
const NANOCORP_AGENT_SECRET = process.env.NANOCORP_AGENT_SECRET;

type SendNanoCorpEmailInput = {
  to: string;
  subject: string;
  body: string;
};

export async function sendNanoCorpEmail({
  to,
  subject,
  body,
}: SendNanoCorpEmailInput) {
  if (!NANOCORP_AGENT_SECRET) {
    throw new Error("NANOCORP_AGENT_SECRET is not configured");
  }

  const response = await fetch(
    `${NANOCORP_BACKEND_URL}/internal/tools/send_email/execute`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NANOCORP_AGENT_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        arguments: {
          to,
          subject,
          // NanoCorp's send_email tool currently honors a single rendered body field.
          body,
        },
      }),
      signal: AbortSignal.timeout(10_000),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`NanoCorp email API returned ${response.status}: ${errorText}`);
  }

  const payload = (await response.json()) as {
    error?: unknown;
    success?: boolean;
  };

  if (!payload.success) {
    throw new Error(`NanoCorp email API reported failure: ${JSON.stringify(payload.error)}`);
  }
}
