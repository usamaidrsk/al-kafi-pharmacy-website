import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Al Kaafi Pharmacy, a central Kampala pharmacy focused on care, trust, wellness, and practical store-led support.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <StaticPageShell
      eyebrow="About"
      title={`${business.displayName} is built for practical everyday care.`}
      description={`${business.legalName} is positioned around the real needs of Kampala customers: clinic follow-ups, household medicine boxes, workday errands, and respectful guidance.`}
      sections={[
        {
          title: "Company registration details",
          body: `${business.legalName} trades publicly as ${business.displayName}. The brand promise is care, trust, and wellness for customers who need reliable pharmacy support in central Kampala.`,
        },
        {
          title: "What we stand for",
          body: "The brand promise is care, trust, and wellness. That means simple language, careful guidance, and a calm store experience.",
          points: [
            "Care for customers like family.",
            "Trust through clear and honest guidance.",
            "Wellness support for everyday household needs.",
          ],
        },
        {
          title: "Community focus",
          body: "Al Kaafi Pharmacy is planned for Nakasero, central Kampala, and nearby communities with practical pharmacy support.",
          points: [
            "Prescription support without public file uploads.",
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
