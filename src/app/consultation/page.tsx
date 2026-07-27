import type { Metadata } from "next";
import EnquiryFormPage from "@/components/EnquiryFormPage";

export const metadata: Metadata = {
  title: "Pharmacist Consultation",
  description:
    "Request low-risk pharmacist guidance from Al Kaafi Pharmacy before visiting the Nakasero store.",
  alternates: { canonical: "/consultation/" },
};

export default function ConsultationPage() {
  return <EnquiryFormPage type="consultation" />;
}
