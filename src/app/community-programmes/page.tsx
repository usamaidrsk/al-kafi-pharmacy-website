import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import CommunityProgrammeRequestForm from "@/components/CommunityProgrammeRequestForm";
import {
  communityProgrammeIntro,
  communityProgrammeRegulatoryStatement,
  communityProgrammeSupportLine,
  communityProgrammes,
} from "@/data/community-programmes";

export const metadata: Metadata = {
  title: "Community Health Programmes",
  description:
    "Al Kaafi Pharmacy community health programmes provide pharmacist-led education on medicine safety, prevention, responsible antibiotic use, diabetes, blood pressure, school health and safer supplement use.",
  alternates: { canonical: "/community-programmes/" },
};

export default function CommunityProgrammesPage() {
  return (
    <main className="bg-[#faf5ef] px-5 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-8 overflow-hidden rounded-[2rem] border border-[#012e20]/10 bg-white p-6 shadow-[0_24px_70px_rgba(1,46,32,0.08)] md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="section-kicker">Community health</span>
            <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Community Health Programmes
            </h1>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-base leading-8 text-slate-700 md:text-lg">
              {communityProgrammeIntro}
            </p>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
              {communityProgrammeSupportLine}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#programme-request"
                className="inline-flex w-fit items-center rounded-full bg-[#012e20] px-6 py-3 text-sm font-black text-white transition hover:bg-[#10492e]"
              >
                Request a Community Programme
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#programme-request"
                className="inline-flex w-fit items-center rounded-full border border-[#012e20]/15 bg-white px-6 py-3 text-sm font-black text-[#012e20] transition hover:border-[#d5a94e]"
              >
                Partner with Al Kaafi
              </Link>
            </div>
          </div>
        </section>

        <section
          className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          aria-label="Community health programme cards"
        >
          {communityProgrammes.map(({ title, description, cta, icon: Icon, audience, format, topics, disclaimer, note }) => (
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

              <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-700">
                <p className="rounded-2xl bg-[#faf5ef] px-4 py-3 leading-6">
                  <span className="font-black text-[#012e20]">For: </span>
                  {audience}
                </p>
                <p className="rounded-2xl bg-[#faf5ef] px-4 py-3 leading-6">
                  <span className="font-black text-[#012e20]">Format: </span>
                  {format}
                </p>
              </div>

              {topics && (
                <details className="mt-5 rounded-2xl border border-[#012e20]/10 bg-[#faf5ef] p-4">
                  <summary className="cursor-pointer text-sm font-black text-[#012e20]">
                    Topics covered
                  </summary>
                  <div className="mt-4 space-y-3">
                    {topics.map((topic) => (
                      <div key={topic} className="flex gap-3 text-sm font-semibold text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d5a94e]" />
                        <span className="leading-6">{topic}</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}

              {note && (
                <p className="mt-5 rounded-2xl bg-[#f1e5c9] p-4 text-sm font-bold leading-6 text-[#012e20]">
                  {note}
                </p>
              )}

              {disclaimer && (
                <p className="mt-4 text-xs font-semibold leading-6 text-slate-500">
                  {disclaimer}
                </p>
              )}

              <Link
                href="#programme-request"
                className="mt-6 inline-flex w-fit items-center rounded-full bg-[#012e20] px-5 py-3 text-sm font-black text-white transition hover:bg-[#10492e]"
              >
                {cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </article>
          ))}
        </section>

        <p className="mt-6 rounded-2xl border border-[#012e20]/10 bg-white p-5 text-sm font-semibold leading-7 text-slate-700">
          {communityProgrammeRegulatoryStatement}
        </p>

        <CommunityProgrammeRequestForm />
      </div>
    </main>
  );
}
