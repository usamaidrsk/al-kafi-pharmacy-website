import type { Metadata } from "next";
import EnquiryFormPage from "@/components/EnquiryFormPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Al Kaafi Pharmacy for low-risk store enquiries, product availability, location information, and general feedback.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return <EnquiryFormPage type="contact" />;
}
