import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Al Kaafi Pharmacy services include prescription dispensing, over-the-counter guidance, product checks, and family wellness support.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <StaticPageShell
      eyebrow="Services"
      title="In-store pharmacy support without unnecessary complexity."
      description="This phase keeps services practical and store-led. Customers can walk in, ask questions, and leave with clear guidance for medicine use and everyday health products."
      sections={[
        {
          title: "Prescription dispensing",
          body: "Bring a prescription to the counter and ask the pharmacy team to explain dosage, timing, storage, and safe use.",
        },
        {
          title: "Over-the-counter guidance",
          body: "Ask about common pharmacy categories such as pain relief, cough and flu support, first aid, hygiene, and wellness essentials.",
        },
        {
          title: "Product availability checks",
          body: "Customers can call or submit a low-risk enquiry before visiting to ask whether common medicines or essentials are available.",
        },
        {
          title: "Family wellness support",
          body: "The store is arranged around practical household needs, including baby care, personal hygiene, first aid, and daily wellness products.",
        },
      ]}
      ctaLabel="Request guidance"
      ctaHref="/consultation/"
    />
  );
}
