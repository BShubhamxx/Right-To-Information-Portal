"use client";

import Link from "next/link";
import { useMemo } from "react";
import { determineJurisdiction, extractEntities, calculateReadiness, runEligibilityCheck } from "@/lib/intelligence";
import { useI18n } from "@/lib/i18n";

export function PreflightCheck({ question }: { question: string }) {
  const { t } = useI18n();
  const navigation = useMemo(() => determineJurisdiction(question), [question]);
  const readiness = useMemo(() => calculateReadiness(question, navigation.jurisdiction !== "Unknown"), [question, navigation]);
  const eligibility = useMemo(() => runEligibilityCheck(question, navigation), [question, navigation]);
  const checks = [
    { label: t("preflight.route"), passed: navigation.jurisdiction !== "Unknown" },
    { label: t("preflight.info"), passed: extractEntities(question).informationTypes.length > 0 },
    { label: t("preflight.context"), passed: Boolean(extractEntities(question).year) },
    { label: t("preflight.limit"), passed: question.length <= 3000 },
    { label: t("preflight.document"), passed: true },
    { label: t("preflight.fee"), passed: true },
    { label: t("preflight.eligible"), passed: eligibility.eligible },
  ];
  const ready = checks.every((check) => check.passed) && readiness.state !== "Review required";

  return (
    <section className="service-panel mt-6 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-[#075985]">{t("preflight.eyebrow")}</p>
      <h2 className="mt-2 text-2xl font-bold text-[#123B52]">{ready ? t("preflight.ready") : t("preflight.review")}</h2>
      <ul className="mt-5 divide-y divide-slate-200 border border-slate-300">
        {checks.map((check) => <li className="flex gap-3 p-3 text-sm" key={check.label}><span className={check.passed ? "text-green-700" : "text-[#C65D11]"}>{check.passed ? "✓" : "!"}</span><span>{check.label}</span></li>)}
      </ul>
      <p className="mt-4 text-xs text-slate-600">{t("common.prototypeGuidance")}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {ready ? <Link href={`/build?question=${encodeURIComponent(question)}`} className="rounded bg-moss px-4 py-2 text-sm font-bold text-white">{t("preflight.continueReview")}</Link> : <Link href={`/readiness?question=${encodeURIComponent(question)}`} className="rounded bg-moss px-4 py-2 text-sm font-bold text-white">{t("preflight.improve")}</Link>}
        <Link href={`/navigator?question=${encodeURIComponent(question)}`} className="px-4 py-2 text-sm font-bold text-[#075985] underline underline-offset-4">{t("preflight.reviewRoute")}</Link>
      </div>
    </section>
  );
}
