"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export function TrackRTI() {
  const [number, setNumber] = useState("");
  const [searched, setSearched] = useState(false);
  function submit(event: FormEvent) { event.preventDefault(); setSearched(true); }
  return <><form onSubmit={submit} className="service-panel mt-6 p-5"><label className="block text-sm font-bold text-[#123B52]" htmlFor="registration-number">Registration number</label><p className="mt-1 text-sm text-slate-600">Enter the registration number issued after your RTI or First Appeal was submitted.</p><div className="mt-3 flex flex-col gap-3 sm:flex-row"><input id="registration-number" value={number} onChange={(event) => setNumber(event.target.value)} placeholder="For example, DEMO/R/E/26/00421" className="min-h-11 flex-1 rounded border border-slate-400 px-3" required /><button className="min-h-11 rounded bg-moss px-5 text-sm font-bold text-white">View status</button></div></form>{searched && <section className="service-panel mt-5 p-5"><p className="text-xs font-bold uppercase tracking-wide text-[#075985]">Demo result</p><h2 className="mt-2 text-xl font-bold text-[#123B52]">Road repair expenditure — Pune</h2><p className="mt-1 font-mono text-sm text-slate-700">DEMO/R/E/26/00421</p><div className="mt-5 grid gap-4 border-y border-slate-200 py-4 sm:grid-cols-3"><div><p className="text-xs font-bold uppercase text-slate-600">Status</p><p className="mt-1 font-bold text-[#075985]">Under review</p></div><div><p className="text-xs font-bold uppercase text-slate-600">What this means</p><p className="mt-1 text-sm text-slate-700">The department is reviewing your request.</p></div><div><p className="text-xs font-bold uppercase text-slate-600">Your next action</p><p className="mt-1 text-sm text-slate-700">No action needed.</p></div></div><Link href="/rtis/demo-road-pune" className="mt-5 inline-block text-sm font-bold text-[#075985] underline underline-offset-4">View application details →</Link></section>}</>;
}
