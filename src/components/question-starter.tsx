"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const examples = [
  "How much was spent repairing roads in my area?",
  "How many teachers are posted at my school?",
  "How much funding did this public hospital receive?",
];

export function QuestionStarter() {
  const [question, setQuestion] = useState("");
  const router = useRouter();
  function submit(event: FormEvent) {
    event.preventDefault();
    const query = question.trim();
    router.push(query ? `/build?question=${encodeURIComponent(query)}` : "/build");
  }
  return (
    <div className="service-panel p-4">
      <form onSubmit={submit} className="flex flex-col gap-3">
        <label className="text-base font-bold text-[#123B52]" htmlFor="question">What information are you looking for?</label>
        <input id="question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Describe what you want to know…" className="min-h-12 w-full rounded border border-slate-400 bg-white px-4 text-base outline-none placeholder:text-slate-500 focus:border-saffron" />
        <div className="flex flex-wrap items-center justify-between gap-3"><button className="min-h-11 rounded bg-moss px-5 text-sm font-bold text-white transition hover:bg-[#0B4F71]">Continue</button><span className="text-xs text-slate-600">Need help writing your request? We can suggest wording.</span></div>
      </form>
      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-200 pt-3" aria-label="Question examples">
        {examples.map((example) => <button type="button" key={example} onClick={() => setQuestion(example)} className="border border-slate-300 bg-slate-50 px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:bg-sand">{example}</button>)}
      </div>
    </div>
  );
}
