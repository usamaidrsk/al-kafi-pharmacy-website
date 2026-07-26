"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowRight,
  Baby,
  Bandage,
  Check,
  Clock3,
  Droplets,
  HeartPulse,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  PillBottle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

const heroSlides = [
  {
    eyebrow: "Walk-in pharmacy in central Kampala",
    message:
      "Prescriptions, common medicines, family essentials, and clear guidance before you leave.",
    cta: "See categories",
    href: "#categories",
    image: "/images/alkaafi-storefront.jpeg",
    imageAlt: "Alkaafi Pharmacy storefront with green and gold signage",
  },
  {
    eyebrow: "Speak to the pharmacy team",
    message:
      "Bring your prescription and ask about dosage, timing, and safe use at the counter.",
    cta: "Consult pharmacist",
    href: "#consultation",
    image: "/images/alkaafi-interior.jpeg",
    imageAlt: "Alkaafi Pharmacy dispensing counter and consultation area",
  },
  {
    eyebrow: "Care, trust, wellness",
    message:
      "Daily pharmacy care for Nakasero, central Kampala, and nearby households.",
    cta: "View store details",
    href: "#visit",
    image: "/images/alkaafi-storefront.jpeg",
    imageAlt: "Alkaafi Pharmacy storefront entrance and medicine shelves",
  },
];

const quickLinks = [
  {
    label: "Prescription support",
    detail: "Dispensing checked and explained",
    href: "#consultation",
    icon: Stethoscope,
  },
  {
    label: "Everyday medicine shelf",
    detail: "Pain, flu, wellness, and first aid",
    href: "#categories",
    icon: PillBottle,
  },
  {
    label: "Open daily in Nakasero",
    detail: "Walk-in care for busy Kampala days",
    href: "#visit",
    icon: Clock3,
  },
];

const medicationCategories = [
  {
    title: "Prescription medicines",
    description: "Dispensed at the counter with use instructions explained clearly.",
    icon: PillBottle,
  },
  {
    title: "Pain and fever relief",
    description: "Options for headaches, body pain, fever, and inflammation support.",
    icon: HeartPulse,
  },
  {
    title: "Cough, cold and flu",
    description: "Relief products for seasonal symptoms and family medicine boxes.",
    icon: Sparkles,
  },
  {
    title: "Vitamins and supplements",
    description: "Daily wellness support for energy, recovery, and immunity routines.",
    icon: ShieldCheck,
  },
  {
    title: "Baby and hygiene care",
    description: "Baby essentials, hygiene products, and practical family care items.",
    icon: Baby,
  },
  {
    title: "First aid essentials",
    description: "Bandages, antiseptics, thermometers, masks, and wound care basics.",
    icon: Bandage,
  },
  {
    title: "Personal hygiene",
    description: "Soaps, sanitizers, oral care, feminine care, and daily basics.",
    icon: Droplets,
  },
  {
    title: "Wellness essentials",
    description: "Useful support products for immunity, recovery, and everyday wellbeing.",
    icon: PackageCheck,
  },
];

const services = [
  {
    title: "Dispensing counter",
    body: "Bring a prescription and get the medicine instructions explained clearly.",
  },
  {
    title: "Over-the-counter guidance",
    body: "Ask about common symptoms, suitable products, and safe medicine use.",
  },
  {
    title: "Family wellness shelves",
    body: "Find practical essentials for parents, children, students, and home care.",
  },
  {
    title: "Health product checks",
    body: "Call ahead or visit to ask whether key medicines and essentials are available.",
  },
];

const consultationSteps = [
  "Bring your prescription or describe the health concern.",
  "Ask about dosage, timing, side effects, and safe use.",
  "Leave with clear instructions you can follow at home.",
];

