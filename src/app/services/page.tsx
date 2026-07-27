import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import {
  emergencyMedicineWarning,
  pharmacyServiceGroups,
  serviceAvailabilityNotice,
  type PharmacyServiceCard,
  type PharmacyServiceGroup,
} from "@/data/pharmacy-care-services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Al Kaafi Pharmacy services cover medicine support, preventive and lifestyle guidance, OTC care, home-health devices, wellness essentials and community education in Kampala.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <main className="bg-[#faf5ef] px-5 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-8 rounded-[2rem] border border-[#012e20]/10 bg-white p-6 shadow-[0_24px_70px_rgba(1,46,32,0.08)] md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="section-kicker">Services</span>
            <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Pharmacy services, preventive support and everyday health
              products.
            </h1>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-base leading-8 text-slate-700 md:text-lg">
              A practical overview of what customers can ask about at Al Kaafi
              Pharmacy: medicine use, pharmacist guidance, preventive checks,
              OTC care, home-health devices and responsible wellness support.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/consultation/"
                className="inline-flex w-fit items-center rounded-full bg-[#012e20] px-6 py-3 text-sm font-black text-white transition hover:bg-[#10492e]"
              >
                Consult a pharmacist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/community-programmes/"
                className="inline-flex w-fit items-center rounded-full border border-[#012e20]/15 bg-white px-6 py-3 text-sm font-black text-[#012e20] transition hover:border-[#d5a94e]"
              >
                Community programmes
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[1.5rem] border border-[#b42318]/20 bg-[#fff2f1] p-5 text-[#7a271a]">
          <div className="flex gap-3">
            <ShieldAlert className="mt-1 h-5 w-5 shrink-0" />
            <p className="text-sm font-bold leading-7">
              {emergencyMedicineWarning}
            </p>
          </div>
        </section>

        <div className="mt-10 space-y-16">
          {pharmacyServiceGroups.map((group) => (
            <ServiceSection key={group.id} group={group} />
          ))}
        </div>
      </div>
    </main>
  );
}

const ServiceSection = ({ group }: { group: PharmacyServiceGroup }) => (
  <section id={group.id} className="scroll-mt-36">
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <span className="section-kicker">{group.eyebrow}</span>
        <h2 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-slate-950 md:text-5xl">
          {group.title}
        </h2>
      </div>
      <p className="max-w-xl text-base leading-8 text-slate-700">
        {group.introduction}
      </p>
    </div>

    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {group.cards.map((card) => (
        <ServiceCard key={card.title} card={card} />
      ))}
    </div>

    {group.id === "products-devices-everyday-health" && (
      <p className="mt-6 rounded-2xl border border-[#012e20]/10 bg-white p-5 text-sm font-semibold leading-7 text-slate-700">
        {serviceAvailabilityNotice}
      </p>
    )}
  </section>
);

const ServiceCard = ({ card }: { card: PharmacyServiceCard }) => {
  const Icon = card.icon;

  return (
    <article className="group flex min-h-full flex-col rounded-[1.5rem] border border-[#012e20]/10 bg-white p-6 shadow-[0_18px_46px_rgba(1,46,32,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_64px_rgba(1,46,32,0.1)]">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1e5c9] text-[#012e20] transition group-hover:bg-[#d5a94e]">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-2xl font-black leading-tight text-slate-950">
        {card.title}
      </h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
        {card.description}
      </p>

      {card.details && (
        <details className="mt-5 rounded-2xl border border-[#012e20]/10 bg-[#faf5ef] p-4">
          <summary className="cursor-pointer text-sm font-black text-[#012e20]">
            {card.detailsLabel || "Details"}
          </summary>
          <div className="mt-4 space-y-3">
            {card.details.map((detail) => (
              <div key={detail} className="flex gap-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d5a94e]" />
                <span className="leading-6">{detail}</span>
              </div>
            ))}
          </div>
        </details>
      )}

      <Link
        href={card.href}
        className="mt-6 inline-flex w-fit items-center rounded-full bg-[#012e20] px-5 py-3 text-sm font-black text-white transition hover:bg-[#10492e]"
      >
        {card.cta}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </article>
  );
};
