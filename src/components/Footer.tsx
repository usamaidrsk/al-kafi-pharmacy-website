"use client";

import { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Brand from "./Brand";
import { business } from "@/data/business";

const footerLinks = {
  categories: [
    { label: "Prescription medicines", href: "/shop/" },
    { label: "Pain and fever relief", href: "/shop/" },
    { label: "Cold and flu care", href: "/shop/" },
    { label: "Baby and hygiene", href: "/shop/" },
    { label: "First aid essentials", href: "/shop/" },
    { label: "Personal hygiene", href: "/shop/" },
    { label: "Wellness essentials", href: "/shop/" },
  ],
  services: [
    { label: "Dispensing counter", href: "/services/" },
    { label: "Pharmacist consultation", href: "/consultation/" },
    { label: "Product catalogue", href: "/shop/" },
    { label: "Prescription portal", href: "/prescription-portal/" },
  ],
  company: [
    { label: "About Al Kaafi", href: "/about/" },
    { label: "Health hub", href: "/health-hub/" },
    { label: "Locations", href: "/locations/" },
    { label: "Careers", href: "/careers/" },
    { label: "Contact us", href: "/contact/" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy/" },
    { label: "Terms", href: "/terms/" },
    { label: "Accessibility", href: "/accessibility/" },
  ],
  socials: [
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "WhatsApp", href: "https://wa.me/256790836377" },
  ],
};

const openingHours = [
  business.weekdayHours,
  business.sundayHours,
  business.holidayHours,
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#012e20] px-5 pb-8 pt-14 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.15fr_0.95fr] lg:items-center">
          <div>
            <Brand inverse showMotto />
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#faf5ef]/72">
              A central Kampala pharmacy for prescriptions, everyday
              medicines, family essentials, and practical pharmacist guidance.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d5a94e]">
              Subscribe for store updates
            </p>
            <p className="mt-3 text-sm leading-7 text-[#faf5ef]/64">
              Mailing-list signup will be enabled after the owner approves the
              email provider, consent wording, and retention process.
            </p>
            <Link
              href="/contact/"
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d5a94e] px-5 text-sm font-black text-[#012e20] transition hover:bg-[#f0c76b]"
            >
              Contact the pharmacy
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-9 py-10 sm:grid-cols-2 lg:grid-cols-[0.95fr_0.95fr_0.85fr_0.75fr_0.85fr_1.1fr]">
          <FooterColumn title="Medication Categories" links={footerLinks.categories} />
          <FooterColumn title="Pharmacy Services" links={footerLinks.services} />
          <FooterColumn title="Al Kaafi" links={footerLinks.company} />
          <FooterColumn title="Socials" links={footerLinks.socials} />
          <FooterColumn title="Legal" links={footerLinks.legal} />

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/45">
              Contact and Hours
            </h3>
            <div className="mt-5 space-y-4 text-sm text-[#faf5ef]/72">
              <ContactLine href={business.phoneHref} icon={Phone}>
                {business.phoneDisplay}
              </ContactLine>
              <ContactLine href={`mailto:${business.email}`} icon={Mail}>
                {business.email}
              </ContactLine>
              <ContactLine href="/locations/" icon={MapPin}>
                {business.address}
              </ContactLine>
            </div>

            <div className="mt-6 space-y-3">
              {openingHours.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-[#faf5ef]/72">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#d5a94e]" />
                  <span className="leading-6">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#faf5ef]/52 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {business.displayName}.</p>
          <p>This website is not an emergency service. For emergencies, contact local emergency care immediately.</p>
        </div>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div>
    <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/45">
      {title}
    </h3>
    <ul className="mt-5 space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="group inline-flex items-center gap-2 text-sm text-[#faf5ef]/72 transition hover:text-white"
          >
            <ArrowRight className="h-3.5 w-3.5 text-[#d5a94e] transition group-hover:translate-x-0.5" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

type ContactLineProps = {
  href: string;
  icon: typeof Phone;
  children: ReactNode;
};

const ContactLine = ({ href, icon: Icon, children }: ContactLineProps) => (
  <Link
    href={href}
    className="flex items-start gap-3 transition hover:text-white"
  >
    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#d5a94e]" />
    <span className="leading-6">{children}</span>
  </Link>
);

export default Footer;
