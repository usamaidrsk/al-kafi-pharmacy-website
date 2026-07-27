import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";

export const metadata: Metadata = {
  title: "Prescription Support",
  description:
    "Al Kaafi Pharmacy prescription support boundary page. Public forms do not collect prescription files or patient records.",
  alternates: { canonical: "/prescription-support/" },
};

export default function PrescriptionPortalPage() {
  return (
    <StaticPageShell
      eyebrow="Prescription Support"
      title="Prescription questions need a safer route than public forms."
      description="This public website does not collect prescription images, medical reports, diagnoses, IDs, or payment-card details. Prescription files require a separate secure pathway with stronger access controls, retention rules, and pharmacist review."
      sections={[
        {
          title: "Current website boundary",
          body: "Use this site only for general prescription-support questions, visit planning, and low-risk product enquiries. Do not upload or paste private medical information into public forms.",
        },
        {
          title: "What is not collected here",
          body: "Do not upload or submit prescription files, lab reports, diagnoses, patient IDs, insurance details, or payment-card information through public forms.",
        },
        {
          title: "Secure workflow requirement",
          body: "Any future prescription-support system should be separate from the public website and include stronger authentication, access controls, audit logs, retention rules, and pharmacist review.",
        },
        {
          title: "Safe next step",
          body: "For now, call or use the consultation form for general guidance on what to prepare before contacting or visiting the pharmacy.",
        },
      ]}
      ctaLabel="Ask a general question"
      ctaHref="/consultation/"
    />
  );
}
