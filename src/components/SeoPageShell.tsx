import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type SeoPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  outcomes?: string[];
  sections?: Array<{ title: string; body: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

const SeoPageShell = ({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  outcomes = [],
  sections = [],
  ctaLabel = "Consult pharmacist",
  ctaHref = "/#consultation",
  secondaryCtaLabel = "Back to homepage",
  secondaryCtaHref = "/",
}: SeoPageShellProps) => {
  return (
    <main className="bg-[#f4f1e9] text-slate-950 dark:bg-[#070d17] dark:text-white">
      <section className="relative overflow-hidden px-5 pb-16 pt-16 md:px-6 md:pb-24 md:pt-24">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:72px_72px] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_0.75fr]">
          <div>
            <span className="inline-flex rounded-full border border-slate-300/80 bg-white/65 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-teal-700 backdrop-blur dark:border-white/10 dark:bg-white/[0.05] dark:text-teal-200">
              {eyebrow}
            </span>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] md:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300 md:text-xl">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={ctaHref}
                className="group inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-black text-white transition hover:bg-teal-700 dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
              >
                {ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/40 px-7 py-3.5 text-sm font-black text-slate-800 transition hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
              >
                {secondaryCtaLabel}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-teal-400/20 via-transparent to-orange-300/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#111a29] shadow-[0_35px_100px_rgba(15,23,42,0.28)] dark:border-white/10">
              <Image
                src={image}
                alt={imageAlt}
                width={1440}
                height={900}
                priority
                className="aspect-[1.35] w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {(outcomes.length > 0 || sections.length > 0) && (
        <section className="bg-white px-5 py-16 dark:bg-[#0a111d] md:px-6 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.65fr_1.1fr]">
            {outcomes.length > 0 && (
              <aside className="rounded-[2rem] border border-slate-200 bg-[#fafaf8] p-6 dark:border-white/10 dark:bg-[#0d1725]">
                <h2 className="text-2xl font-black">
                  What customers can expect
                </h2>
                <div className="mt-6 space-y-4">
                  {outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600 dark:text-teal-300" />
                      <p className="text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            )}

            <div className="space-y-5">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-[2rem] border border-slate-200 bg-[#fafaf8] p-6 dark:border-white/10 dark:bg-[#0d1725]"
                >
                  <h2 className="text-2xl font-black">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default SeoPageShell;
