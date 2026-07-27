import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Al Kaafi Pharmacy, a central Kampala pharmacy focused on care, trust, wellness, and practical in-store support.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <StaticPageShell
      eyebrow="About"
      title={`${business.displayName} is built for practical everyday care.`}
      description="The pharmacy is positioned around the real needs of Kampala customers: clinic follow-ups, household medicine boxes, workday errands, and respectful guidance at the counter."
      sections={[
        {
          title: "What we stand for",
          body: "The brand promise is care, trust, and wellness. That means simple language, careful dispensing, and a calm store experience.",
          points: [
            "Care for customers like family.",
            "Trust through clear and honest guidance.",
            "Wellness support for everyday household needs.",
          ],
        },
        {
          title: "Community focus",
          body: "Al Kaafi Pharmacy serves Nakasero, central Kampala, and nearby communities with walk-in pharmacy support.",
          points: [
            "Prescription dispensing at the counter.",
            "Over-the-counter guidance for common needs.",
            "Shelves focused on family wellness, hygiene, and first aid.",
          ],
        },
      ]}
      ctaLabel="Visit details"
      ctaHref="/locations/"
    />
  );
}
