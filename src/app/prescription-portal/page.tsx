import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";

export const metadata: Metadata = {
  title: "Prescription Portal",
  description:
    "Al Kaafi Pharmacy prescription portal boundary page. Public forms do not collect prescription files or patient records.",
  alternates: { canonical: "/prescription-portal/" },
};

export default function PrescriptionPortalPage() {
  return (
    <StaticPageShell
      eyebrow="Prescription portal"
      title="Prescription handling belongs in a separate secure pathway."
      description="This public website does not collect prescription images, medical reports, diagnoses, IDs, or payment-card details. A secure prescription pathway should be launched only after the pharmacy approves the process, data controls, and responsible pharmacist workflow."
      sections={[
        {
          title: "Current phase",
          body: "Prescription support is handled in store. Customers should bring prescriptions directly to the pharmacy counter for dispensing guidance.",
        },
        {
          title: "What is not collected here",
          body: "Do not upload or submit prescription files, lab reports, diagnoses, patient IDs, insurance details, or payment-card information through public forms.",
        },
        {
          title: "Future portal requirements",
          body: "A future prescription portal should be a separate application and data boundary with stronger authentication, access controls, audit logs, retention rules, and pharmacist review.",
        },
        {
          title: "Safe next step",
          body: "For now, call or visit the store if you need practical guidance before coming in.",
        },
      ]}
      ctaLabel="Call before visiting"
      ctaHref="tel:+256790836377"
    />
  );
}
