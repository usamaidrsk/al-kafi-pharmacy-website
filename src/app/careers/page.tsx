import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Career information for future pharmacy, customer-care, and operations opportunities at Al Kaafi Pharmacy.",
  alternates: { canonical: "/careers/" },
};

export default function CareersPage() {
  return (
    <StaticPageShell
      eyebrow="Careers"
      title="Future opportunities at Al Kaafi Pharmacy."
      description="The pharmacy is not advertising open roles on this first public launch. This page gives a professional place for future hiring updates without publishing fake vacancies."
      sections={[
        {
          title: "Current status",
          body: "There are no public vacancies listed on the website at this time.",
        },
        {
          title: "Future roles",
          body: "Future opportunities may include pharmacy support, customer care, operations, inventory, or administrative roles.",
        },
        {
          title: "How to enquire",
          body: "Use the contact page for general career enquiries only. Do not send IDs, certificates, or sensitive documents through the public form.",
        },
        {
          title: "Responsible publishing",
          body: "Only owner-approved roles, requirements, and application channels should be published here.",
        },
      ]}
      ctaLabel="Contact the pharmacy"
      ctaHref="/contact/"
    />
  );
}
