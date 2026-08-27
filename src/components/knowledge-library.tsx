"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { findRelatedKnowledge, type KnowledgeItem } from "@/lib/intelligence";
import { useI18n } from "@/lib/i18n";

type LocalizedKnowledgeItem = KnowledgeItem & {
  titleHi: string;
  categoryHi: string;
  exampleQuestionHi: string;
  exampleRequestHi: string;
  explanationHi: string;
};

const demoItems: LocalizedKnowledgeItem[] = [
  { title: "Road project expenditure", titleHi: "सड़क परियोजना खर्च", category: "Government spending", categoryHi: "सरकारी खर्च", topic: "Road construction", informationType: "Expenditure", exampleQuestion: "How much was spent on road repairs in Pune?", exampleQuestionHi: "पुणे में सड़क मरम्मत पर कितना खर्च हुआ?", exampleRequest: "Please provide project-wise sanctioned amount, expenditure and completion records for road repair works in Pune during FY 2025-26.", exampleRequestHi: "कृपया FY 2025-26 में पुणे में सड़क मरम्मत कार्यों के लिए परियोजना-वार स्वीकृत राशि, खर्च और पूर्णता रिकॉर्ड उपलब्ध कराएँ।", authorityCategory: "Local infrastructure authority", keywords: ["road", "repair", "pune", "spending", "सड़क", "मरम्मत", "पुणे", "खर्च"], explanation: "Illustrative example for understanding public infrastructure spending.", explanationHi: "सार्वजनिक बुनियादी ढाँचे पर खर्च समझने के लिए उदाहरण।", demoOnly: true },
  { title: "Road contracts", titleHi: "सड़क अनुबंध", category: "Contracts", categoryHi: "अनुबंध", topic: "Road construction", informationType: "Contracts", exampleQuestion: "Which contractors received road repair work?", exampleQuestionHi: "सड़क मरम्मत का काम किन ठेकेदारों को मिला?", exampleRequest: "Please provide contractor names, tender values, work orders and completion status for road repair projects.", exampleRequestHi: "कृपया सड़क मरम्मत परियोजनाओं के ठेकेदारों के नाम, निविदा राशि, वर्क ऑर्डर और पूर्णता स्थिति उपलब्ध कराएँ।", authorityCategory: "Local infrastructure authority", keywords: ["road", "contractor", "tender", "सड़क", "ठेकेदार", "निविदा"], explanation: "Illustrative example for requesting contract records.", explanationHi: "अनुबंध रिकॉर्ड माँगने के लिए उदाहरण।", demoOnly: true },
  { title: "Railway station redevelopment", titleHi: "रेलवे स्टेशन पुनर्विकास", category: "Transport", categoryHi: "परिवहन", topic: "Railways", informationType: "Expenditure", exampleQuestion: "How much was spent on station redevelopment?", exampleQuestionHi: "स्टेशन पुनर्विकास पर कितना खर्च हुआ?", exampleRequest: "Please provide expenditure records for station redevelopment projects during the requested financial year.", exampleRequestHi: "कृपया संबंधित वित्तीय वर्ष में स्टेशन पुनर्विकास परियोजनाओं के खर्च रिकॉर्ड उपलब्ध कराएँ।", authorityCategory: "Central transport authority", keywords: ["railway", "station", "transport", "रेलवे", "स्टेशन", "परिवहन"], explanation: "Illustrative example for a Central Government transport request.", explanationHi: "केंद्रीय सरकार से जुड़े परिवहन अनुरोध के लिए उदाहरण।", demoOnly: true },
];

export function KnowledgeLibrary({ initialQuery = "" }: { initialQuery?: string }) {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => query ? findRelatedKnowledge(query, demoItems) as LocalizedKnowledgeItem[] : demoItems, [query]);

  return (
    <div className="mt-6">
      <label htmlFor="knowledge-search" className="block text-sm font-bold text-[#123B52]">{t("knowledge.label")}</label>
      <input id="knowledge-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("knowledge.placeholder")} className="mt-2 min-h-11 w-full rounded border border-slate-400 bg-white px-3" />
      <div className="mt-5 space-y-4">
        {results.map((item) => {
          const title = locale === "hi" ? item.titleHi : item.title;
          const category = locale === "hi" ? item.categoryHi : item.category;
          const request = locale === "hi" ? item.exampleRequestHi : item.exampleRequest;
          const explanation = locale === "hi" ? item.explanationHi : item.explanation;
          const question = locale === "hi" ? item.exampleQuestionHi : item.exampleQuestion;
          return (
            <article className="service-panel p-5" key={item.title}>
              <div className="flex flex-wrap gap-2 text-xs"><span className="bg-slate-100 px-2 py-1 font-bold text-[#075985]">{category}</span><span className="text-slate-600">{item.informationType}</span></div>
              <h2 className="mt-3 text-lg font-bold text-[#123B52]">{title}</h2>
              <p className="mt-2 text-sm text-slate-700"><strong>{t("knowledge.requested")}:</strong> {request}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{explanation}</p>
              <p className="mt-3 text-xs text-slate-600">{t("knowledge.exampleNote")}</p>
              <Link href={`/check?question=${encodeURIComponent(question)}`} className="mt-4 inline-block rounded bg-moss px-4 py-2 text-sm font-bold text-white">{t("knowledge.use")}</Link>
            </article>
          );
        })}
        {!results.length && <p className="service-panel p-5 text-sm text-slate-700">{t("knowledge.empty")}</p>}
      </div>
    </div>
  );
}
