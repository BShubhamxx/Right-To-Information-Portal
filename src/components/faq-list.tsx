"use client";

import { useMemo, useState } from "react";

const questions = [
  ["Before filing", "Who can file an RTI?", "Indian citizens can file requests to Central Government authorities through this prototype. Do not use it for State Government authorities."],
  ["Filing", "How long can my application text be?", "You can enter up to 3,000 characters. Attach a PDF if you need more space."],
  ["Payment", "What happens if payment succeeds but no registration number appears?", "Do not pay again. The demo represents a reconciliation state; a registration number can be generated after the payment is reconciled."],
  ["Documents", "Can I upload identity documents?", "Do not upload Aadhaar, PAN or personal identity documents. A BPL certificate can be attached only when it is relevant to fee exemption."],
  ["First Appeal", "Is there a fee for First Appeal?", "No. First Appeal is shown as ₹0 in this prototype."],
  ["Status", "What does transferred mean?", "The receiving authority has indicated another public authority is responsible. A transfer is not necessarily an action you need to take."],
];

export function FAQList() {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => questions.filter((item) => item.join(" ").toLowerCase().includes(query.toLowerCase())), [query]);
  return <><label className="mt-6 block text-sm font-bold text-[#123B52]" htmlFor="faq-search">Search help topics</label><input id="faq-search" value={query} onChange={(event) => setQuery(event.target.value)} className="mt-2 min-h-11 w-full rounded border border-slate-400 bg-white px-3 sm:max-w-xl" placeholder="Search filing, payment, status…" /><div className="mt-5 divide-y divide-slate-300 border border-slate-300 bg-white">{matches.map(([category, question, answer]) => <details className="p-4" key={question}><summary className="cursor-pointer font-bold text-[#123B52]"><span className="mr-2 text-xs font-semibold text-slate-500">{category}</span>{question}</summary><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">{answer}</p></details>)}{matches.length === 0 && <p className="p-5 text-sm text-slate-600">No help topic matched your search.</p>}</div></>;
}
