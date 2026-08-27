"use client";

import Link from "next/link";
import { QuestionStarter } from "@/components/question-starter";
import { SiteHeader } from "@/components/site-header";
import { useI18n, type TranslationKey } from "@/lib/i18n";

const services = [
  ["nav.file", "Start a new information request to a Central Government public authority.", "/build", "File an RTI"],
  ["nav.track", "Check the status, response or next steps for an existing application.", "/track", "Track application"],
  ["nav.firstAppeal", "Appeal if a response is delayed or does not fully address your request.", "/appeal", "Start First Appeal"],
] as const;

export default function Home() {
  const { t, locale } = useI18n();
  const serviceDescriptions = locale === "hi"
    ? ["केंद्रीय सरकारी लोक प्राधिकरण को नया जानकारी अनुरोध भेजें।", "मौजूदा आवेदन की स्थिति, उत्तर या अगला कदम देखें।", "उत्तर देर से मिले या अधूरा हो तो अपील करें।"]
    : services.map((service) => service[1]);
  const serviceActions = locale === "hi" ? ["RTI आवेदन करें", "आवेदन ट्रैक करें", "प्रथम अपील शुरू करें"] : services.map((service) => service[3]);

  return (
    <main className="min-h-screen bg-canvas">
      <SiteHeader />

      <section className="border-b border-slate-300 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,.85fr)] lg:items-start lg:px-6 lg:py-12">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-[#075985]">{t("home.eyebrow")}</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#123B52] sm:text-5xl">{t("home.title")}</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">{t("home.intro")}</p>
            </div>

            <div className="max-w-4xl">
              <QuestionStarter />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link href="/track" className="font-semibold text-[#075985] underline underline-offset-4">{t("home.trackExisting")}</Link>
              <span className="text-slate-500">{t("common.or")}</span>
              <Link href="/before-you-file" className="font-semibold text-[#075985] underline underline-offset-4">{t("home.readBefore")}</Link>
            </div>
          </div>

          <aside className="service-panel p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#075985]">{t("home.asideEyebrow")}</p>
            <h2 className="mt-2 text-xl font-bold text-[#123B52]">{t("home.asideTitle")}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">{t("home.asideBody")}</p>
            <dl className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-sm">
              <div className="flex items-start justify-between gap-4"><dt className="text-slate-600">{t("home.scopeLabel")}</dt><dd className="text-right font-semibold text-[#123B52]">{t("home.scopeValue")}</dd></div>
              <div className="flex items-start justify-between gap-4"><dt className="text-slate-600">{t("home.feeLabel")}</dt><dd className="text-right font-semibold text-[#123B52]">{t("home.feeValue")}</dd></div>
              <div className="flex items-start justify-between gap-4"><dt className="text-slate-600">{t("home.limitLabel")}</dt><dd className="text-right font-semibold text-[#123B52]">{t("home.limitValue")}</dd></div>
              <div className="flex items-start justify-between gap-4"><dt className="text-slate-600">{t("home.appealLabel")}</dt><dd className="text-right font-semibold text-[#123B52]">{t("home.appealValue")}</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-9 lg:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-[#123B52]">{t("home.services")}</h2>
          <p className="text-sm text-slate-600">{t("home.servicesIntro")}</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {services.map(([title, , href], index) => (
            <article className="service-panel flex h-full flex-col p-5" key={title}>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#123B52]">{t(title as TranslationKey)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{serviceDescriptions[index]}</p>
              </div>
              <Link href={href} className="mt-5 inline-flex items-center text-sm font-bold text-[#075985] underline underline-offset-4">{serviceActions[index]} →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-300 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,.85fr)] lg:items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#123B52]">{t("home.beforeTitle")}</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
                <li>{t("home.before1")}</li>
                <li>{t("home.before2")}</li>
                <li>{t("home.before3")}</li>
                <li>{t("home.before4")}</li>
                <li>{t("home.before5")}</li>
              </ul>
            </div>
            <div className="service-panel border-l-4 border-[#C65D11] bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#075985]">{t("home.helpEyebrow")}</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{t("home.helpBody")}</p>
              <Link href="/before-you-file" className="mt-4 inline-block text-sm font-bold text-[#075985] underline underline-offset-4">{t("home.readBefore")} →</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#123B52] text-sm text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
          <div><p className="font-bold">RTI Online</p><p className="mt-2 text-xs leading-5 text-white/75">{t("brand.tagline")}</p></div>
          <div><p className="font-bold">{t("home.footerLinks")}</p><Link className="mt-2 block text-xs text-white/80 underline" href="/authorities">{t("nav.authorities")}</Link><Link className="mt-2 block text-xs text-white/80 underline" href="/faq">{t("nav.faq")}</Link></div>
          <div><p className="font-bold">{t("nav.help")}</p><Link className="mt-2 block text-xs text-white/80 underline" href="/help">{locale === "hi" ? "RTI कैसे काम करता है" : "How RTI works"}</Link><Link className="mt-2 block text-xs text-white/80 underline" href="/contact">{t("nav.contact")}</Link></div>
          <div><p className="font-bold">{t("home.footerPrototype")}</p><p className="mt-2 text-xs leading-5 text-white/75">{locale === "hi" ? "स्वतंत्र हैकाथॉन प्रोटोटाइप • आधिकारिक सरकारी सेवा नहीं" : "Independent hackathon prototype • Not an official government service"}</p></div>
        </div>
      </footer>
    </main>
  );
}
