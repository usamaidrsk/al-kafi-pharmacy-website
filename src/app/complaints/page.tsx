import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";
import { business } from "@/data/business";

const complaintsHref = `mailto:${business.complaintsEmail}?subject=Formal%20Complaint%20-%20Al%20Kaafi%20Pharmacy`;

export const metadata: Metadata = {
  title: "Complaints Procedure",
  description:
    "Formal complaints procedure for Al Kaafi Pharmacy website, service, privacy, and customer-care concerns.",
  alternates: { canonical: "/complaints/" },
};

export default function ComplaintsPage() {
  return (
    <StaticPageShell
      eyebrow="Complaints"
      title="A clear route for raising concerns."
      description={`${business.legalName} accepts formal complaints about website access, customer communication, privacy handling, product information, or service experience.`}
      sections={[
        {
          title: "How to submit a complaint",
          body: `Email ${business.complaintsEmail} or call ${business.phoneDisplay}. Include your name, contact details, date of the issue, the page or service involved, a clear summary, and the outcome you are requesting.`,
        },
        {
          title: "What not to include",
          body: "Do not send prescription files, diagnoses, national IDs, payment-card details, lab reports, or other sensitive patient records through public email or website forms.",
        },
        {
          title: "Review process",
          body: "The pharmacy will record the complaint, review the concern, and respond through the contact details provided. If more information is needed, the team may ask follow-up questions before closing the matter.",
        },
        {
          title: "Escalation",
          body: "If the response does not resolve the concern, ask for management review. Privacy concerns may also be raised with Uganda’s Personal Data Protection Office. Regulated pharmacy matters may be taken to the relevant Ugandan authority.",
        },
        {
          title: "Accessibility support",
          body: "If the website or complaint process is difficult to use, contact the pharmacy by phone or email and explain the access barrier so an alternative route can be arranged.",
        },
      ]}
      ctaLabel="Make a formal complaint"
      ctaHref={complaintsHref}
    />
  );
}
