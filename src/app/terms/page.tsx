import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for the Al Kaafi Pharmacy website, including limits on medical advice, emergencies, public forms, and product information.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <StaticPageShell
      eyebrow="Terms of Use"
      title="Website terms for safe, practical pharmacy information."
      description="These terms apply to use of the Al Kaafi Pharmacy public website, including store information, health notes, public forms, and newsletter signup."
      sections={[
        {
          title: "Website purpose",
          body: "This website introduces Al Kaafi Pharmacy, store services, product categories, location information, health notes, and low-risk enquiry channels.",
        },
        {
          title: "No emergency service",
          body: "This website is not an emergency service. If you need urgent medical help, contact local emergency care immediately.",
        },
        {
          title: "No diagnosis or treatment plan",
          body: "Health information on this website is general education only. It does not replace assessment by a qualified health professional who understands your situation.",
        },
        {
          title: "Public form limits",
          body: "Do not submit prescriptions, diagnoses, lab reports, patient IDs, insurance details, or payment-card information through public forms. Prescription handling belongs in a separate secure workflow.",
        },
        {
          title: "Product information",
          body: "Product categories are informational and do not guarantee availability, pricing, suitability, or legal ability to supply a specific medicine.",
        },
        {
          title: "Responsible use",
          body: "Do not misuse the website, submit false information, attempt to bypass security, upload harmful content, or interfere with Cloudflare or site operations.",
        },
        {
          title: "External services",
          body: "The website may rely on services such as Cloudflare for hosting, security, analytics, and bot protection. External links are provided for convenience and may have separate terms.",
        },
        {
          title: "Contact",
          body: `For website questions, contact ${business.legalName} at ${business.email} or ${business.phoneDisplay}. Last updated: 27 July 2026.`,
        },
      ]}
      ctaLabel="Privacy notice"
      ctaHref="/privacy/"
    />
  );
}
