type AssetBinding = {
  fetch(request: Request): Promise<Response>;
};

type D1Statement = {
  bind(...values: Array<string | number | null>): {
    run(): Promise<unknown>;
  };
};

type D1Binding = {
  prepare(query: string): D1Statement;
};

type EmailBinding = {
  send(message: {
    to: string | string[];
    from: { email: string; name?: string };
    replyTo?: string;
    subject: string;
    text: string;
    html: string;
  }): Promise<unknown>;
};

type Env = {
  ASSETS: AssetBinding;
  EMAIL?: EmailBinding;
  al_kaafi_public: D1Binding;
  ENVIRONMENT?: string;
  SITE_URL?: string;
  TURNSTILE_HOSTNAMES?: string;
  TURNSTILE_SECRET_KEY?: string;
};

type TurnstileResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  cdata?: string;
  "error-codes"?: string[];
};

type EnquiryType = "contact" | "consultation";
type TurnstileAction = EnquiryType | "newsletter";

type EnquiryNotification = {
  id: string;
  enquiryType: EnquiryType;
  fullName: string;
  email: string;
  phone: string | null;
  topic: string | null;
  preferredContact: string | null;
  message: string | null;
  cfCountry: string | null;
};

type NewsletterNotification = {
  id: string;
  fullName: string | null;
  email: string;
  source: string;
  cfCountry: string | null;
};

const securityHeaders: Record<string, string> = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://challenges.cloudflare.com",
    "frame-src https://challenges.cloudflare.com",
    "upgrade-insecure-requests",
  ].join("; "),
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

const sensitiveDataPatterns = [
  /\bdiagnos(?:is|ed)\b/i,
  /\blab(?:oratory)?\s*(?:report|result)s?\b/i,
  /\bpassport\b/i,
  /\bnational\s*id\b/i,
  /\bpayment\s*card\b/i,
  /\bcredit\s*card\b/i,
  /\bcard\s*number\b/i,
  /\bprescription\s*(?:upload|image|photo|scan|file)\b/i,
];

const emailFrom = {
  email: "feedback@alkaafipharmacy.com",
  name: "Al Kaafi Website",
};

const enquiryRecipients: Record<EnquiryType, string> = {
  contact: "feedback@alkaafipharmacy.com",
  consultation: "rx@alkaafipharmacy.com",
};

const worker = {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === "www.alkaafipharmacy.com") {
      url.hostname = "alkaafipharmacy.com";
      return Response.redirect(url.toString(), 301);
    }

    if (
      url.pathname === "/prescription-portal" ||
      url.pathname === "/prescription-portal/"
    ) {
      url.pathname = "/prescription-support/";
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/api/contact" || url.pathname === "/api/consultation") {
      return withSecurityHeaders(
        await handleEnquiry(request, env, ctx, url.pathname)
      );
    }

    if (url.pathname === "/api/newsletter") {
      return withSecurityHeaders(await handleNewsletter(request, env, ctx));
    }

    return withSecurityHeaders(await env.ASSETS.fetch(request));
  },
};

export default worker;

