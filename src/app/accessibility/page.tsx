import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPageShell";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Accessibility statement for Al Kaafi Pharmacy, including keyboard support, contrast, reduced motion, and feedback contact details.",
  alternates: { canonical: "/accessibility/" },
};

export default function AccessibilityPage() {
  return (
    <StaticPageShell
      eyebrow="Accessibility"
      title="A pharmacy website that should be usable by more customers."
      description="This statement reflects the intention to support accessible communication and inclusive access, consistent with disability-rights principles in Uganda and modern web accessibility practice."
      sections={[
        {
          title: "Our aim",
          body: "Al Kaafi Pharmacy aims to keep the website readable, keyboard-friendly, responsive, and understandable on mobile and desktop devices.",
        },
        {
          title: "Current accessibility features",
          body: "The site includes visible keyboard focus states, semantic headings, descriptive image alt text, responsive layouts, reduced-motion handling, and strong color contrast across key actions.",
        },
        {
          title: "Known limits",
          body: "The website is still in phase one. Some future systems, such as prescription workflows or analytics tools, will need separate accessibility review before launch.",
        },
        {
          title: "Feedback",
          body: `If you experience an accessibility barrier, contact ${business.email} or ${business.phoneDisplay}. Include the page, device, browser, and the issue if possible.`,
        },
        {
          title: "Ongoing checks",
          body: "Before major launches, the site should be checked for keyboard navigation, focus order, text resizing, screen-reader labels, form errors, image alternatives, and mobile layout.",
        },
        {
          title: "Last updated",
          body: "27 July 2026.",
        },
      ]}
      ctaLabel="Report an issue"
      ctaHref={`mailto:${business.email}`}
    />
  );
}
