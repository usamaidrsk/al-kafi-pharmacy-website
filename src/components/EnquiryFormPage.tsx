"use client";

import Script from "next/script";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { business } from "@/data/business";

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
  }
}

type EnquiryFormPageProps = {
  type: "contact" | "consultation";
};

const topicOptions = {
  contact: [
    "Store enquiry",
    "Product availability",
    "Location or opening-status information",
    "Feedback",
    "Formal complaint",
  ],
  consultation: [
    "Medicine-use guidance",
    "Dosage or timing clarification",
    "Minor ailment product guidance",
    "Product availability before visiting",
  ],
};

const copy = {
  contact: {
    eyebrow: "Contact",
    title: "Send a low-risk store enquiry.",
    description:
      "Use this form for general store questions only. Do not submit prescriptions, diagnoses, laboratory reports, national IDs, or payment-card details.",
    action: "/api/contact",
    submit: "Send enquiry",
  },
  consultation: {
    eyebrow: "Pharmacist consultation",
    title: "Ask for practical pharmacist guidance.",
    description:
      "This is for low-risk medicine-use questions and visit planning. It is not an emergency service, diagnosis service, prescription upload portal, or patient-record system.",
    action: "/api/consultation",
    submit: "Request guidance",
  },
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

const EnquiryFormPage = ({ type }: EnquiryFormPageProps) => {
  const content = copy[type];
  const topics = topicOptions[type];
  const formDisabled = !turnstileSiteKey;
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const isDisabled = formDisabled || status === "submitting";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch(content.action, {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "fetch",
        },
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        redirect?: string;
      };

      if (response.ok && data.redirect) {
        window.location.assign(data.redirect);
        return;
      }

      setStatus("error");
      setError(data.error || "The form could not be submitted. Please check the details and try again.");
      window.turnstile?.reset();
    } catch {
      setStatus("error");
      setError("The form could not be submitted. Please check your connection and try again.");
      window.turnstile?.reset();
    }
  };

  return (
    <main className="bg-[#faf5ef] px-5 py-14 md:px-6 md:py-20">
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      )}
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[2rem] border border-[#012e20]/10 bg-white p-6 shadow-[0_24px_70px_rgba(1,46,32,0.08)] md:p-10">
          <span className="section-kicker">{content.eyebrow}</span>
          <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            {content.title}
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-700">
            {content.description}
          </p>
          <div className="mt-8 rounded-2xl bg-[#012e20] p-5 text-sm leading-7 text-[#faf5ef]/78">
            <p className="font-bold text-white">Need urgent care?</p>
            <p className="mt-2">
              This website is not an emergency service. For urgent symptoms or
              medical emergencies, contact local emergency care immediately.
            </p>
          </div>
          <div className="mt-6 text-sm leading-7 text-slate-600">
            You can also call{" "}
            <a className="font-black text-[#012e20]" href={business.phoneHref}>
              {business.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a className="font-black text-[#012e20]" href={`mailto:${business.email}`}>
              {business.email}
            </a>
            .
          </div>
          {type === "contact" && (
            <Link
              href="/complaints/"
              className="mt-7 inline-flex min-h-12 items-center rounded-full border border-[#012e20]/15 bg-[#faf5ef] px-5 text-sm font-black text-[#012e20] transition hover:border-[#d5a94e] hover:bg-[#f1e5c9]"
            >
              Formal complaints procedure
            </Link>
          )}
        </section>

        <form
          action={content.action}
          method="post"
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-[#012e20]/10 bg-white p-6 shadow-[0_24px_70px_rgba(1,46,32,0.08)] md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Full name"
              name="full_name"
              required
              disabled={isDisabled}
              placeholder="Your full name"
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              required
              disabled={isDisabled}
              placeholder="you@example.com"
            />
            <Field
              label="Phone number"
              name="phone"
              type="tel"
              disabled={isDisabled}
              placeholder="+256 790 836 377"
            />
            <label className="grid gap-2 text-sm font-bold text-[#012e20]">
              Topic
              <select
                name="topic"
                required
                disabled={isDisabled}
                className="min-h-12 rounded-xl border border-[#012e20]/15 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#d5a94e] focus:ring-4 focus:ring-[#d5a94e]/20"
              >
                <option value="">Select a topic</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-5 grid gap-2 text-sm font-bold text-[#012e20]">
            Preferred contact method
            <select
              name="preferred_contact"
              required
              disabled={isDisabled}
              className="min-h-12 rounded-xl border border-[#012e20]/15 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#d5a94e] focus:ring-4 focus:ring-[#d5a94e]/20"
            >
              <option value="">Choose how we should respond</option>
              <option value="phone">Phone</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </label>

          <label className="mt-5 grid gap-2 text-sm font-bold text-[#012e20]">
            Message
            <textarea
              name="message"
              rows={5}
              maxLength={1200}
              disabled={isDisabled}
              placeholder="Briefly describe the enquiry. Do not include prescriptions, diagnoses, IDs, lab reports, or payment-card details."
              className="rounded-xl border border-[#012e20]/15 bg-white px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d5a94e] focus:ring-4 focus:ring-[#d5a94e]/20"
            />
          </label>

          <label className="mt-5 flex gap-3 rounded-2xl bg-[#faf5ef] p-4 text-sm leading-6 text-slate-700">
            <input
              type="checkbox"
              name="consent"
              required
              disabled={isDisabled}
              className="mt-1 h-4 w-4 shrink-0"
            />
            <span>
              I agree that {business.displayName} may use my submitted contact
              details to respond to this enquiry. I have read the{" "}
              <Link href="/privacy/" className="font-black text-[#012e20]">
                Privacy Notice
              </Link>
              .
            </span>
          </label>

          {turnstileSiteKey ? (
            <div
              className="cf-turnstile mt-5"
              data-sitekey={turnstileSiteKey}
              data-action={type}
              data-cdata={`al-kaafi-${type}`}
              data-theme="light"
            />
          ) : (
            <p className="mt-5 rounded-2xl border border-[#d5a94e]/30 bg-[#fff8e8] p-4 text-sm leading-6 text-[#6c5319]">
              Turnstile is not configured yet. Add
              `NEXT_PUBLIC_TURNSTILE_SITE_KEY` at build time and
              `TURNSTILE_SECRET_KEY` as a Cloudflare Worker secret before
              enabling this form.
            </p>
          )}

          <button
            type="submit"
            disabled={isDisabled}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#012e20] px-7 text-sm font-black text-white transition hover:bg-[#10492e] disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {status === "submitting" ? "Submitting..." : content.submit}
          </button>
          <div className="mt-4 min-h-6" aria-live="polite">
            {status === "error" && (
              <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

const Field = ({
  label,
  name,
  type = "text",
  required = false,
  disabled = false,
  placeholder,
}: FieldProps) => (
  <label className="grid gap-2 text-sm font-bold text-[#012e20]">
    {label}
    <input
      name={name}
      type={type}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      className="min-h-12 rounded-xl border border-[#012e20]/15 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d5a94e] focus:ring-4 focus:ring-[#d5a94e]/20"
    />
  </label>
);

export default EnquiryFormPage;
