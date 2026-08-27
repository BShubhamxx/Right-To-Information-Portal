"use client";

import { useMemo, useState } from "react";

const authorities = [
  ["Demo Public Works Authority", "Demo Ministry of Urban Development", "Roads and Works", "Infrastructure"],
  ["Demo School Education Authority", "Demo Ministry of Education", "School Education", "Education"],
  ["Demo Public Health Authority", "Demo Ministry of Health", "Public Health Services", "Health"],
  ["Demo Rail Services Authority", "Demo Ministry of Railways", "Passenger Services", "Transport"],
  ["Demo Consumer Affairs Authority", "Demo Ministry of Consumer Affairs", "Consumer Protection", "Consumer affairs"],
] as const;

export function AuthorityDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const filtered = useMemo(() => authorities.filter((authority) => authority.join(" ").toLowerCase().includes(query.toLowerCase()) && (category === "All categories" || authority[3] === category)), [query, category]);
  return <><div className="mt-6 grid gap-3 sm:grid-cols-[1fr_14rem]"><div><label className="block text-sm font-bold text-[#123B52]" htmlFor="authority-search">Search ministry, department or authority</label><input id="authority-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="For example, railways or education" className="mt-2 min-h-11 w-full rounded border border-slate-400 bg-white px-3" /></div><div><label className="block text-sm font-bold text-[#123B52]" htmlFor="authority-category">Category</label><select id="authority-category" value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 min-h-11 w-full rounded border border-slate-400 bg-white px-3"><option>All categories</option><option>Infrastructure</option><option>Education</option><option>Health</option><option>Transport</option><option>Consumer affairs</option></select></div></div><p className="mt-5 text-sm text-slate-600">Showing {filtered.length} representative authorities. The Supabase schema supports a full authority directory.</p><div className="mt-3 divide-y divide-slate-200 border border-slate-300 bg-white">{filtered.map(([name, ministry, department, type]) => <article className="p-4" key={name}><p className="font-bold text-[#123B52]">{name}</p><p className="mt-1 text-sm text-slate-700">{ministry} · {department}</p><div className="mt-3 flex items-center justify-between"><span className="text-xs text-slate-600">{type}</span><button className="text-sm font-bold text-[#075985] underline underline-offset-4">View details</button></div></article>)}{filtered.length === 0 && <p className="p-5 text-sm text-slate-600">No matching authority found. Try a different ministry, department or category.</p>}</div></>;
}