async function handleEnquiry(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  pathname: string
): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: "Invalid form submission" }, 400);
  }

  const enquiryType: EnquiryType = pathname.endsWith("/consultation")
    ? "consultation"
    : "contact";
  const turnstileToken = getString(formData, "cf-turnstile-response");
  const turnstileOk = await verifyTurnstile(
    turnstileToken,
    request,
    env,
    enquiryType
  );

  if (!turnstileOk) {
    return jsonResponse({ error: "Human verification failed" }, 403);
  }

  const fullName = normalize(getString(formData, "full_name"), 90);
  const email = normalize(getString(formData, "email"), 120).toLowerCase();
  const phone = normalize(getString(formData, "phone"), 40) || null;
  const topic = normalize(getString(formData, "topic"), 120) || null;
  const preferredContact =
    normalize(getString(formData, "preferred_contact"), 40) || null;
  const message = normalize(getString(formData, "message"), 1200) || null;
  const consent = formData.get("consent") === "on" ? 1 : 0;

  if (!fullName || !email || !email.includes("@") || consent !== 1) {
    return jsonResponse({ error: "Required fields are missing" }, 400);
  }

  if (message && sensitiveDataPatterns.some((pattern) => pattern.test(message))) {
    return jsonResponse(
      {
        error:
          "Please do not submit prescriptions, diagnoses, IDs, lab reports, or payment-card details through this public form.",
      },
      400
    );
  }

  const id = crypto.randomUUID();
  const userAgent = normalize(request.headers.get("user-agent"), 220) || null;
  const cfCountry = normalize(request.headers.get("cf-ipcountry"), 8) || null;

  await env.al_kaafi_public.prepare(
    `INSERT INTO public_enquiries (
      id,
      enquiry_type,
      full_name,
      email,
      phone,
      topic,
      preferred_contact,
      message,
      consent,
      user_agent,
      cf_country
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      id,
      enquiryType,
      fullName,
      email,
      phone,
      topic,
      preferredContact,
      message,
      consent,
      userAgent,
      cfCountry
    )
    .run();

  ctx.waitUntil(
    sendEnquiryNotification(env, {
      id,
      enquiryType,
      fullName,
      email,
      phone,
      topic,
      preferredContact,
      message,
      cfCountry,
    })
  );

  const siteUrl = env.SITE_URL || "https://alkaafipharmacy.com";
  const thankYouUrl = new URL("/thank-you/", siteUrl);
  thankYouUrl.searchParams.set("type", enquiryType);

  return redirectOrJson(request, thankYouUrl);
}

async function handleNewsletter(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: "Invalid form submission" }, 400);
  }

  if (getString(formData, "company")) {
    return jsonResponse({ error: "Invalid form submission" }, 400);
  }

  const turnstileToken = getString(formData, "cf-turnstile-response");
  const turnstileOk = await verifyTurnstile(
    turnstileToken,
    request,
    env,
    "newsletter"
  );

  if (!turnstileOk) {
    return jsonResponse({ error: "Human verification failed" }, 403);
  }

  const fullName = normalize(getString(formData, "full_name"), 90) || null;
  const email = normalize(getString(formData, "email"), 120).toLowerCase();
  const source = normalize(getString(formData, "source"), 80) || "website";
  const consent = formData.get("consent") === "on" ? 1 : 0;

  if (!email || !isLikelyEmail(email) || consent !== 1) {
    return jsonResponse({ error: "Required fields are missing" }, 400);
  }

  const id = crypto.randomUUID();
  const userAgent = normalize(request.headers.get("user-agent"), 220) || null;
  const cfCountry = normalize(request.headers.get("cf-ipcountry"), 8) || null;

  await env.al_kaafi_public.prepare(
    `INSERT INTO newsletter_subscribers (
      id,
      email,
      full_name,
      source,
      consent,
      status,
      user_agent,
      cf_country
    ) VALUES (?, ?, ?, ?, ?, 'subscribed', ?, ?)
    ON CONFLICT(email) DO UPDATE SET
      full_name = COALESCE(excluded.full_name, newsletter_subscribers.full_name),
      source = excluded.source,
      consent = excluded.consent,
      status = 'subscribed',
      user_agent = excluded.user_agent,
      cf_country = excluded.cf_country,
      updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`
  )
    .bind(id, email, fullName, source, consent, userAgent, cfCountry)
    .run();

  ctx.waitUntil(
    sendNewsletterNotification(env, {
      id,
      fullName,
      email,
      source,
      cfCountry,
    })
  );

  const siteUrl = env.SITE_URL || "https://alkaafipharmacy.com";
  const thankYouUrl = new URL("/thank-you/", siteUrl);
  thankYouUrl.searchParams.set("type", "newsletter");

  return redirectOrJson(request, thankYouUrl);
}

async function sendEnquiryNotification(
  env: Env,
  enquiry: EnquiryNotification
): Promise<void> {
  if (!env.EMAIL) {
    console.warn("Email binding is not configured; enquiry notification skipped.");
    return;
  }

  const recipient = enquiryRecipients[enquiry.enquiryType];
  const label =
    enquiry.enquiryType === "consultation"
      ? "Pharmacist consultation"
      : "Store enquiry";
  const subject = `[Al Kaafi Website] ${label} from ${enquiry.fullName}`;
  const replyTo = isLikelyEmail(enquiry.email) ? enquiry.email : undefined;

  try {
    await env.EMAIL.send({
      to: recipient,
      from: emailFrom,
      replyTo,
      subject,
      text: buildNotificationText(enquiry, label),
      html: buildNotificationHtml(enquiry, label),
    });
  } catch (error) {
    console.error(
      `Failed to send ${enquiry.enquiryType} notification ${enquiry.id}:`,
      error
    );
  }
}

async function sendNewsletterNotification(
  env: Env,
  subscription: NewsletterNotification
): Promise<void> {
  if (!env.EMAIL) {
    console.warn("Email binding is not configured; newsletter notification skipped.");
    return;
  }

  try {
    await env.EMAIL.send({
      to: "feedback@alkaafipharmacy.com",
      from: emailFrom,
      replyTo: subscription.email,
      subject: `[Al Kaafi Website] Newsletter signup from ${subscription.email}`,
      text: buildNewsletterText(subscription),
      html: buildNewsletterHtml(subscription),
    });
  } catch (error) {
    console.error(
      `Failed to send newsletter notification ${subscription.id}:`,
      error
    );
  }
}

function buildNotificationText(
  enquiry: EnquiryNotification,
  label: string
): string {
  return [
    `${label} submitted on alkaafipharmacy.com`,
    "",
    `Reference: ${enquiry.id}`,
    `Name: ${enquiry.fullName}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || "Not provided"}`,
    `Topic: ${enquiry.topic || "Not selected"}`,
    `Preferred contact: ${enquiry.preferredContact || "Not selected"}`,
    `Country: ${enquiry.cfCountry || "Unknown"}`,
    "",
    "Message:",
    enquiry.message || "No message provided.",
    "",
    "This public form is for low-risk enquiries only. Do not ask customers to send prescriptions, diagnoses, IDs, lab reports, insurance details, or payment-card information through this email thread.",
  ].join("\n");
}

function buildNotificationHtml(
  enquiry: EnquiryNotification,
  label: string
): string {
  const rows = [
    ["Reference", enquiry.id],
    ["Name", enquiry.fullName],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "Not provided"],
    ["Topic", enquiry.topic || "Not selected"],
    ["Preferred contact", enquiry.preferredContact || "Not selected"],
    ["Country", enquiry.cfCountry || "Unknown"],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.6;">
      <h1 style="color: #003B2E; font-size: 20px;">${escapeHtml(label)} submitted on alkaafipharmacy.com</h1>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 680px;">
        ${rows
          .map(
            ([name, value]) => `
              <tr>
                <th align="left" style="border: 1px solid #e5ded0; background: #f3ebdc; width: 180px;">${escapeHtml(name)}</th>
                <td style="border: 1px solid #e5ded0;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <h2 style="color: #003B2E; font-size: 16px; margin-top: 24px;">Message</h2>
      <p style="white-space: pre-wrap;">${escapeHtml(enquiry.message || "No message provided.")}</p>
      <p style="background: #fff8e8; border: 1px solid #d4af37; padding: 12px; border-radius: 8px;">
        This public form is for low-risk enquiries only. Do not ask customers to send prescriptions,
        diagnoses, IDs, lab reports, insurance details, or payment-card information through this email thread.
      </p>
    </div>
  `;
}

function buildNewsletterText(subscription: NewsletterNotification): string {
  return [
    "Newsletter signup submitted on alkaafipharmacy.com",
    "",
    `Reference: ${subscription.id}`,
    `Name: ${subscription.fullName || "Not provided"}`,
    `Email: ${subscription.email}`,
    `Source: ${subscription.source}`,
    `Country: ${subscription.cfCountry || "Unknown"}`,
    "",
    "The subscriber gave consent to receive health tips and store updates.",
  ].join("\n");
}

function buildNewsletterHtml(subscription: NewsletterNotification): string {
  const rows = [
    ["Reference", subscription.id],
    ["Name", subscription.fullName || "Not provided"],
    ["Email", subscription.email],
    ["Source", subscription.source],
    ["Country", subscription.cfCountry || "Unknown"],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.6;">
      <h1 style="color: #003B2E; font-size: 20px;">Newsletter signup submitted on alkaafipharmacy.com</h1>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 680px;">
        ${rows
          .map(
            ([name, value]) => `
              <tr>
                <th align="left" style="border: 1px solid #e5ded0; background: #f3ebdc; width: 180px;">${escapeHtml(name)}</th>
                <td style="border: 1px solid #e5ded0;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <p style="background: #fff8e8; border: 1px solid #d4af37; padding: 12px; border-radius: 8px;">
        The subscriber gave consent to receive health tips and store updates.
      </p>
    </div>
  `;
}

async function verifyTurnstile(
  token: string,
  request: Request,
  env: Env,
  expectedAction: TurnstileAction
): Promise<boolean> {
  const expectedHostnames = parseExpectedHostnames(env.TURNSTILE_HOSTNAMES);

  if (
    !env.TURNSTILE_SECRET_KEY ||
    !token ||
    token.length > 2048 ||
    expectedHostnames.size === 0
  ) {
    return false;
  }

  try {
    const body = new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      idempotency_key: crypto.randomUUID(),
    });

    const remoteip = request.headers.get("CF-Connecting-IP");
    if (remoteip) {
      body.set("remoteip", remoteip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body,
      }
    );

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as TurnstileResponse;

    return (
      result.success === true &&
      result.action === expectedAction &&
      typeof result.hostname === "string" &&
      expectedHostnames.has(result.hostname)
    );
  } catch {
    return false;
  }
}

function parseExpectedHostnames(hostnames: string | undefined): Set<string> {
  return new Set(
    (hostnames || "")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean)
  );
}

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function normalize(value: string | null, maxLength: number): string {
  return (value || "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function isLikelyEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "\"":
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}

function redirectOrJson(request: Request, url: URL): Response {
  if (prefersJson(request)) {
    return jsonResponse({ ok: true, redirect: url.toString() }, 200);
  }

  return Response.redirect(url.toString(), 303);
}

function prefersJson(request: Request): boolean {
  return (
    request.headers.get("x-requested-with") === "fetch" ||
    request.headers.get("accept")?.includes("application/json") === true
  );
}

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(securityHeaders)) {
    headers.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
