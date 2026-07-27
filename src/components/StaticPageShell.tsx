import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type StaticPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{
    title: string;
    body: string;
    points?: string[];
  }>;
  ctaLabel?: string;
  ctaHref?: string;
};

const StaticPageShell = ({
  eyebrow,
  title,
  description,
  sections,
  ctaLabel = "Contact the pharmacy",
  ctaHref = "/contact/",
}: StaticPageShellProps) => {
  return (
    <main className="bg-[#faf5ef] px-5 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-8 rounded-[2rem] border border-[#012e20]/10 bg-white p-6 shadow-[0_24px_70px_rgba(1,46,32,0.08)] md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="section-kicker">{eyebrow}</span>
            <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              {title}
            </h1>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-base leading-8 text-slate-700 md:text-lg">
              {description}
            </p>
            <Link
              href={ctaHref}
              className="mt-7 inline-flex w-fit items-center rounded-full bg-[#012e20] px-6 py-3 text-sm font-black text-white transition hover:bg-[#10492e]"
            >
              {ctaLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.5rem] border border-[#012e20]/10 bg-white p-6 shadow-[0_18px_46px_rgba(1,46,32,0.06)]"
            >
              <h2 className="text-2xl font-black leading-tight text-slate-950">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {section.body}
              </p>
              {section.points && (
                <div className="mt-5 space-y-3">
                  {section.points.map((point) => (
                    <div key={point} className="flex gap-3 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d5a94e]" />
                      <span className="leading-6">{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default StaticPageShell;
