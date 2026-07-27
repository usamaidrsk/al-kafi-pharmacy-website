import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find Al Kaafi Pharmacy contact details, opening hours, and Nakasero location information.",
  alternates: { canonical: "/locations/" },
};

export default function LocationsPage() {
  return (
    <StaticPageShell
      eyebrow="Locations"
      title="Visit the Nakasero pharmacy."
      description="Al Kaafi Pharmacy keeps contact details and opening hours visible so customers can plan a quick store visit from home, work, school, or clinic."
      sections={[
        {
          title: "Address",
          body: business.address,
          points: ["Nakasero, Central Division", "Kampala, Uganda"],
        },
        {
          title: "Contact",
          body: "Use phone or email for low-risk store enquiries and product availability checks.",
          points: [business.phoneDisplay, business.email],
        },
        {
          title: "Opening hours",
          body: "Hours may change during public holidays or special events. Call before visiting if timing is critical.",
          points: [business.weekdayHours, business.sundayHours, business.holidayHours],
        },
        {
          title: "Before visiting",
          body: "Do not send prescriptions, IDs, diagnoses, lab reports, or payment-card information through public forms.",
        },
      ]}
      ctaLabel="Contact the store"
      ctaHref="/contact/"
    />
  );
}
