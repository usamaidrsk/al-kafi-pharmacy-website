import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";

export const metadata: Metadata = {
  title: "Shop and Product Catalogue",
  description:
    "Browse the main product categories customers can ask about at Al Kaafi Pharmacy in Nakasero, Kampala.",
  alternates: { canonical: "/shop/" },
};

export default function ShopPage() {
  return (
    <StaticPageShell
      eyebrow="Product catalogue"
      title="A simple category guide before the full catalogue is ready."
      description="This is not an online checkout or medicine ordering system. It helps customers understand the main product areas available in store."
      sections={[
        {
          title: "Medicine categories",
          body: "Prescription medicines, pain and fever relief, cough and flu support, vitamins, and selected wellness essentials.",
        },
        {
          title: "Family care",
          body: "Baby care, personal hygiene, oral care, feminine care, and everyday household health products.",
        },
        {
          title: "First aid basics",
          body: "Bandages, antiseptics, thermometers, masks, and small emergency essentials for homes and workplaces.",
        },
        {
          title: "Availability",
          body: "Stock can change. Call the store or use the contact form for a low-risk product availability enquiry before visiting.",
        },
      ]}
      ctaLabel="Ask about availability"
      ctaHref="/contact/"
    />
  );
}
