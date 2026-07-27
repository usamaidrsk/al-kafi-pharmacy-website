"use client";

import Script from "next/script";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/data/business";

type NewsletterFormProps = {
  source: string;
  compact?: boolean;
  inverse?: boolean;
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

const NewsletterForm = ({
  source,
  compact = false,
  inverse = false,
}: NewsletterFormProps) => {
  const formDisabled = !turnstileSiteKey;
  const inputClass = inverse
    ? "border-white/15 bg-white/10 text-white placeholder:text-white/45 focus:border-[#d5a94e] focus:ring-[#d5a94e]/25"
    : "border-[#012e20]/15 bg-white text-slate-800 placeholder:text-slate-400 focus:border-[#d5a94e] focus:ring-[#d5a94e]/20";
  const helperClass = inverse ? "text-[#faf5ef]/68" : "text-slate-600";

  return (
    <form action="/api/newsletter" method="post" className="grid gap-4">
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      )}

      <input type="hidden" name="source" value={source} />
      <input
        type="text"
        name="company"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {!compact && (
        <label
          className={`grid gap-2 text-sm font-bold ${
            inverse ? "text-white" : "text-[#012e20]"
          }`}
        >
          Name
          <input
            name="full_name"
            type="text"
            disabled={formDisabled}
            autoComplete="name"
            className={`min-h-12 rounded-xl border px-4 text-sm outline-none transition focus:ring-4 ${inputClass}`}
          />
        </label>
      )}

      <label
        className={`grid gap-2 text-sm font-bold ${
          inverse ? "text-white" : "text-[#012e20]"
        }`}
      >
        Email address
        <input
          name="email"
          type="email"
          required
          disabled={formDisabled}
          autoComplete="email"
          placeholder="you@example.com"
          className={`min-h-12 rounded-xl border px-4 text-sm outline-none transition focus:ring-4 ${inputClass}`}
        />
      </label>

      <label
        className={`flex gap-3 rounded-2xl p-4 text-sm leading-6 ${
          inverse ? "bg-white/[0.07] text-[#faf5ef]/76" : "bg-[#faf5ef] text-slate-700"
        }`}
      >
        <input
          type="checkbox"
          name="consent"
          required
          disabled={formDisabled}
          className="mt-1 h-4 w-4 shrink-0"
        />
        <span>
          I agree to receive health tips and store updates from{" "}
          {business.displayName}. I can ask to stop receiving updates at any
          time.{" "}
          <Link
            href="/privacy/"
            className={
              inverse ? "font-black text-[#d5a94e]" : "font-black text-[#012e20]"
            }
          >
            Privacy Notice
          </Link>
        </span>
      </label>

      {turnstileSiteKey ? (
        <div
          className="cf-turnstile"
          data-sitekey={turnstileSiteKey}
          data-action="newsletter"
          data-cdata={`al-kaafi-newsletter-${source}`}
          data-theme={inverse ? "dark" : "light"}
        />
      ) : (
        <p className="rounded-2xl border border-[#d5a94e]/30 bg-[#fff8e8] p-4 text-sm leading-6 text-[#6c5319]">
          Newsletter signup needs `NEXT_PUBLIC_TURNSTILE_SITE_KEY` at build time
          and `TURNSTILE_SECRET_KEY` on the Worker.
        </p>
      )}

      <button
        type="submit"
        disabled={formDisabled}
        className="inline-flex min-h-12 w-fit items-center justify-center rounded-2xl bg-[#d5a94e] px-5 text-sm font-black text-[#012e20] transition hover:bg-[#f0c76b] disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-white"
      >
        Subscribe
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>

      <p className={`text-xs leading-5 ${helperClass}`}>
        We send practical pharmacy notes, store notices, and medicine-safety
        reminders. We do not sell mailing-list data.
      </p>
    </form>
  );
};

export default NewsletterForm;
