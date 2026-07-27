import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";

export const metadata: Metadata = {
  title: "Health Hub",
  description:
    "Health tips and pharmacy notes from Al Kaafi Pharmacy for safe medicine use and everyday family wellness.",
  alternates: { canonical: "/health-hub/" },
};

export default function HealthHubPage() {
  return (
    <StaticPageShell
      eyebrow="Health hub"
      title="Short pharmacy notes for safer everyday care."
      description="These notes are general education only. They do not replace advice from a qualified health professional who understands a customer's specific situation."
      sections={[
        {
          title: "Before leaving the counter",
          body: "Confirm dosage, timing, food instructions, side effects to watch for, and medicines that should not be mixed.",
        },
        {
          title: "Home medicine box",
          body: "Useful basics include pain and fever support, first aid supplies, oral rehydration salts, hygiene items, and a thermometer.",
        },
        {
          title: "When to seek urgent care",
          body: "Severe symptoms, breathing difficulty, chest pain, serious allergic reactions, heavy bleeding, or confusion need urgent medical care.",
        },
        {
          title: "Medicine safety",
          body: "Keep medicines in original packaging, follow expiry dates, avoid sharing prescription medicines, and ask before combining products.",
        },
      ]}
      ctaLabel="Ask the pharmacy team"
      ctaHref="/consultation/"
    />
  );
}
