import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  productEverydayHealthServices,
  serviceAvailabilityNotice,
} from "@/data/pharmacy-care-services";

export const metadata: Metadata = {
  title: "Products, Devices and Everyday Health",
  description:
    "Browse product categories customers can ask about at Al Kaafi Pharmacy, including OTC care, first aid, mother and baby care, personal hygiene, supplements and home-health devices.",
  alternates: { canonical: "/shop/" },
};

export default function ShopPage() {
  return (
    <main className="bg-[#faf5ef] px-5 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-8 rounded-[2rem] border border-[#012e20]/10 bg-white p-6 shadow-[0_24px_70px_rgba(1,46,32,0.08)] md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="section-kicker">Product categories</span>
            <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Products, Devices & Everyday Health
            </h1>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-base leading-8 text-slate-700 md:text-lg">
              Selected medicines, wellness products, personal-care essentials
              and home-health equipment sourced through authorised and
              traceable supply channels.
            </p>
            <Link
              href="/contact/"
              className="mt-7 inline-flex w-fit items-center rounded-full bg-[#012e20] px-6 py-3 text-sm font-black text-white transition hover:bg-[#10492e]"
            >
              Ask about availability
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {productEverydayHealthServices.map(({ title, description, icon: Icon, cta, details, detailsLabel }) => (
            <article
              key={title}
              className="group flex min-h-full flex-col rounded-[1.5rem] border border-[#012e20]/10 bg-white p-6 shadow-[0_18px_46px_rgba(1,46,32,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_64px_rgba(1,46,32,0.1)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1e5c9] text-[#012e20] transition group-hover:bg-[#d5a94e]">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl font-black leading-tight text-slate-950">
                {title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                {description}
              </p>

              {details && (
                <details className="mt-5 rounded-2xl border border-[#012e20]/10 bg-[#faf5ef] p-4">
                  <summary className="cursor-pointer text-sm font-black text-[#012e20]">
                    {detailsLabel || "Details"}
                  </summary>
                  <div className="mt-4 space-y-3">
                    {details.map((detail) => (
                      <div key={detail} className="flex gap-3 text-sm font-semibold text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d5a94e]" />
                        <span className="leading-6">{detail}</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}

              <Link
                href="/contact/"
                className="mt-6 inline-flex items-center text-sm font-black text-[#012e20] transition group-hover:text-[#10492e]"
              >
                {cta}
                <ArrowRight className="ml-2 h-4 w-4 text-[#d5a94e]" />
              </Link>
            </article>
          ))}
        </section>

        <p className="mt-6 rounded-2xl border border-[#012e20]/10 bg-white p-5 text-sm font-semibold leading-7 text-slate-700">
          {serviceAvailabilityNotice}
        </p>
      </div>
    </main>
  );
}
