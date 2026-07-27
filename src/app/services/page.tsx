import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import {
  emergencyMedicineWarning,
  pharmacyCareServices,
} from "@/data/pharmacy-care-services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Al Kaafi Pharmacy services include pharmacist consultation, prescription dispensing, medication counselling, adherence support, medicine information, medicine safety support, and community health education.",
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
              Pharmacy Care & Medicine Support
            </h1>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-base leading-8 text-slate-700 md:text-lg">
              Pharmacist-led support for medicine use, prescription dispensing,
              medication review, adherence, safety concerns and community
              health education.
            </p>
            <Link
              href="/consultation/"
              className="mt-7 inline-flex w-fit items-center rounded-full bg-[#012e20] px-6 py-3 text-sm font-black text-white transition hover:bg-[#10492e]"
            >
              Consult a pharmacist
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
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

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pharmacyCareServices.map(({ title, description, icon: Icon, cta, href }) => (
            <article
              key={title}
              className="group flex min-h-full flex-col rounded-[1.5rem] border border-[#012e20]/10 bg-white p-6 shadow-[0_18px_46px_rgba(1,46,32,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_64px_rgba(1,46,32,0.1)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1e5c9] text-[#012e20] transition group-hover:bg-[#d5a94e]">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-black leading-tight text-slate-950">
                {title}
              </h2>
              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                {description}
              </p>
              <Link
                href={href}
                className="mt-6 inline-flex w-fit items-center rounded-full bg-[#012e20] px-5 py-3 text-sm font-black text-white transition hover:bg-[#10492e]"
              >
                {cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
