import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Al Kaafi Pharmacy services include prescription support, over-the-counter guidance, product checks, and family wellness support.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <StaticPageShell
      eyebrow="Services"
      title="In-store pharmacy support without unnecessary complexity."
      description="This phase keeps services practical and store-led. Customers can ask low-risk questions, check categories, and prepare for safe medicine-use conversations."
      sections={[
        {
          title: "Prescription support",
          body: "Use this website for general prescription-support questions only. Do not send prescription files, patient records, or IDs through public forms.",
        },
        {
          title: "Over-the-counter guidance",
          body: "Ask about common pharmacy categories such as pain relief, cough and flu support, first aid, hygiene, and wellness essentials.",
        },
        {
          title: "Product availability checks",
          body: "Customers can call or submit a low-risk enquiry to ask about common medicine categories or everyday essentials.",
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
