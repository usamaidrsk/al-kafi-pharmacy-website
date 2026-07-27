"use client";

import Script from "next/script";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { business } from "@/data/business";
import { communityProgrammes } from "@/data/community-programmes";

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

const deliveryFormats = [
  "Pharmacy talk",
  "Workplace session",
  "School outreach",
  "Community event",
  "Digital education",
  "Targeted health-awareness campaign",
];

const CommunityProgrammeRequestForm = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const formDisabled = !turnstileSiteKey;
  const isDisabled = formDisabled || status === "submitting";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const submitted = new FormData(event.currentTarget);
    const payload = new FormData();
    const programme = getFormValue(submitted, "programme_selected");

    payload.set("full_name", getFormValue(submitted, "full_name"));
    payload.set("email", getFormValue(submitted, "email"));
    payload.set("phone", getFormValue(submitted, "telephone"));
    payload.set("topic", `Community programme: ${programme}`);
    payload.set("preferred_contact", "email");
    payload.set("consent", "on");
    payload.set("message", buildMessage(submitted));

    const turnstileToken = submitted.get("cf-turnstile-response");
    if (typeof turnstileToken === "string") {
      payload.set("cf-turnstile-response", turnstileToken);
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload,
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
      setError(data.error || "The request could not be submitted. Please check the details and try again.");
      window.turnstile?.reset();
    } catch {
      setStatus("error");
      setError("The request could not be submitted. Please check your connection and try again.");
      window.turnstile?.reset();
    }
  };

  return (
    <section
      id="programme-request"
      className="mt-12 grid gap-8 rounded-[2rem] border border-[#012e20]/10 bg-white p-6 shadow-[0_24px_70px_rgba(1,46,32,0.08)] md:p-10 lg:grid-cols-[0.8fr_1.2fr]"
    >
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      )}

      <div>
        <span className="section-kicker">Programme request form</span>
        <h2 className="mt-6 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
          Request a Community Programme
        </h2>
        <p className="mt-5 text-base leading-8 text-slate-700">
          Use this form for programme planning only. Do not submit participant
          diagnoses, prescriptions, clinical histories or children&apos;s personal
          health information through this public request form.
        </p>
        <p className="mt-5 rounded-2xl bg-[#faf5ef] p-4 text-sm font-semibold leading-7 text-slate-700">
          By submitting this request, you agree that {business.displayName} may
          use the contact details provided to respond to your enquiry. See the{" "}
          <Link href="/privacy/" className="font-black text-[#012e20]">
            Privacy Notice
          </Link>
          .
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Name"
            name="full_name"
            required
            disabled={isDisabled}
            placeholder="Your full name"
          />
          <Field
            label="Organisation"
            name="organisation"
            disabled={isDisabled}
            placeholder="Organisation or group name"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            required
            disabled={isDisabled}
            placeholder="you@example.com"
          />
          <Field
            label="Telephone"
            name="telephone"
            type="tel"
            disabled={isDisabled}
            placeholder="+256 790 836 377"
          />

          <label className="grid gap-2 text-sm font-bold text-[#012e20]">
            Programme selected
            <select
              name="programme_selected"
              required
              disabled={isDisabled}
              className="min-h-12 rounded-xl border border-[#012e20]/15 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#d5a94e] focus:ring-4 focus:ring-[#d5a94e]/20"
            >
              <option value="">Select a programme</option>
              {communityProgrammes.map((programme) => (
                <option key={programme.title} value={programme.title}>
                  {programme.title}
                </option>
              ))}
            </select>
          </label>

          <Field
            label="Intended audience"
            name="intended_audience"
            disabled={isDisabled}
            placeholder="e.g. parents, staff, pupils, caregivers"
          />
          <Field
            label="Estimated number of participants"
            name="estimated_participants"
            type="number"
            disabled={isDisabled}
            placeholder="e.g. 30"
          />
          <Field
            label="Preferred location"
            name="preferred_location"
            disabled={isDisabled}
            placeholder="e.g. Nakasero, school hall, workplace"
          />
          <Field
            label="Preferred date"
            name="preferred_date"
            type="date"
            disabled={isDisabled}
            placeholder="Select a preferred date"
          />

          <label className="grid gap-2 text-sm font-bold text-[#012e20]">
            Delivery format
            <select
              name="delivery_format"
              disabled={isDisabled}
              className="min-h-12 rounded-xl border border-[#012e20]/15 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#d5a94e] focus:ring-4 focus:ring-[#d5a94e]/20"
            >
              <option value="">Select a format</option>
              {deliveryFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-5 grid gap-2 text-sm font-bold text-[#012e20]">
          General notes
          <textarea
            name="general_notes"
            rows={5}
            maxLength={1200}
            disabled={isDisabled}
            placeholder="Share programme goals, preferred timing, or logistics. Do not include participant diagnoses, prescriptions, clinical histories or children's personal health information."
            className="rounded-xl border border-[#012e20]/15 bg-white px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d5a94e] focus:ring-4 focus:ring-[#d5a94e]/20"
          />
        </label>

        {turnstileSiteKey ? (
          <div
            className="cf-turnstile mt-5"
            data-sitekey={turnstileSiteKey}
            data-action="contact"
            data-cdata="al-kaafi-community-programme"
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
          {status === "submitting" ? "Submitting..." : "Submit programme request"}
        </button>
        <div className="mt-4 min-h-6" aria-live="polite">
          {status === "error" && (
            <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
              {error}
            </p>
          )}
        </div>
      </form>
    </section>
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

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function buildMessage(formData: FormData) {
  const fields = [
    ["Organisation", "organisation"],
    ["Programme selected", "programme_selected"],
    ["Intended audience", "intended_audience"],
    ["Estimated number of participants", "estimated_participants"],
    ["Preferred location", "preferred_location"],
    ["Preferred date", "preferred_date"],
    ["Delivery format", "delivery_format"],
    ["General notes", "general_notes"],
  ];

  return fields
    .map(([label, key]) => `${label}: ${getFormValue(formData, key) || "Not provided"}`)
    .join("\n");
}

export default CommunityProgrammeRequestForm;
