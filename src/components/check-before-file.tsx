"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { searchPublicInformation, type PublicInformationRecord } from "@/lib/intelligence";
import { useI18n } from "@/lib/i18n";

const fallbackRecords: PublicInformationRecord[] = [
  { title: "Road Development Expenditure - FY 2025-26", topic: "Road repair expenditure", year: "2025-26", summary: "Illustrative totals: Rs. 84.2 crore allocated, Rs. 71.6 crore spent and 143 projects completed.", content: "This fictional record provides aggregate expenditure only. Project-wise contractor details may still require an RTI request.", keywords: ["road", "repair", "pune", "expenditure", "budget", "सड़क", "मरम्मत", "पुणे", "खर्च"], demoOnly: true },
  { title: "School Infrastructure Works - FY 2025-26", topic: "School infrastructure", year: "2025-26", summary: "Illustrative list of classroom repair and accessibility works.", content: "This fictional record is provided for demonstration.", keywords: ["school", "education", "classroom", "works", "स्कूल", "विद्यालय", "शिक्षा"], demoOnly: true },
];

export function CheckBeforeFile({ records = fallbackRecords, initialQuestion }: { records?: PublicInformationRecord[]; initialQuestion?: string }) {
  const { t } = useI18n();
  const [question, setQuestion] = useState(initialQuestion || "How much money was spent on road repairs in Pune in 2025?");
  const [submitted, setSubmitted] = useState(true);
  const result = useMemo(() => searchPublicInformation(question, records), [question, records]);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  const statusText = result.state === "exact" ? t("check.exact") : result.state === "partial" ? t("check.partial") : t("check.none");

  return (
    <div className="mt-6">
      <form onSubmit={submit} className="service-panel p-5">
        <label htmlFor="check-question" className="block text-sm font-bold text-[#123B52]">{t("starter.label")}</label>
        <textarea id="check-question" value={question} onChange={(event) => { setQuestion(event.target.value); setSubmitted(false); }} rows={4} className="field mt-2" />
        <button className="mt-4 min-h-11 rounded bg-moss px-5 text-sm font-bold text-white">{t("check.button")}</button>
      </form>

      {submitted && (
        <section className="service-panel mt-5 border-l-4 border-[#075985] p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-[#075985]">{statusText}</p>
          <h2 className="mt-2 text-xl font-bold text-[#123B52]">{result.state === "none" ? t("check.noneTitle") : result.matches[0]?.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">{result.state === "none" ? t("check.noneBody") : result.matches[0]?.summary}</p>
          {result.state === "partial" && <p className="mt-3 text-sm text-slate-700"><strong>{t("check.missing")}:</strong> {result.missing.join(", ")}.</p>}
          <p className="mt-3 text-xs text-slate-600">{t("common.demoOnly")}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/navigator?question=${encodeURIComponent(question)}`} className="rounded bg-moss px-4 py-2 text-sm font-bold text-white">{result.state === "none" ? t("check.build") : t("check.continueRoute")}</Link>
            {result.matches[0] && <details className="w-full border-t border-slate-200 pt-4"><summary className="cursor-pointer text-sm font-bold text-[#075985]">{t("check.viewInfo")}</summary><p className="mt-3 text-sm leading-6 text-slate-700">{result.matches[0].content}</p></details>}
          </div>
        </section>
      )}
    </div>
  );
}
