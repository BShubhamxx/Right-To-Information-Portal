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
    router.push(query ? `/check?question=${encodeURIComponent(query)}` : "/build");
  }

  return (
    <section className="service-panel p-4 sm:p-5">
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-base font-bold text-[#123B52]" htmlFor="question">
          What information are you looking for?
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Describe what you want to know..."
          rows={4}
          className="field min-h-[7.5rem] placeholder:text-slate-500"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button className="min-h-11 rounded bg-moss px-5 text-sm font-bold text-white transition hover:bg-[#0B4F71]">
            Continue
          </button>
          <span className="text-sm text-slate-600">Need help writing your request? We can suggest wording.</span>
        </div>
      </form>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#075985]">Example questions</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3" aria-label="Question examples">
          {examples.map((example) => (
            <button
              type="button"
              key={example}
              onClick={() => setQuestion(example)}
              className="rounded border border-slate-300 bg-slate-50 px-3 py-2 text-left text-xs leading-5 text-slate-700 transition hover:border-slate-400 hover:bg-sand"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
