import {
  BookOpenCheck,
  CalendarCheck,
  ClipboardCheck,
  MessagesSquare,
  Presentation,
  ShieldAlert,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";

export type PharmacyCareService = {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: LucideIcon;
};

export const pharmacyCareServices: PharmacyCareService[] = [
  {
    title: "Pharmacist Consultation",
    description:
      "Private pharmacist guidance on medicines, minor health concerns and appropriate next steps, including referral when medical assessment is required.",
    icon: UserRoundCheck,
    cta: "Consult a pharmacist",
    href: "/consultation/",
  },
  {
    title: "Prescription Dispensing",
    description:
      "Valid prescriptions reviewed and dispensed under pharmacist supervision, with clear directions on safe use, storage and follow-up.",
    icon: ClipboardCheck,
    cta: "Prescription support",
    href: "/prescription-support/",
  },
  {
    title: "Medication Counselling & Review",
    description:
      "Review of medicine use, dosing, interactions, duplication, side effects and practical concerns to support safer, more informed treatment.",
    icon: MessagesSquare,
    cta: "Request a medication review",
    href: "/consultation/",
  },
  {
    title: "Medication Adherence Support",
    description:
      "Practical support with medicine routines, reminders, refill planning and treatment barriers for people managing regular or long-term medicines.",
    icon: CalendarCheck,
    cta: "Get adherence support",
    href: "/consultation/",
  },
  {
    title: "Medicine Information Service",
    description:
      "Evidence-informed medicine information for patients and healthcare professionals, including use, precautions, interactions, storage and availability.",
    icon: BookOpenCheck,
    cta: "Request medicine information",
    href: "/contact/",
  },
  {
    title: "Medicine Safety & Side-Effect Support",
    description:
      "Guidance on suspected side effects, medication errors and medicine-safety concerns, with urgent referral and formal reporting where appropriate.",
    icon: ShieldAlert,
    cta: "Report a medicine concern",
    href: "/contact/",
  },
  {
    title: "Community Health Education",
    description:
      "Pharmacist-led education on safe medicine use, prevention and common health topics through talks, campaigns and community outreach.",
    icon: Presentation,
    cta: "Explore community programmes",
    href: "/health-hub/",
  },
];

export const emergencyMedicineWarning =
  "Severe breathing difficulty, facial swelling, collapse, seizures or other emergencies require immediate emergency medical care.";
