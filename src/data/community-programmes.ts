import {
  Activity,
  Baby,
  HeartPulse,
  Leaf,
  PackageCheck,
  PillBottle,
  Presentation,
  ShieldCheck,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";

export type CommunityProgramme = {
  title: string;
  description: string;
  cta: string;
  icon: LucideIcon;
  audience: string;
  format: string;
  topics?: string[];
  disclaimer?: string;
  note?: string;
};

export type FeaturedCommunityProgramme = {
  title: string;
  description: string;
  cta: string;
  icon: LucideIcon;
};

export const communityProgrammeIntro =
  "Practical, pharmacist-led education designed to improve medicine safety, strengthen prevention and help individuals, families, schools and organisations make better-informed health decisions.";

export const communityProgrammeSupportLine =
  "Programmes may be delivered through pharmacy talks, workplace sessions, school outreach, community events, digital education and targeted health-awareness campaigns.";

export const communityProgrammeRegulatoryStatement =
  "Al Kaafi Pharmacy community programmes provide general health education and do not replace medical diagnosis, emergency care or individual treatment. Content is delivered within the pharmacy's authorised scope by appropriately qualified personnel. Product-specific promotions, where used, remain subject to applicable National Drug Authority requirements.";

export const communityProgrammes: CommunityProgramme[] = [
  {
    title: "Medicine Safety",
    description:
      "Practical education on using medicines correctly, preventing avoidable errors and recognising when professional help is required.",
    cta: "Book a medicine-safety session",
    icon: ShieldCheck,
    audience: "Families, caregivers and organisations",
    format: "Talks, campaigns and workshops",
    disclaimer:
      "This programme provides general education and does not replace individual clinical assessment.",
  },
  {
    title: "Responsible Antibiotic Use",
    description:
      "Education on using antibiotics only when appropriately prescribed and protecting their effectiveness for the future.",
    cta: "Request an antibiotic-awareness programme",
    icon: PillBottle,
    audience: "Schools, workplaces and community groups",
    format: "Awareness talks and targeted campaigns",
    topics: [
      "What antibiotics treat and what they do not",
      "Why antibiotics should not be used automatically for colds or viral illnesses",
      "Why diagnosis and appropriate prescribing matter",
      "Taking antibiotics exactly as directed",
      "Not sharing antibiotics",
      "Not using leftover antibiotics",
      "Avoiding pressure on health workers to provide unnecessary antibiotics",
      "Recognising adverse effects",
      "Infection prevention, hand hygiene and vaccination",
      "Why antimicrobial resistance affects individuals and communities",
      "Referral for persistent or severe symptoms",
    ],
    note:
      "Take antibiotics exactly as prescribed and contact a healthcare professional if problems arise.",
  },
  {
    title: "Diabetes Awareness",
    description:
      "Education on diabetes risk, warning signs, monitoring, medicine use and practical steps for reducing complications.",
    cta: "Book a diabetes-awareness session",
    icon: Activity,
    audience: "Adults, families, workplaces and community groups",
    format: "Education sessions and monitoring demonstrations",
    topics: [
      "Understanding blood glucose",
      "Common diabetes risk factors",
      "Possible warning signs",
      "Importance of appropriate screening",
      "Correct use of glucose meters",
      "Medicine and insulin adherence",
      "Hypoglycaemia awareness",
      "Nutrition and physical-activity principles",
      "Foot-care awareness",
      "Eye, kidney and cardiovascular follow-up",
      "Safe fasting and illness-day planning",
      "When urgent assessment is needed",
    ],
    disclaimer:
      "Screening results do not constitute a diagnosis. Abnormal results require appropriate medical assessment.",
  },
  {
    title: "Blood Pressure Awareness",
    description:
      "Practical education on blood-pressure measurement, cardiovascular risk, medicine adherence and the importance of regular follow-up.",
    cta: "Arrange a blood-pressure programme",
    icon: HeartPulse,
    audience: "Adults, caregivers, workplaces and community groups",
    format: "Talks, measurement guidance and follow-up education",
    topics: [
      "Understanding blood-pressure readings",
      "Correct home-monitoring technique",
      "Why cuff size and positioning matter",
      "Lifestyle-related risk factors",
      "Salt, tobacco, alcohol and physical activity",
      "Medicine adherence",
      "Avoiding abrupt treatment discontinuation",
      "Interaction risks involving OTC medicines and supplements",
      "Keeping a blood-pressure record",
      "Warning symptoms requiring urgent care",
      "When to see a clinician",
    ],
    disclaimer:
      "A single blood-pressure reading is not sufficient to diagnose or exclude hypertension.",
  },
  {
    title: "Maternal & Newborn Health",
    description:
      "Responsible education supporting safer medicine use, maternal wellbeing and appropriate referral throughout pregnancy and the postnatal period.",
    cta: "Request a maternal-health programme",
    icon: Baby,
    audience: "Expectant mothers, new parents and caregivers",
    format: "Education talks and referral-focused guidance",
    topics: [
      "Safe medicine use during pregnancy",
      "Avoiding unsupervised herbal and supplement use",
      "Importance of antenatal and postnatal care",
      "Iron, folate and nutrition education within approved guidance",
      "Managing common minor symptoms safely",
      "Breastfeeding and medicine-use questions",
      "Postnatal maternal wellbeing",
      "Newborn medicine safety",
      "Contraception and birth-spacing information through appropriate referral",
      "Warning signs requiring urgent assessment",
      "Referral to maternity and paediatric services",
    ],
    note: "Education, medicine guidance and referral support.",
  },
  {
    title: "Healthy Ageing",
    description:
      "Education supporting safer medicine use, independence, functional wellbeing and coordinated care in later life.",
    cta: "Arrange a healthy ageing session",
    icon: UserRoundCheck,
    audience: "Older adults, families and caregivers",
    format: "Community talks and caregiver education",
    topics: [
      "Medication review and polypharmacy awareness",
      "Adherence and refill planning",
      "Fall-risk awareness",
      "Mobility and home-safety considerations",
      "Nutrition and hydration",
      "Blood-pressure and glucose monitoring",
      "Vision and hearing referral",
      "Sleep and cognitive-health awareness",
      "Vaccination education",
      "Caregiver medicine management",
      "Safe use of mobility and monitoring devices",
      "Advance care-planning awareness through appropriate referral",
    ],
  },
  {
    title: "School Health & Medicine Safety",
    description:
      "Age-appropriate health education supporting safer medicine use, hygiene, prevention and timely referral for pupils, staff and families.",
    cta: "Partner with us for school health",
    icon: Presentation,
    audience: "Schools, pupils, staff and families",
    format: "School outreach, staff guidance and awareness days",
    topics: [
      "Safe medicine use and storage",
      "Never sharing medicines",
      "Avoiding substance and medicine misuse",
      "First-aid awareness",
      "Hand hygiene and infection prevention",
      "Oral-health education",
      "Menstrual-health and hygiene education",
      "Nutrition and hydration",
      "Tobacco and vaping prevention",
      "Antibiotic-awareness education",
      "Recognising health emergencies",
      "Safe school medicine policies",
      "Staff guidance for pupils requiring regular medicines",
      "Referral pathways for health concerns",
    ],
  },
  {
    title: "Safe Medicine Storage",
    description:
      "Practical guidance for storing, organising and disposing of medicines safely at home, school and work.",
    cta: "Book a medicine-storage session",
    icon: PackageCheck,
    audience: "Families, schools, workplaces and caregivers",
    format: "Practical talks, checklists and workshops",
    topics: [
      "Following the storage instructions on the label",
      "Keeping medicines in original labelled containers",
      "Protecting medicines from heat, moisture and direct light",
      "Refrigerating only when specifically instructed",
      "Keeping medicines away from children and unauthorised access",
      "Separating human and veterinary medicines",
      "Avoiding storage in vehicles, bathrooms or cooking areas",
      "Monitoring expiry dates",
      "Avoiding tablet mixing in unidentified containers",
      "Safe organisation for multiple family members",
      "Transporting temperature-sensitive medicines",
      "Handling damaged, recalled, expired or unwanted medicines",
      "Returning unsuitable medicines through an authorised disposal route",
    ],
    note:
      "Contact the pharmacy for guidance on the appropriate disposal route.",
  },
  {
    title: "Responsible Supplement Use",
    description:
      "Balanced education on choosing, using and evaluating vitamins, herbal products and sports supplements safely.",
    cta: "Request a supplement-safety session",
    icon: Leaf,
    audience: "Individuals, parents, athletes and wellness groups",
    format: "Talks, product-literacy sessions and campaigns",
    topics: [
      "Difference between food, supplements and medicines",
      "Understanding labels and ingredient quantities",
      "Evidence versus marketing claims",
      "Avoiding unnecessary duplication",
      "Medicine-supplement interactions",
      "Supplement use in pregnancy and breastfeeding",
      "Supplement use in children and older people",
      "Risks involving liver, kidney and cardiovascular conditions",
      "Sports-product quality and stimulant risks",
      "Avoiding unverified weight-loss, sexual-enhancement and detox products",
      "Recognising adverse effects",
      "Traceable sourcing and regulatory status",
      "Reporting suspicious products",
      "When professional assessment is required",
    ],
  },
];

export const featuredCommunityProgrammes: FeaturedCommunityProgramme[] = [
  {
    title: "Medicine Safety",
    description: "Safer medicine use for individuals, families and caregivers.",
    cta: "Explore programme",
    icon: ShieldCheck,
  },
  {
    title: "Diabetes & Blood Pressure Awareness",
    description:
      "Screening education, monitoring guidance and appropriate referral.",
    cta: "Explore programme",
    icon: HeartPulse,
  },
  {
    title: "School & Community Health",
    description:
      "Structured education programmes for schools, workplaces and community organisations.",
    cta: "Explore programme",
    icon: Presentation,
  },
];
