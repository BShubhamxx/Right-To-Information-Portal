"use client";

import Link from "next/link";
import { useMemo } from "react";
import { calculateReadiness } from "@/lib/intelligence";
import { useI18n } from "@/lib/i18n";

const stateHi: Record<string, string> = {
  "Ready to submit": "जमा करने के लिए तैयार",
  "Almost ready": "लगभग तैयार",
  "Needs information": "कुछ जानकारी आवश्यक है",
  "Review required": "समीक्षा आवश्यक है",
};

const checkHi: Record<string, { message: string; recommendation: string }> = {
  clear_request: { message: "जानकारी माँगी गई है", recommendation: "कृपया बताएं कि आपको कौन-से रिकॉर्ड या जानकारी चाहिए।" },
  time_period: { message: "समय अवधि दी गई है", recommendation: "जहाँ ज़रूरी हो, वर्ष या वित्तीय वर्ष जोड़ें।" },
  location: { message: "स्थान दिया गया है", recommendation: "जहाँ ज़रूरी हो, शहर, ज़िला या राज्य जोड़ें।" },
  authority: { message: "संबंधित प्राधिकरण पहचाना गया है", recommendation: "सुझाए गए मार्ग की समीक्षा करें।" },
  records_request: { message: "अनुरोध जानकारी या रिकॉर्ड के लिए है", recommendation: "राय या कारण पूछने के बजाय रिकॉर्ड, रिपोर्ट या दस्तावेज़ माँगें।" },
  character_limit: { message: "3,000 अक्षरों की सीमा के भीतर", recommendation: "अनुरोध छोटा करें या सहायक PDF जोड़ें।" },
  single_request: { message: "प्रश्न संरचना देखी गई है", recommendation: "असंबंधित जानकारी समूहों को अलग करने पर विचार करें।" },
  supporting_document: { message: "सहायक दस्तावेज़", recommendation: "जमा करने से पहले आवश्यक सहायक दस्तावेज़ जोड़ें।" },
};

export function ReadinessCheck({ question }: { question: string }) {
  const { t, locale } = useI18n();
  const result = useMemo(() => calculateReadiness(question), [question]);
  const state = locale === "hi" ? stateHi[result.state] ?? result.state : result.state;

  return (
    <section className="service-panel mt-6 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div><p className="text-xs font-bold uppercase tracking-wide text-[#075985]">{t("readiness.eyebrow")}</p><h2 className="mt-2 text-xl font-bold text-[#123B52]">{state}</h2></div>
        <p className="font-mono text-sm font-bold text-[#075985]">{result.passed}/{result.total} {t("readiness.checksPassed")}</p>
      </div>
      <ul className="mt-5 divide-y divide-slate-200 border border-slate-300">
        {result.checks.map((check) => {
          const translated = locale === "hi" ? checkHi[check.type] : undefined;
          return <li className="flex gap-3 p-3 text-sm" key={check.type}><span className={check.passed ? "text-green-700" : "text-[#C65D11]"}>{check.passed ? "✓" : "!"}</span><div><p className="font-semibold text-[#123B52]">{translated?.message ?? check.message}</p>{!check.passed && <p className="mt-1 text-slate-700">{translated?.recommendation ?? check.recommendation}</p>}</div></li>;
        })}
      </ul>
      <p className="mt-4 text-xs text-slate-600">{t("readiness.disclaimer")}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href={`/preflight?question=${encodeURIComponent(question)}`} className="rounded bg-moss px-4 py-2 text-sm font-bold text-white">{t("readiness.continuePreflight")}</Link>
        <Link href={`/build?question=${encodeURIComponent(question)}`} className="px-4 py-2 text-sm font-bold text-[#075985] underline underline-offset-4">{t("common.editRequest")}</Link>
      </div>
    </section>
  );
}
