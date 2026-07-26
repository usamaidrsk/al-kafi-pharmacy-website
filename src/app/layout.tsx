import React from "react";
import { Metadata, Viewport } from "next";
import "./globals.css";
import { MainComponent } from "@/components/MainComponent";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://al-kafi-pharmacy-website.web.app";
const siteName = "Alkaafi Pharmacy";
const siteDescription =
  "Alkaafi Pharmacy supports central Kampala with prescription dispensing, everyday medicines, family essentials, and practical pharmacist guidance.";
const defaultOgImage = "/alkaafi-logo.jpeg";
const pharmacyPhone = "+256790836377";
const pharmacyEmail = "feedback@alkaafipharmacy.com";
const pharmacyAddress = {
  "@type": "PostalAddress",
  streetAddress: "Creates",
  addressLocality: "Nakasero, Kampala",
  addressRegion: "Central Division",
  addressCountry: "UG",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alkaafi Pharmacy | Prescriptions, Wellness and Family Care in Kampala",
    template: "%s | Alkaafi Pharmacy",
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "Pharmacy",
  keywords: [
    "Alkaafi Pharmacy",
    "Uganda pharmacy",
    "Kampala pharmacy",
    "community pharmacy",
    "prescription dispensing",
    "over-the-counter health products",
    "family wellness",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: "/",
    siteName,
    title: "Alkaafi Pharmacy | Prescriptions, Wellness and Family Care in Kampala",
    description: siteDescription,
    images: [
      {
        url: defaultOgImage,
        width: 640,
        height: 640,
        alt: "Alkaafi Pharmacy logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alkaafi Pharmacy | Prescriptions, Wellness and Family Care in Kampala",
    description: siteDescription,
    images: [defaultOgImage],
  },
  icons: {
    shortcut: "/favicon.ico",
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Alkaafi Pharmacy",
  },
  other: {
    "msapplication-TileColor": "#012e20",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#012e20",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/alkaafi-logo.jpeg`,
  description: siteDescription,
  telephone: pharmacyPhone,
  email: pharmacyEmail,
  address: pharmacyAddress,
  areaServed: ["Nakasero", "Kampala"],
  availableService: [
    "Prescription dispensing",
    "Over-the-counter medicines",
    "Family wellness essentials",
    "First aid and hygiene products",
    "In-store pharmacist guidance",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "17:00",
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  publisher: {
    "@type": "Organization",
    name: siteName,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <Header />
        <MainComponent>{children}</MainComponent>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
      </body>
    </html>
  );
}
