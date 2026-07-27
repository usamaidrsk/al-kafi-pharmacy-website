import React from "react";
import { Metadata, Viewport } from "next";
import "./globals.css";
import { MainComponent } from "@/components/MainComponent";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { business } from "@/data/business";

const siteUrl = business.siteUrl;
const siteName = business.displayName;
const siteDescription =
  "Al Kaafi Pharmacy supports central Kampala with prescription support, everyday medicine categories, family essentials, and practical pharmacist guidance.";
const defaultOgImage = "/images/og-default-1200x630.jpg";
const pharmacyPhone = business.phoneE164;
const pharmacyEmail = business.email;
const pharmacyAddress = {
  "@type": "PostalAddress",
  streetAddress: "Creates",
  addressLocality: business.addressLocality,
  addressRegion: business.addressRegion,
  addressCountry: business.countryCode,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Al Kaafi Pharmacy | Prescription Support, Wellness and Family Care in Kampala",
    template: "%s | Al Kaafi Pharmacy",
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "Pharmacy",
  keywords: [
    "Al Kaafi Pharmacy",
    "AL KAAFI PHARMACY",
    "Uganda pharmacy",
    "Kampala pharmacy",
    "community pharmacy",
    "prescription support",
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
    title: "Al Kaafi Pharmacy | Prescription Support, Wellness and Family Care in Kampala",
    description: siteDescription,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Al Kaafi Pharmacy storefront",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Kaafi Pharmacy | Prescription Support, Wellness and Family Care in Kampala",
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
    title: "Al Kaafi Pharmacy",
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
  legalName: business.legalName,
  url: siteUrl,
  logo: `${siteUrl}/alkaafi-logo.jpeg`,
  description: siteDescription,
  telephone: pharmacyPhone,
  email: pharmacyEmail,
  address: pharmacyAddress,
  areaServed: ["Nakasero", "Kampala"],
  availableService: [
    "Pharmacist consultation",
    "Prescription dispensing",
    "Medication counselling and review",
    "Medication adherence support",
    "Medicine information service",
    "Medicine safety and side-effect support",
    "Community health education",
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
