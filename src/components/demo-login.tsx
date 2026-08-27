"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/client";

export function DemoLogin() {
  const [email, setEmail] = useState("demo@rti-demo.in");
  const [password, setPassword] = useState("demo123");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    setMessage(error ? "Demo sign-in is not enabled in this Supabase project yet. Create only the synthetic Demo Citizen account after applying the database migration." : "Demo sign-in successful. Your session is ready.");
  }
  return <form onSubmit={submit} className="service-panel mt-6 max-w-lg p-5"><label className="block text-sm font-bold text-[#123B52]" htmlFor="demo-email">Email address</label><input id="demo-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-11 w-full rounded border border-slate-400 px-3" required /><label className="mt-5 block text-sm font-bold text-[#123B52]" htmlFor="demo-password">Password</label><input id="demo-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 min-h-11 w-full rounded border border-slate-400 px-3" required /><button disabled={loading} className="mt-6 min-h-11 rounded bg-moss px-5 text-sm font-bold text-white disabled:bg-slate-400">{loading ? "Signing in…" : "Continue as Demo Citizen"}</button>{message && <p className={`mt-4 border-l-4 p-3 text-sm leading-6 ${message.includes("not enabled") ? "border-[#C65D11] bg-[#FFF7ED] text-slate-800" : "border-green-700 bg-green-50 text-green-900"}`}>{message}</p>}</form>;
}
