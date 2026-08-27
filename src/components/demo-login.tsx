"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";

export function DemoLogin() {
  const [email, setEmail] = useState("demo@rti-demo.in");
  const [password, setPassword] = useState("demo123");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setMessage(error.message.includes("Invalid login") ? "The demo account is not seeded yet. Create Demo Citizen in Supabase Auth, then try again." : error.message);
    else { setMessage("Demo sign-in successful. Loading My RTIs…"); router.push("/dashboard"); router.refresh(); }
  }
  return <form onSubmit={submit} className="service-panel mt-6 max-w-lg p-5"><label className="block text-sm font-bold text-[#123B52]" htmlFor="demo-email">Email address</label><input id="demo-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-11 w-full rounded border border-slate-400 px-3" required /><label className="mt-5 block text-sm font-bold text-[#123B52]" htmlFor="demo-password">Password</label><input id="demo-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 min-h-11 w-full rounded border border-slate-400 px-3" required /><button disabled={loading} className="mt-6 min-h-11 rounded bg-moss px-5 text-sm font-bold text-white disabled:bg-slate-400">{loading ? "Signing in…" : "Continue as Demo Citizen"}</button>{message && <p className={`mt-4 border-l-4 p-3 text-sm leading-6 ${message.includes("not enabled") ? "border-[#C65D11] bg-[#FFF7ED] text-slate-800" : "border-green-700 bg-green-50 text-green-900"}`}>{message}</p>}</form>;
}
