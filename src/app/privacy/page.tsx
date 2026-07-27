import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "Privacy Notice for Al Kaafi Pharmacy, covering low-risk enquiries, data rights, retention, security, and contact details.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <StaticPageShell
      eyebrow="Privacy Notice"
      title="How Al Kaafi Pharmacy handles website enquiries."
      description="This draft notice is prepared for a low-risk public website and should be reviewed by Ugandan counsel before launch. It is based on Uganda’s Data Protection and Privacy Act, 2019, and Data Protection and Privacy Regulations, 2021."
      sections={[
        {
          title: "Data controller",
          body: `${business.legalName} is responsible for personal data collected through this website. For privacy questions, contact ${business.email} or ${business.phoneDisplay}.`,
        },
        {
          title: "What we collect",
          body: "Public forms collect only basic enquiry details: name, email, phone number, topic, preferred contact method, message, consent confirmation, limited browser metadata, and Cloudflare Turnstile verification data.",
        },
        {
          title: "What not to submit",
          body: "Do not submit prescription images, laboratory reports, diagnoses, national IDs, insurance documents, payment-card details, or other sensitive patient records through public forms.",
        },
        {
          title: "Why we use the data",
          body: "We use enquiry data to respond to store questions, product availability checks, pharmacist guidance requests, and customer feedback. We do not use public form submissions for diagnosis, emergency care, profiling, or selling personal data.",
        },
        {
          title: "Legal basis",
          body: "Processing is limited to responding to requests, preparing for customer service, complying with legal obligations, protecting the website, and handling pharmacy administration where lawful.",
        },
        {
          title: "Sharing and service providers",
          body: "Data may be processed by trusted service providers such as Cloudflare for hosting, security, bot protection, and database storage. We may also share data where required by law or competent authorities.",
        },
        {
          title: "Retention",
          body: "Low-risk website enquiries should be kept only as long as needed to respond and handle follow-up, normally no longer than six months after resolution unless a legal obligation requires longer retention.",
        },
        {
          title: "Your rights",
          body: "Under Uganda’s data protection framework, data subjects may request access, correction, blocking, erasure or destruction where applicable, object to direct marketing, and complain to the Personal Data Protection Office.",
        },
        {
          title: "Security",
          body: "We use HTTPS, Cloudflare security controls, server-side Turnstile verification, limited collection, and access controls. No public website can guarantee absolute security.",
        },
        {
          title: "Updates",
          body: "This notice may be updated as the pharmacy adds approved services, analytics, forms, or secure prescription systems. Last updated: 27 July 2026.",
        },
      ]}
      ctaLabel="Contact privacy team"
      ctaHref={`mailto:${business.email}`}
    />
  );
}
