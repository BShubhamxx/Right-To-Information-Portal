"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { determineJurisdiction } from "@/lib/intelligence";
import { useI18n } from "@/lib/i18n";

export function RTINavigator({ initialQuestion = "How much was spent on Indian Railways station redevelopment?" }: { initialQuestion?: string }) {
  const { t } = useI18n();
  const [question, setQuestion] = useState(initialQuestion);
  const [checked, setChecked] = useState(true);
  const result = useMemo(() => determineJurisdiction(question), [question]);

  function submit(event: FormEvent) {
    event.preventDefault();
    setChecked(true);
  }

  return (
    <div className="mt-6">
      <form onSubmit={submit} className="service-panel p-5">
        <label htmlFor="navigator-question" className="block text-sm font-bold text-[#123B52]">{t("navigator.label")}</label>
        <textarea id="navigator-question" value={question} onChange={(event) => { setQuestion(event.target.value); setChecked(false); }} rows={4} className="field mt-2" />
        <button className="mt-4 min-h-11 rounded bg-moss px-5 text-sm font-bold text-white">{t("navigator.button")}</button>
      </form>

      {checked && (
        <section className="service-panel mt-5 border-l-4 border-[#075985] p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-[#075985]">{t("navigator.found")}</p>
          <h2 className="mt-2 text-xl font-bold text-[#123B52]">{result.jurisdiction === "Central Government" ? t("navigator.central") : result.routeLabel}</h2>
          <dl className="mt-5 grid gap-4 border-y border-slate-200 py-4 sm:grid-cols-2">
            <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-600">{t("navigator.likelyJurisdiction")}</dt><dd className="mt-1 font-semibold text-[#123B52]">{result.jurisdiction}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-600">{t("navigator.suggestedAuthority")}</dt><dd className="mt-1 font-semibold text-[#123B52]">{result.authority.name}</dd></div>
          </dl>
          <p className="mt-4 text-sm leading-6 text-slate-700"><strong>{t("navigator.why")}</strong> {result.explanation}</p>
          <p className="mt-3 text-xs text-slate-600">{result.disclaimer}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/decompose?question=${encodeURIComponent(question)}`} className="rounded bg-moss px-4 py-2 text-sm font-bold text-white">{t("navigator.reviewParts")}</Link>
            <Link href="/authorities" className="px-4 py-2 text-sm font-bold text-[#075985] underline underline-offset-4">{t("navigator.searchAuthorities")}</Link>
          </div>
        </section>
      )}
    </div>
  );
}
