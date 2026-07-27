import Script from "next/script";
import Link from "next/link";
import { business } from "@/data/business";

type EnquiryFormPageProps = {
  type: "contact" | "consultation";
};

const topicOptions = {
  contact: [
    "Store enquiry",
    "Product availability",
    "Opening hours",
    "Feedback",
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
        </section>

        <form
          action={content.action}
          method="post"
          className="rounded-[2rem] border border-[#012e20]/10 bg-white p-6 shadow-[0_24px_70px_rgba(1,46,32,0.08)] md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full name" name="full_name" required disabled={formDisabled} />
            <Field label="Email address" name="email" type="email" required disabled={formDisabled} />
            <Field label="Phone number" name="phone" type="tel" disabled={formDisabled} />
            <label className="grid gap-2 text-sm font-bold text-[#012e20]">
              Topic
              <select
                name="topic"
                required
                disabled={formDisabled}
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
              disabled={formDisabled}
              className="min-h-12 rounded-xl border border-[#012e20]/15 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#d5a94e] focus:ring-4 focus:ring-[#d5a94e]/20"
            >
              <option value="">Select one</option>
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
              disabled={formDisabled}
              placeholder="Keep this general. Do not include prescriptions, diagnoses, IDs, lab reports, or payment-card details."
              className="rounded-xl border border-[#012e20]/15 bg-white px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d5a94e] focus:ring-4 focus:ring-[#d5a94e]/20"
            />
          </label>

          <label className="mt-5 flex gap-3 rounded-2xl bg-[#faf5ef] p-4 text-sm leading-6 text-slate-700">
            <input
              type="checkbox"
              name="consent"
              required
              disabled={formDisabled}
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
            disabled={formDisabled}
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#012e20] px-7 text-sm font-black text-white transition hover:bg-[#10492e] disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {content.submit}
          </button>
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
};

const Field = ({
  label,
  name,
  type = "text",
  required = false,
  disabled = false,
}: FieldProps) => (
  <label className="grid gap-2 text-sm font-bold text-[#012e20]">
    {label}
    <input
      name={name}
      type={type}
      required={required}
      disabled={disabled}
      className="min-h-12 rounded-xl border border-[#012e20]/15 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#d5a94e] focus:ring-4 focus:ring-[#d5a94e]/20"
    />
  </label>
);

export default EnquiryFormPage;
