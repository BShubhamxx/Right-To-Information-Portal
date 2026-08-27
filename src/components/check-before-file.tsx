"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { searchPublicInformation, type PublicInformationRecord } from "@/lib/intelligence";

const fallbackRecords: PublicInformationRecord[] = [
  { title: "Road Development Expenditure — FY 2025–26", topic: "Road repair expenditure", year: "2025–26", summary: "Illustrative totals: ₹84.2 crore allocated, ₹71.6 crore spent and 143 projects completed.", content: "This fictional record provides aggregate expenditure only. Project-wise contractor details may still require an RTI request.", keywords: ["road", "repair", "pune", "expenditure", "budget"], demoOnly: true },
  { title: "School Infrastructure Works — FY 2025–26", topic: "School infrastructure", year: "2025–26", summary: "Illustrative list of classroom repair and accessibility works.", content: "This fictional record is provided for demonstration.", keywords: ["school", "education", "classroom", "works"], demoOnly: true },
];

export function CheckBeforeFile({ records = fallbackRecords, initialQuestion }: { records?: PublicInformationRecord[]; initialQuestion?: string }) {
  const [question, setQuestion] = useState(initialQuestion || "How much money was spent on road repairs in Pune in 2025?");
  const [submitted, setSubmitted] = useState(true);
  const result = useMemo(() => searchPublicInformation(question, records), [question, records]);
  function submit(event: FormEvent) { event.preventDefault(); setSubmitted(true); }
  return <div className="mt-6"><form onSubmit={submit} className="service-panel p-5"><label htmlFor="check-question" className="block text-sm font-bold text-[#123B52]">What information are you looking for?</label><textarea id="check-question" value={question} onChange={(event) => { setQuestion(event.target.value); setSubmitted(false); }} rows={4} className="field mt-2" /><button className="mt-4 min-h-11 rounded bg-moss px-5 text-sm font-bold text-white">Check available information</button></form>{submitted && <section className="service-panel mt-5 border-l-4 border-[#075985] p-5"><p className="text-xs font-bold uppercase tracking-wide text-[#075985]">{result.state === "exact" ? "You may already have some of this information" : result.state === "partial" ? "We found some information" : "We could not find a relevant match"}</p><h2 className="mt-2 text-xl font-bold text-[#123B52]">{result.state === "none" ? "You can still build an RTI" : result.matches[0]?.title}</h2><p className="mt-2 text-sm leading-6 text-slate-700">{result.state === "none" ? "There is no matching record in our illustrative demo library. This does not prevent you from filing." : result.matches[0]?.summary}</p>{result.state === "partial" && <p className="mt-3 text-sm text-slate-700"><strong>Details that may still be missing:</strong> {result.missing.join(", ")}.</p>}<p className="mt-3 text-xs text-slate-600">Illustrative demo information only. It is not an official government record.</p><div className="mt-5 flex flex-wrap gap-3"><Link href={`/navigator?question=${encodeURIComponent(question)}`} className="rounded bg-moss px-4 py-2 text-sm font-bold text-white">{result.state === "none" ? "Build an RTI" : "Continue to route guidance"}</Link>{result.matches[0] && <details className="w-full border-t border-slate-200 pt-4"><summary className="cursor-pointer text-sm font-bold text-[#075985]">View available information</summary><p className="mt-3 text-sm leading-6 text-slate-700">{result.matches[0].content}</p></details>}</div></section>}</div>;
}
