"use client";

import { FormEvent, ReactNode, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Brand from "./Brand";

const footerLinks = {
  categories: [
    { label: "Prescription medicines", href: "/#categories" },
    { label: "Pain and fever relief", href: "/#categories" },
    { label: "Cold and flu care", href: "/#categories" },
    { label: "Baby and hygiene", href: "/#categories" },
    { label: "First aid essentials", href: "/#categories" },
    { label: "Personal hygiene", href: "/#categories" },
    { label: "Wellness essentials", href: "/#categories" },
  ],
  services: [
    { label: "Dispensing counter", href: "/#services" },
    { label: "Pharmacist consultation", href: "/#consultation" },
    { label: "Family wellness shelf", href: "/#categories" },
    { label: "Store hours", href: "/#visit" },
  ],
  company: [
    { label: "About Alkaafi", href: "/#trust" },
    { label: "Health tips", href: "/#news" },
    { label: "Visit the store", href: "/#visit" },
    { label: "Contact us", href: "/#visit" },
  ],
  socials: [
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "WhatsApp", href: "https://wa.me/256790836377" },
  ],
};

const openingHours = [
  "Monday - Saturday: 8:00 AM - 8:30 PM",
  "Sunday: 9:00 AM - 5:00 PM",
  "Public holidays: 10:00 AM - 3:00 PM",
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setIsSubmitted(true);
    setEmail("");
  };

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

          <form
            onSubmit={handleNewsletterSubmit}
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
          >
            <label
              htmlFor="newsletter-email"
              className="text-xs font-black uppercase tracking-[0.18em] text-[#d5a94e]"
            >
              Subscribe for store updates
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                aria-describedby="footer-newsletter-status"
                className="min-h-12 flex-1 rounded-xl border border-white/10 bg-white px-4 text-sm font-semibold text-[#012e20] outline-none transition placeholder:text-slate-400 focus:border-[#d5a94e] focus:ring-4 focus:ring-[#d5a94e]/20"
              />
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d5a94e] px-5 text-sm font-black text-[#012e20] transition hover:bg-[#f0c76b]"
              >
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </button>
            </div>
            <p
              id="footer-newsletter-status"
              aria-live="polite"
              className="mt-3 text-xs leading-5 text-[#faf5ef]/58"
            >
              {isSubmitted
                ? "Thank you. Newsletter capture will be connected before launch."
                : "Health tips, product reminders, and store notices for Kampala customers."}
            </p>
          </form>
        </div>

        <div className="grid gap-9 py-10 sm:grid-cols-2 lg:grid-cols-[0.95fr_0.95fr_0.85fr_0.75fr_1.1fr]">
          <FooterColumn title="Medication Categories" links={footerLinks.categories} />
          <FooterColumn title="Pharmacy Services" links={footerLinks.services} />
          <FooterColumn title="Alkaafi" links={footerLinks.company} />
          <FooterColumn title="Socials" links={footerLinks.socials} />

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/45">
              Contact and Hours
            </h3>
            <div className="mt-5 space-y-4 text-sm text-[#faf5ef]/72">
              <ContactLine href="tel:+256790836377" icon={Phone}>
                +256 790 836 377
              </ContactLine>
              <ContactLine href="mailto:feedback@alkaafipharmacy.com" icon={Mail}>
                feedback@alkaafipharmacy.com
              </ContactLine>
              <ContactLine href="/#visit" icon={MapPin}>
                Creates, Nakasero, Central Division, Kampala
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
          <p>© {new Date().getFullYear()} Alkaafi Pharmacy.</p>
          <p>Care, trust, wellness, and clear in-store pharmacy support.</p>
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
