import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Thank you page for Al Kaafi Pharmacy contact and pharmacist consultation enquiries.",
  alternates: { canonical: "/thank-you/" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="bg-[#faf5ef] px-5 py-20 md:px-6 md:py-28">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#012e20]/10 bg-white p-8 text-center shadow-[0_24px_70px_rgba(1,46,32,0.08)] md:p-12">
        <span className="section-kicker">Thank you</span>
        <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-5xl">
          Your enquiry has been received.
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-700">
          The pharmacy team will review your message and respond through the
          contact details you provided. This website is not an emergency
          service, so urgent concerns should go to local emergency care.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#012e20] px-6 py-3 text-sm font-black text-white transition hover:bg-[#10492e]"
        >
          Back to homepage
        </Link>
      </section>
    </main>
  );
}
