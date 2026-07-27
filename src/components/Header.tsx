"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Brand from "./Brand";
import { business } from "@/data/business";

const navGroups = [
  {
    label: "About",
    activeIds: ["visit"],
    items: [
      {
        label: "About Al Kaafi",
        href: "/about/",
        description: "Local pharmacy care for central Kampala routines.",
      },
      {
        label: "Locations",
        href: "/locations/",
        description: "Phone, email, location, and confirmed access details.",
      },
      {
        label: "Complaints procedure",
        href: "/complaints/",
        description: "How to raise a service, privacy, or website concern.",
      },
      {
        label: "Careers",
        href: "/careers/",
        description: "Future pharmacy and customer-care opportunities.",
      },
    ],
  },
  {
    label: "Services",
    activeIds: ["categories", "services", "consultation"],
    items: [
      {
        label: "Medicine categories",
        href: "/shop/",
        description: "Prescriptions, OTC care, wellness, hygiene, and first aid.",
      },
      {
        label: "Pharmacy care",
        href: "/services/",
        description: "Consultation, dispensing, reviews, adherence and safety support.",
      },
      {
        label: "Prescription Support",
        href: "/prescription-support/",
        description: "How prescription files are handled outside public forms.",
      },
    ],
  },
  {
    label: "News",
    activeIds: ["news"],
    items: [
      {
        label: "Health tips",
        href: "/health-hub/",
        description: "Short notes on medicine safety and home care.",
      },
      {
        label: "Store updates",
        href: "/health-hub/",
        description: "Useful notices from the Nakasero pharmacy.",
      },
    ],
  },
  {
    label: "Impact",
    activeIds: ["trust"],
    items: [
      {
        label: "Uganda market focus",
        href: "/about/",
        description: "Built around Kampala pharmacy and household-care needs.",
      },
      {
        label: "Accessibility",
        href: "/accessibility/",
        description: "Practical support for families and daily city schedules.",
      },
    ],
  },
];

const navSectionIds = Array.from(
  new Set(navGroups.flatMap((group) => group.activeIds))
);

