"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/client";

const demoEmail = "demo@rti-demo.in";
const demoPassword = "demo123";

export function DemoLogin() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("Demo Citizen");
  const [email, setEmail] = useState(demoEmail);
  const [password, setPassword] = useState(demoPassword);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const rawNext = searchParams.get("next");
  const next = rawNext?.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const supabase = createClient();

    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { data: { name } } });

    setLoading(false);

    if (result.error) {
      setMessage(result.error.message.includes("Invalid login") ? "The demo account is not seeded yet. Create Demo Citizen in Supabase Auth, then try again." : result.error.message);
      return;
    }

    if (mode === "signup" && !result.data.session) {
      setMessage("Account created. If email confirmation is enabled in Supabase, confirm the email before signing in.");
      return;
    }

    setMessage(mode === "signin" ? "Sign-in successful. Returning to your RTI journey..." : "Account created. Returning to your RTI journey...");
    window.location.assign(next);
  }

  function useDemoCredentials() {
    setMode("signin");
    setName("Demo Citizen");
    setEmail(demoEmail);
    setPassword(demoPassword);
  }

  return (
    <section className="service-panel mt-6 max-w-xl p-5">
      <div className="border-l-4 border-[#075985] bg-blue-50 p-4 text-sm leading-6 text-slate-800">
        <p className="font-bold text-[#123B52]">Demo account credentials</p>
        <p className="mt-1">Email: <span className="font-mono">{demoEmail}</span></p>
        <p>Password: <span className="font-mono">{demoPassword}</span></p>
        <button type="button" onClick={useDemoCredentials} className="mt-3 text-sm font-bold text-[#075985] underline underline-offset-4">Use demo credentials</button>
      </div>

      <div className="mt-5 flex rounded border border-slate-300 bg-slate-50 p-1 text-sm font-bold">
        <button type="button" onClick={() => setMode("signin")} className={`min-h-10 flex-1 rounded px-3 ${mode === "signin" ? "bg-white text-[#123B52] shadow-sm" : "text-slate-600"}`}>Sign in</button>
        <button type="button" onClick={() => setMode("signup")} className={`min-h-10 flex-1 rounded px-3 ${mode === "signup" ? "bg-white text-[#123B52] shadow-sm" : "text-slate-600"}`}>Create account</button>
      </div>

      <form onSubmit={submit} className="mt-5">
        {mode === "signup" && (
          <label className="block text-sm font-bold text-[#123B52]" htmlFor="citizen-name">Full name
            <input id="citizen-name" value={name} onChange={(event) => setName(event.target.value)} className="mt-2 min-h-11 w-full rounded border border-slate-400 px-3 font-normal text-slate-800" required />
          </label>
        )}
        <label className={`${mode === "signup" ? "mt-5 " : ""}block text-sm font-bold text-[#123B52]`} htmlFor="demo-email">Email address
          <input id="demo-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-11 w-full rounded border border-slate-400 px-3 font-normal text-slate-800" required />
        </label>
        <label className="mt-5 block text-sm font-bold text-[#123B52]" htmlFor="demo-password">Password
          <input id="demo-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 min-h-11 w-full rounded border border-slate-400 px-3 font-normal text-slate-800" required minLength={6} />
        </label>
        <button disabled={loading} className="mt-6 min-h-11 rounded bg-moss px-5 text-sm font-bold text-white disabled:bg-slate-400">{loading ? "Please wait..." : mode === "signin" ? "Sign in and continue" : "Create account and continue"}</button>
        {message && <p className={`mt-4 border-l-4 p-3 text-sm leading-6 ${message.includes("successful") || message.includes("created") ? "border-green-700 bg-green-50 text-green-900" : "border-[#C65D11] bg-[#FFF7ED] text-slate-800"}`}>{message}</p>}
      </form>

      <p className="mt-5 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-600">You can use the public guidance tools and registration-number tracking without signing in. Sign-in is only needed for account history, saved records, appeals and final filing.</p>
    </section>
  );
}
