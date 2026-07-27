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

type Env = {
  ASSETS: AssetBinding;
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

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === "www.alkaafipharmacy.com") {
      url.hostname = "alkaafipharmacy.com";
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/api/contact" || url.pathname === "/api/consultation") {
      return withSecurityHeaders(await handleEnquiry(request, env, url.pathname));
    }

    return withSecurityHeaders(await env.ASSETS.fetch(request));
  },
};

export default worker;

async function handleEnquiry(
  request: Request,
  env: Env,
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

  const siteUrl = env.SITE_URL || "https://alkaafipharmacy.com";
  const thankYouUrl = new URL("/thank-you/", siteUrl);
  thankYouUrl.searchParams.set("type", enquiryType);

  return Response.redirect(thankYouUrl.toString(), 303);
}

async function verifyTurnstile(
  token: string,
  request: Request,
  env: Env,
  expectedAction: EnquiryType
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

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
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