const searchItems = [
  { label: "Pharmacy Care & Medicine Support", href: "/services/", type: "Service" },
  { label: "Prescription dispensing", href: "/services/", type: "Service" },
  { label: "Medication counselling and review", href: "/services/", type: "Service" },
  { label: "Medication adherence support", href: "/services/", type: "Service" },
  { label: "Medicine information service", href: "/services/", type: "Service" },
  { label: "Medicine safety and side-effect support", href: "/services/", type: "Service" },
  { label: "Community health education", href: "/services/", type: "Service" },
  { label: "Pain and fever relief", href: "/shop/", type: "Category" },
  { label: "Cough, cold and flu", href: "/shop/", type: "Category" },
  { label: "Vitamins and supplements", href: "/shop/", type: "Category" },
  { label: "Baby care and hygiene", href: "/shop/", type: "Category" },
  { label: "First aid essentials", href: "/shop/", type: "Category" },
  { label: "Personal hygiene", href: "/shop/", type: "Category" },
  { label: "Wellness essentials", href: "/shop/", type: "Category" },
  { label: "Pharmacist consultation", href: "/consultation/", type: "Service" },
  { label: "Ask about dosage and safe use", href: "/consultation/", type: "Service" },
  { label: "Uganda market focus", href: "/about/", type: "Section" },
  { label: "Store status and contact", href: "/contact/", type: "Visit" },
  { label: "Nakasero location", href: "/locations/", type: "Visit" },
  { label: "Health tips and pharmacy news", href: "/health-hub/", type: "News" },
  { label: "Complaints procedure", href: "/complaints/", type: "Support" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery
    ? searchItems.filter((item) =>
        item.label.toLowerCase().includes(normalizedQuery)
      )
    : searchItems.slice(0, 5);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", ...navSectionIds]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (current?.target.id) {
          setActiveSection(current.target.id);
        }
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0.05, 0.2, 0.45] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const openSearch = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(true);
  };

  const searchButton = (
    <button
      type="button"
      onClick={openSearch}
      className="flex h-11 w-full items-center gap-3 rounded-full border border-[#012e20]/10 bg-white px-4 text-left text-sm font-medium text-[#012e20]/55 transition hover:border-[#d5a94e] hover:text-[#012e20] hover:shadow-[0_10px_28px_rgba(1,46,32,0.08)]"
      aria-label="Open site search"
    >
      <Search className="h-4 w-4 text-[#012e20]/45" />
      <span className="truncate">Search medicines, services, store info</span>
    </button>
  );

  return (
    <header
      data-scrolled={isScrolled}
      className={`site-header sticky top-0 z-50 border-b transition duration-300 ${
        isScrolled
          ? "border-[#012e20]/10 bg-[#faf5ef]/95 shadow-[0_16px_50px_rgba(1,46,32,0.08)] backdrop-blur-xl"
          : "border-[#012e20]/[0.06] bg-[#faf5ef]/90 backdrop-blur-md"
      }`}
    >
      <div className="border-b border-[#012e20]/10 bg-[#012e20] text-[#faf5ef]">
        <div className="mx-auto flex min-h-10 max-w-7xl flex-col gap-2 px-5 py-2 text-xs font-semibold md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-2 transition hover:text-[#d5a94e]"
            >
              <Phone className="h-3.5 w-3.5 text-[#d5a94e]" />
              {business.phoneDisplay}
            </a>
            <a
              href={`mailto:${business.email}`}
              className="inline-flex items-center gap-2 transition hover:text-[#d5a94e]"
            >
              <Mail className="h-3.5 w-3.5 text-[#d5a94e]" />
              {business.email}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#faf5ef]/82">
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-3.5 w-3.5 text-[#d5a94e]" />
              {business.shortHours}
            </span>
            <Link
              href="/#visit"
              className="inline-flex items-center gap-2 transition hover:text-[#d5a94e]"
            >
              <MapPin className="h-3.5 w-3.5 text-[#d5a94e]" />
              Nakasero, Central Division
              <span className="font-black text-[#d5a94e]">Find us</span>
            </Link>
          </div>
        </div>
      </div>

      <nav className="mx-auto grid max-w-7xl grid-cols-[auto_auto] items-center gap-4 px-5 py-3 md:px-6 lg:grid-cols-[auto_1fr_auto]">
        <Brand />

        <div className="relative hidden max-w-xl justify-self-center lg:block">
          {searchButton}
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
            {navGroups.map((group) => (
              <div key={group.label} className="group/nav relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-bold transition ${
                    group.activeIds.includes(activeSection)
                      ? "bg-white text-[#012e20] shadow-[0_10px_28px_rgba(1,46,32,0.08)]"
                      : "text-slate-950 hover:bg-white hover:text-[#012e20]"
                  }`}
                >
                  {group.label}
                  <ChevronDown className="h-4 w-4 text-[#a63b2f] transition group-hover/nav:translate-y-0.5" />
                </button>

                <div className="pointer-events-none absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition duration-200 group-hover/nav:pointer-events-auto group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:pointer-events-auto group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100">
                  <div
                    role="menu"
                    aria-label={`${group.label} menu`}
                    className="overflow-hidden rounded-2xl border border-[#012e20]/10 bg-white p-2 shadow-[0_28px_70px_rgba(1,46,32,0.16)]"
                  >
                    {group.items.map((item) => (
                      <Link
                        key={`${group.label}-${item.label}`}
                        href={item.href}
                        role="menuitem"
                        className="block rounded-xl px-4 py-3 transition hover:bg-[#faf5ef] focus:bg-[#faf5ef]"
                      >
                        <span className="block text-sm font-black text-[#012e20]">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/consultation/"
            className="hidden rounded-full bg-[#012e20] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#10492e] sm:inline-flex"
          >
            Consult pharmacist
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#012e20]/10 bg-white text-slate-700 transition hover:border-[#d5a94e] hover:text-[#012e20] xl:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[#012e20]/10 bg-[#faf5ef] xl:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-3 px-5 py-4">
              <div className="relative lg:hidden">{searchButton}</div>
              <div className="grid gap-3">
                {navGroups.map((group) => (
                  <div
                    key={group.label}
                    className="rounded-2xl border border-[#012e20]/10 bg-white/60 p-2"
                  >
                    <p className="px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#a63b2f]">
                      {group.label}
                    </p>
                    <div className="grid gap-1">
                      {group.items.map((item) => (
                        <Link
                          key={`${group.label}-${item.label}`}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-white"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/consultation/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl bg-[#012e20] px-4 py-3 text-center text-sm font-bold text-white"
              >
                Consult pharmacist
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#012e20]/55 px-5 py-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-search-title"
          >
            <button
              type="button"
              className="absolute inset-0 h-full w-full cursor-default"
              onClick={closeSearch}
              aria-label="Close search"
            />
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative mx-auto mt-16 max-w-2xl overflow-hidden rounded-3xl border border-[#012e20]/10 bg-white shadow-[0_36px_100px_rgba(1,46,32,0.24)]"
            >
              <h2 id="site-search-title" className="sr-only">
                Search {business.displayName}
              </h2>
              <div className="flex items-center gap-3 border-b border-[#012e20]/10 px-5 py-4">
                <Search className="h-5 w-5 text-[#012e20]/55" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  autoFocus
                  placeholder="Search medicines, services, news, contact"
                  className="min-h-11 flex-1 bg-transparent text-base font-semibold text-[#012e20] outline-none placeholder:text-[#012e20]/38"
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#faf5ef] text-[#012e20] transition hover:bg-[#f1e5c9]"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-3">
                {results.length > 0 ? (
                  results.map((item) => (
                    <Link
                      key={`${item.type}-${item.label}`}
                      href={item.href}
                      onClick={closeSearch}
                      className="flex items-center justify-between gap-4 rounded-2xl px-4 py-4 text-sm font-semibold text-slate-800 transition hover:bg-[#faf5ef]"
                    >
                      <span>{item.label}</span>
                      <span className="shrink-0 rounded-full bg-[#f1e5c9] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#012e20]">
                        {item.type}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="px-4 py-8 text-sm text-slate-500">
                    No match yet. Try prescriptions, fever, baby care, hygiene,
                    consultation, news, or opening status.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
