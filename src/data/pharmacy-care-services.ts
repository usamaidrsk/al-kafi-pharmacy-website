import {
  Accessibility,
  Activity,
  Apple,
  Baby,
  Bandage,
  BookOpenCheck,
  CalendarCheck,
  CigaretteOff,
  ClipboardCheck,
  Dumbbell,
  HeartHandshake,
  MessagesSquare,
  PillBottle,
  Presentation,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Syringe,
  Tablets,
  UserRoundCheck,
  Wind,
  type LucideIcon,
} from "lucide-react";

export type PharmacyServiceCard = {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  details?: string[];
  detailsLabel?: string;
};

export type PharmacyServiceGroup = {
  id: string;
  eyebrow: string;
  title: string;
  introduction: string;
  cards: PharmacyServiceCard[];
};

export type PharmacyCareService = PharmacyServiceCard;

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
    href: "/community-programmes/",
  },
];

export const preventiveLifestyleServices: PharmacyServiceCard[] = [
  {
    title: "Health Monitoring",
    description:
      "Blood-pressure, blood-glucose and BMI checks using suitable equipment, with explanation of results and referral when indicated.",
    icon: Activity,
    cta: "View health checks",
    href: "/services/#preventive-lifestyle-support",
  },
  {
    title: "Preventive Health & Risk Guidance",
    description:
      "Personalised guidance on healthy living, medicine safety and modifiable health risks, with referral for clinical assessment when required.",
    icon: ShieldCheck,
    cta: "Explore preventive care",
    href: "/services/#preventive-lifestyle-support",
    detailsLabel: "This may cover",
    details: [
      "General risk-factor discussion",
      "Healthy-weight guidance",
      "Sleep and physical-activity education",
      "Medicine-safety checks",
      "Preventive-health reminders",
      "Referral to a clinic or physician",
    ],
  },
  {
    title: "Smoking Cessation Support",
    description:
      "Confidential, structured support to plan a quit attempt, select appropriate aids and maintain progress through follow-up.",
    icon: CigaretteOff,
    cta: "Start a quit plan",
    href: "/consultation/",
  },
  {
    title: "Alcohol-Use Support & Referral",
    description:
      "Confidential brief screening, harm-reduction guidance and referral to appropriate medical, mental-health or recovery services.",
    icon: HeartHandshake,
    cta: "Request confidential support",
    href: "/consultation/",
  },
  {
    title: "Vaccination & Immunisation Support",
    description:
      "Reliable vaccine information, eligibility screening, counselling and referral to appropriate authorised vaccination services.",
    icon: Syringe,
    cta: "Ask about vaccines",
    href: "/contact/",
  },
  {
    title: "Nutrition & Supplement Guidance",
    description:
      "Responsible guidance on nutrition, vitamins, sports supplements and hydration, considering individual goals, medicines and potential interactions.",
    icon: Apple,
    cta: "Request supplement guidance",
    href: "/consultation/",
  },
];

export const productEverydayHealthServices: PharmacyServiceCard[] = [
  {
    title: "OTC & Self-Care",
    description:
      "Pharmacist-guided non-prescription products for common minor health needs, with clear advice on safe use and when to seek care.",
    icon: Tablets,
    cta: "Explore OTC care",
    href: "/shop/",
  },
  {
    title: "Cough, Cold & Allergy Care",
    description:
      "Non-prescription symptom-relief options and pharmacist guidance for common cough, cold and allergy concerns, with referral for warning signs.",
    icon: Wind,
    cta: "Explore respiratory care",
    href: "/shop/",
  },
  {
    title: "Vitamins & Nutritional Supplements",
    description:
      "Vitamins, minerals and nutritional supplements from traceable suppliers, with responsible guidance on suitability and use.",
    icon: PillBottle,
    cta: "Explore supplements",
    href: "/shop/",
  },
  {
    title: "Mother & Baby Care",
    description:
      "Maternal wellness, baby care, feeding, hygiene and family-health essentials, with age-appropriate product guidance.",
    icon: Baby,
    cta: "Explore mother and baby care",
    href: "/shop/",
  },
  {
    title: "First Aid & Wound Care",
    description:
      "Dressings, antiseptics, thermometers and home first-aid supplies, with guidance on basic use and when professional care is needed.",
    icon: Bandage,
    cta: "Explore first-aid products",
    href: "/shop/",
  },
  {
    title: "Personal Care & Hygiene",
    description:
      "Oral care, skin care, feminine care, sanitising and everyday hygiene products for individual and family needs.",
    icon: Sparkles,
    cta: "Explore personal care",
    href: "/shop/",
  },
  {
    title: "Medical Devices, Mobility & Recovery",
    description:
      "Home-monitoring devices, braces, supports, mobility aids and recovery accessories, with product-use guidance and referral for clinical fitting when needed.",
    icon: Accessibility,
    cta: "Explore devices and mobility",
    href: "/shop/",
    detailsLabel: "Subcategories",
    details: [
      "Blood-pressure monitors",
      "Glucometers",
      "Thermometers",
      "Nebulisers",
      "Pulse oximeters",
      "Weighing scales",
      "Walking sticks and crutches",
      "Braces and supports",
      "Compression products",
      "Hot and cold packs",
      "Basic recovery accessories",
    ],
  },
  {
    title: "Sports Nutrition & Active Living",
    description:
      "Protein, hydration and active-lifestyle products, with responsible guidance on suitability, safe use and realistic expectations.",
    icon: Dumbbell,
    cta: "Explore active-living products",
    href: "/shop/",
  },
];

export const pharmacyServiceGroups: PharmacyServiceGroup[] = [
  {
    id: "pharmacy-care-medicine-support",
    eyebrow: "Pharmacy care",
    title: "Pharmacy Care & Medicine Support",
    introduction:
      "Pharmacist-led support for safe medicine use, prescription dispensing, medication review, adherence, safety concerns and community education.",
    cards: pharmacyCareServices,
  },
  {
    id: "preventive-lifestyle-support",
    eyebrow: "Preventive care",
    title: "Preventive & Lifestyle Support",
    introduction:
      "Practical services that help customers monitor key health measures, understand risk factors and access appropriate care.",
    cards: preventiveLifestyleServices,
  },
  {
    id: "products-devices-everyday-health",
    eyebrow: "Products and devices",
    title: "Products, Devices & Everyday Health",
    introduction:
      "Selected medicines, wellness products, personal-care essentials and home-health equipment sourced through authorised and traceable supply channels.",
    cards: productEverydayHealthServices,
  },
];

export const serviceAvailabilityNotice =
  "Service availability may vary. Professional pharmacy services are provided within the pharmacy's licensed scope by appropriately qualified personnel. Screening and counselling services do not replace medical diagnosis or emergency care. Prescription medicines require appropriate pharmacist review and a valid prescription where legally required.";

export const emergencyMedicineWarning =
  "Severe breathing difficulty, facial swelling, collapse, seizures or other emergencies require immediate emergency medical care.";
