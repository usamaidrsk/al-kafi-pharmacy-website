"use client";

import { motion } from "framer-motion";
import { HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";

const supportStandards = [
  {
    title: "Counter guidance",
    body: "Customers can ask about dosage, timing, and safe medicine use before leaving.",
    icon: Stethoscope,
  },
  {
    title: "Care with privacy",
    body: "Health questions are handled calmly, respectfully, and without unnecessary attention.",
    icon: ShieldCheck,
  },
  {
    title: "Family-first support",
    body: "The store is built for prescriptions, household essentials, and daily wellness needs.",
    icon: HeartHandshake,
  },
];

const OurTeam = () => {
  return (
    <section id="team" className="w-full bg-[#faf5ef] px-5 py-14 md:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <span className="section-kicker">Pharmacy support</span>
          <h2 className="mt-5 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
            Helpful service at the counter.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            Al Kaafi keeps the service promise simple: listen first, explain
            clearly, and help customers leave with confidence.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {supportStandards.map(({ title, body, icon: Icon }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="rounded-2xl border border-[#012e20]/10 bg-white p-6 shadow-[0_18px_46px_rgba(1,46,32,0.06)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1e5c9] text-[#012e20]">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-black leading-tight text-slate-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
