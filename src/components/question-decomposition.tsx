"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { decomposeQuestion } from "@/lib/intelligence";
import { useI18n } from "@/lib/i18n";

const groupHi: Record<string, string> = {
  "Budget and expenditure": "बजट और खर्च",
  "Contracts and contractors": "अनुबंध और ठेकेदार",
  "Project completion": "परियोजना पूर्णता",
  "Complaints": "शिकायतें",
  "Records and documents": "अभिलेख और दस्तावेज़",
};

const infoHi: Record<string, string> = {
  Expenditure: "व्यय",
  Contracts: "अनुबंध",
  "Project status": "परियोजना की स्थिति",
  Complaints: "शिकायतें",
  Records: "अभिलेख",
  Counts: "संख्या",
};

export function QuestionDecomposition({ initialQuestion = "How much money was spent repairing roads in Pune in 2025, which contractors received the work, and how many projects were completed?" }: { initialQuestion?: string }) {
  const { t, locale } = useI18n();
  const [question, setQuestion] = useState(initialQuestion);
  const [confirmed, setConfirmed] = useState(false);
  const result = useMemo(() => decomposeQuestion(question), [question]);

  return (
    <div className="mt-6">
      <textarea aria-label={t("decompose.title")} value={question} onChange={(event) => { setQuestion(event.target.value); setConfirmed(false); }} rows={4} className="field" />
      <section className="service-panel mt-5 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-[#075985]">{t("decompose.eyebrow")}</p>
        <h2 className="mt-2 text-xl font-bold text-[#123B52]">
          {t("decompose.contains")} {result.requests.length} {result.requests.length === 1 ? t("decompose.singleSuffix") : t("decompose.pluralSuffix")}
        </h2>
        <div className="mt-4 divide-y divide-slate-200 border border-slate-300">
          {result.requests.map((request, index) => (
            <div className="flex gap-3 p-4" key={`${request.label}-${index}`}>
              <span className="font-mono text-sm font-bold text-[#075985]">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-bold text-[#123B52]">{locale === "hi" ? groupHi[request.label] ?? request.label : request.label}</p>
                <p className="mt-1 text-sm text-slate-700">{request.text}</p>
                <p className="mt-1 text-xs text-slate-600">{t("decompose.infoType")}: {locale === "hi" ? infoHi[request.informationType] ?? request.informationType : request.informationType}</p>
              </div>
            </div>
          ))}
        </div>
        {result.hasDifferentOwners && <p className="mt-4 border-l-4 border-[#C65D11] bg-[#FFF7ED] p-3 text-sm text-slate-700">{t("decompose.differentOwners")}</p>}
        <p className="mt-4 text-xs text-slate-600">{t("decompose.disclaimer")}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/readiness?question=${encodeURIComponent(question)}`} onClick={() => setConfirmed(true)} className="rounded bg-moss px-4 py-2 text-sm font-bold text-white">{t("decompose.reviewContinue")}</Link>
          <Link href={`/knowledge?query=${encodeURIComponent(question)}`} className="px-4 py-2 text-sm font-bold text-[#075985] underline underline-offset-4">{t("decompose.similar")}</Link>
        </div>
        {confirmed && <p className="mt-3 text-sm text-green-800">{t("decompose.saved")}</p>}
      </section>
    </div>
  );
}
