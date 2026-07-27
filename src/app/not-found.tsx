import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-5 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-emerald-900/10 bg-white p-8 text-center shadow-[0_24px_60px_rgba(18,49,38,0.08)] md:p-12">
        <span className="section-kicker">Page not available</span>
        <h1 className="mt-5 text-4xl font-black text-slate-950 md:text-5xl">
          We could not find that Al Kaafi Pharmacy page.
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-600">
          Return to the homepage for medicine categories, pharmacist support,
          contact details, and opening hours.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#012e20] px-6 py-3 text-sm font-black text-white transition hover:bg-[#10492e]"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
