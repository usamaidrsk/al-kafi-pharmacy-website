import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Final website terms for Al Kaafi Pharmacy Limited, including Ugandan law, public form limits, complaints, privacy, and website use.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <StaticPageShell
      eyebrow="Terms of Use"
      title="Terms for using the Al Kaafi Pharmacy website."
      description={`These terms govern use of the public website operated for ${business.legalName}. By using the website, you agree to use it lawfully and only for the purposes described here.`}
      sections={[
        {
          title: "Website operator",
          body: `${business.legalName} is the website operator. The public-facing brand name is ${business.displayName}. Contact ${business.email} or ${business.phoneDisplay} for website questions.`,
        },
        {
          title: "Permitted use",
          body: "You may use this website to read general pharmacy information, view product categories, check contact details, submit low-risk enquiries, request general pharmacist guidance, subscribe to updates, and access legal notices.",
        },
        {
          title: "Medical and emergency limits",
          body: "This website is not an emergency service and does not provide diagnosis, treatment plans, or urgent medical advice. If you need urgent medical help, contact local emergency care immediately.",
        },
        {
          title: "Public form limits",
          body: "Public forms are for low-risk communication only. Do not submit prescription files, diagnoses, laboratory reports, patient IDs, insurance details, payment-card information, or other sensitive patient records through public forms.",
        },
        {
          title: "Product information",
          body: "Product categories and health notes are informational. They do not guarantee availability, price, suitability, legal supply, or clinical appropriateness of a specific medicine or product.",
        },
        {
          title: "Responsible use",
          body: "You must not submit false information, misuse public forms, attempt to bypass security, interfere with site operations, upload harmful content, impersonate another person, or use the website for unlawful activity.",
        },
        {
          title: "Privacy and communications",
          body: "Personal data submitted through the website is handled under the Privacy Notice. Newsletter subscriptions require consent and may be stopped by contacting the pharmacy.",
        },
        {
          title: "Complaints",
          body: "Formal complaints may be submitted through the Complaints Procedure. Include enough detail for review, but do not send sensitive patient records through public email or forms.",
        },
        {
          title: "Intellectual property",
          body: "Website text, images, layouts, logos, and other content belong to Al Kaafi Pharmacy or their respective rights holders unless stated otherwise. You may not copy or reuse them in a misleading or unlawful way.",
        },
        {
          title: "Third-party services",
          body: "The website may rely on third-party services for hosting, security, bot protection, email handling, analytics, and infrastructure. External links are provided for convenience and may have separate terms.",
        },
        {
          title: "Governing law",
          body: "These terms are governed by the laws of Uganda. Any dispute should first be raised through the complaints process, then handled by the competent courts, regulators, or authorities in Uganda where applicable.",
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