const trustPoints = [
  {
    title: "Serving Kampala households",
    body: "Useful for clinic follow-ups, work commutes, school runs, and evening pickups.",
  },
  {
    title: "Walk-in care in Nakasero",
    body: "Customers can ask direct questions and get practical guidance at the counter.",
  },
  {
    title: "Advice from a neighborhood pharmacy",
    body: "The shelves focus on prescriptions, OTC care, wellness, hygiene, and first aid.",
  },
  {
    title: "Open for busy city schedules",
    body: "Phone, email, location, and hours stay visible for quick visit planning.",
  },
];

const newsItems = [
  {
    label: "Health Tip",
    title: "What to ask before leaving the dispensing counter",
    summary:
      "Confirm dosage, timing, food instructions, side effects, and medicines to avoid mixing.",
  },
  {
    label: "Store Update",
    title: "Everyday essentials for a home medicine box",
    summary:
      "Pain relief, fever support, first aid basics, rehydration salts, and hygiene items are useful starts.",
  },
  {
    label: "Community Note",
    title: "Why walk-in pharmacist guidance still matters",
    summary:
      "A short conversation can reduce medicine confusion and support safer use at home.",
  },
];

const visitDetails = [
  {
    label: "Location",
    value: "Creates, Nakasero, Central Division, Kampala",
    icon: MapPin,
  },
  {
    label: "Phone",
    value: "+256 790 836 377",
    href: "tel:+256790836377",
    icon: Phone,
  },
  {
    label: "Email",
    value: "feedback@alkaafipharmacy.com",
    href: "mailto:feedback@alkaafipharmacy.com",
    icon: Mail,
  },
  {
    label: "Opening hours",
    value: "Mon-Sat: 8:00 AM - 8:30 PM. Sun: 9:00 AM - 5:00 PM.",
    icon: Clock3,
  },
];

const revealUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerChildren = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail("");
  };

  return (
    <div className="overflow-hidden">
      <section
        id="home"
        className="relative isolate min-h-[calc(100svh-9rem)] overflow-hidden bg-[#012e20] px-5 py-12 text-white md:px-6 md:py-16"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.image}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 -z-20"
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(1,46,32,0.68)_0%,rgba(1,46,32,0.46)_42%,rgba(1,46,32,0.14)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(1,46,32,0.46)_0%,rgba(1,46,32,0.08)_58%,rgba(1,46,32,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(0deg,#faf5ef_0%,rgba(250,245,239,0)_100%)]" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerChildren}
          className="mx-auto flex min-h-[34rem] max-w-7xl flex-col justify-center"
        >
          <motion.p
            variants={revealUp}
            className="brand-motto text-xs font-black text-[#d5a94e]"
          >
            Care • Trust • Wellness
          </motion.p>
          <motion.h1
            variants={revealUp}
            className="brand-display mt-5 max-w-4xl text-4xl leading-tight text-[#faf5ef] drop-shadow-[0_4px_18px_rgba(1,46,32,0.5)] [letter-spacing:0.08em] sm:text-5xl md:text-7xl md:[letter-spacing:0.14em]"
          >
            Alkaafi Pharmacy
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-3xl"
            >
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d5a94e]">
                {slide.eyebrow}
              </p>
              <p className="mt-4 text-2xl font-semibold leading-snug text-[#faf5ef] drop-shadow-[0_3px_14px_rgba(1,46,32,0.48)] md:text-4xl">
                {slide.message}
              </p>
              <Link
                href={slide.href}
                className="mt-7 inline-flex items-center rounded-full bg-[#d5a94e] px-6 py-3.5 text-sm font-black text-[#012e20] transition hover:bg-[#f0c76b]"
              >
                {slide.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </AnimatePresence>

          <motion.div
            variants={revealUp}
            className="mt-9 flex flex-wrap items-center gap-3"
            aria-label="Hero slides"
          >
            {heroSlides.map((item, index) => (
              <button
                key={item.eyebrow}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition ${
                  activeSlide === index
                    ? "w-12 bg-[#d5a94e]"
                    : "w-2.5 bg-white/45 hover:bg-white"
                }`}
                aria-label={`Show slide ${index + 1}: ${item.eyebrow}`}
                aria-pressed={activeSlide === index}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-10 -mt-10 px-5 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerChildren}
          className="mx-auto grid max-w-7xl gap-3 md:grid-cols-3"
        >
          {quickLinks.map(({ label, detail, href, icon: Icon }) => (
            <motion.div
              variants={revealUp}
              key={label}
              className="rounded-2xl border border-[#012e20]/10 bg-white p-5 shadow-[0_20px_50px_rgba(1,46,32,0.08)]"
            >
              <Link href={href} className="group flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#012e20] text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-base font-black text-[#012e20]">
                    {label}
                  </span>
                  <span className="mt-1 block text-sm leading-5 text-slate-600">
                    {detail}
                  </span>
                </span>
                <ArrowRight className="ml-auto mt-1 h-4 w-4 text-[#d5a94e] transition group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="categories" className="px-5 py-14 md:px-6 md:py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
          className="mx-auto max-w-7xl"
        >
          <motion.div
            variants={revealUp}
            className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <span className="section-kicker">Medicine categories</span>
              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                Clear shelves for everyday medicine needs.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-slate-600">
              Browse the main areas customers ask for most before visiting the
              pharmacy in Nakasero.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {medicationCategories.map(({ title, description, icon: Icon }) => (
              <motion.article
                key={title}
                variants={revealUp}
                className="group rounded-2xl border border-[#012e20]/10 bg-white p-6 shadow-[0_18px_46px_rgba(1,46,32,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_64px_rgba(1,46,32,0.1)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1e5c9] text-[#012e20] transition group-hover:bg-[#d5a94e]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-black leading-tight text-slate-950">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section id="services" className="bg-[#012e20] px-5 py-14 text-white md:px-6 md:py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
          className="mx-auto max-w-7xl"
        >
          <motion.div variants={revealUp} className="max-w-3xl">
            <span className="section-kicker border-white/10 bg-white/10 text-white">
              In-store services
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
              Practical help at the counter and on the shelf.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((item) => (
              <motion.article
                key={item.title}
                variants={revealUp}
                className="bg-[#012e20] p-6"
              >
                <Check className="h-5 w-5 text-[#d5a94e]" />
                <h3 className="mt-5 text-xl font-black leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#faf5ef]/70">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section id="consultation" className="bg-[#faf5ef] px-5 py-14 md:px-6 md:py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
          className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
        >
          <motion.div variants={revealUp}>
            <span className="section-kicker">Pharmacist consultation</span>
            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              Ask before you leave the pharmacy.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-700 md:text-lg">
              Some medicines need a quick explanation. Bring your prescription
              or question, and the team will help with dosage, timing, side
              effects, and safe use.
            </p>
            <div className="mt-7 space-y-3">
              {consultationSteps.map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold text-slate-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#012e20] text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-6">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="tel:+256790836377"
              className="mt-8 inline-flex items-center rounded-full bg-[#012e20] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#10492e]"
            >
              Call before visiting
              <Phone className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div variants={revealUp} className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/alkaafi-interior.jpeg"
              alt="Alkaafi Pharmacy interior with consultation room, prescriptions shelf, and wellness section"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </section>

      <section id="trust" className="px-5 py-14 md:px-6 md:py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
          className="mx-auto max-w-7xl"
        >
          <motion.div
            variants={revealUp}
            className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end"
          >
            <div>
              <span className="section-kicker">Uganda market focus</span>
              <h2 className="mt-5 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                Built around real Kampala routines.
              </h2>
            </div>
            <p className="text-base leading-8 text-slate-700 md:text-lg">
              Alkaafi is positioned for people stopping after clinic visits,
              during work commutes, after school runs, or on quick evening
              errands.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          >
            {trustPoints.map((item) => (
              <motion.article
                variants={revealUp}
                key={item.title}
                className="rounded-2xl border border-[#012e20]/10 bg-white p-6 shadow-[0_18px_46px_rgba(1,46,32,0.06)]"
              >
                <ShieldCheck className="h-6 w-6 text-[#d5a94e]" />
                <h3 className="mt-5 text-xl font-black leading-tight text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section id="news" className="bg-white px-5 py-14 md:px-6 md:py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
          className="mx-auto max-w-7xl"
        >
          <motion.div
            variants={revealUp}
            className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <span className="section-kicker">Latest from the pharmacy</span>
              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                Useful notes for medicine safety and daily care.
              </h2>
            </div>
            <Link
              href="#visit"
              className="inline-flex items-center text-sm font-black text-[#012e20] transition hover:text-[#10492e]"
            >
              Ask the pharmacy team
              <ArrowRight className="ml-2 h-4 w-4 text-[#d5a94e]" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            className="mt-10 grid gap-5 md:grid-cols-3"
          >
            {newsItems.map((item) => (
              <motion.article
                variants={revealUp}
                key={item.title}
                className="rounded-2xl border border-[#012e20]/10 bg-[#faf5ef] p-6"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d5a94e]">
                  {item.label}
                </p>
                <h3 className="mt-4 text-xl font-black leading-tight text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.summary}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-[#012e20] px-5 py-14 text-white md:px-6 md:py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerChildren}
          className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center"
        >
          <motion.div variants={revealUp}>
            <p className="brand-motto text-xs font-black text-[#d5a94e]">
              Pharmacy updates
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              Get short health tips and store notices.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#faf5ef]/70">
              Subscribe for medicine safety reminders, useful wellness notes,
              and updates from the Nakasero store.
            </p>
          </motion.div>

          <motion.form
            variants={revealUp}
            onSubmit={handleNewsletterSubmit}
            className="rounded-3xl border border-white/10 bg-white/[0.07] p-4"
          >
            <label
              htmlFor="home-newsletter-email"
              className="text-xs font-black uppercase tracking-[0.18em] text-[#d5a94e]"
            >
              Subscribe for more
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="home-newsletter-email"
                type="email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="Email address"
                aria-describedby="home-newsletter-status"
                className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-white px-4 text-sm font-semibold text-[#012e20] outline-none transition placeholder:text-slate-400 focus:border-[#d5a94e] focus:ring-4 focus:ring-[#d5a94e]/20"
              />
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#d5a94e] px-5 text-sm font-black text-[#012e20] transition hover:bg-[#f0c76b]"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <p
              id="home-newsletter-status"
              aria-live="polite"
              className="mt-3 text-xs leading-5 text-[#faf5ef]/62"
            >
              {newsletterSubmitted
                ? "Thank you. Newsletter capture will be connected before launch."
                : "Health tips, medicine safety reminders, and pharmacy notices for Kampala customers."}
            </p>
          </motion.form>
        </motion.div>
      </section>

      <section id="visit" className="px-5 py-14 md:px-6 md:py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
          className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <motion.div variants={revealUp}>
            <span className="section-kicker">Visit Alkaafi</span>
            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              Plan a quick visit to the pharmacy.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-700">
              Find the phone number, email, Nakasero location, and opening
              hours before you leave home or work.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            className="grid gap-4 sm:grid-cols-2"
          >
            {visitDetails.map(({ label, value, href, icon: Icon }) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#012e20] text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.16em] text-[#012e20]/58">
                      {label}
                    </span>
                    <span className="mt-2 block text-sm font-bold leading-6 text-slate-800">
                      {value}
                    </span>
                  </span>
                </>
              );

              return (
                <motion.div
                  key={label}
                  variants={revealUp}
                  className="rounded-2xl border border-[#012e20]/10 bg-white p-5 shadow-[0_18px_46px_rgba(1,46,32,0.06)]"
                >
                  {href ? (
                    <Link href={href} className="flex gap-4">
                      {content}
                    </Link>
                  ) : (
                    <div className="flex gap-4">{content}</div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
