"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";

type Mode = "signin" | "register";
const DEMO_EMAIL = "demo@rti-demo.in";
const DEMO_PASSWORD = "demo123";

export function DemoLogin() {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setMessage(null);
    if (nextMode === "register") { setEmail(""); setPassword(""); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setMessage(null);
    if (mode === "register" && password !== confirmPassword) {
      setLoading(false); setMessage({ type: "error", text: "Passwords do not match. Please check them and try again." }); return;
    }
    const supabase = createClient();
    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { data: { name, phone } } });
    setLoading(false);
    if (result.error) {
      const text = result.error.message.toLowerCase();
      const friendly = text.includes("invalid login") || text.includes("invalid credentials")
        ? "Email or password is incorrect. You can use the demo account shown below."
        : text.includes("already registered") || text.includes("already been registered")
          ? "An account with this email already exists. Try signing in instead."
          : result.error.message;
      setMessage({ type: "error", text: friendly }); return;
    }
    if (mode === "register" && !result.data.session) {
      setMessage({ type: "success", text: "Your account has been created. Check your email to confirm your address, then sign in." });
      setMode("signin"); setConfirmPassword(""); return;
    }
    setMessage({ type: "success", text: mode === "register" ? "Account created. Opening your dashboard..." : "Signed in successfully. Opening your dashboard..." });
    router.push("/dashboard"); router.refresh();
  }

  function useDemoAccount() {
    setMode("signin"); setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); setConfirmPassword(""); setMessage(null);
  }

  return <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,30rem)_minmax(15rem,1fr)]">
    <section className="service-panel p-6 sm:p-7" aria-labelledby="auth-form-title">
      <div className="flex border-b border-slate-200" role="tablist" aria-label="Account access">
        <button type="button" role="tab" aria-selected={mode === "signin"} onClick={() => switchMode("signin")} className={`-mb-px flex-1 border-b-2 px-3 pb-4 text-sm font-bold ${mode === "signin" ? "border-portal-primary text-portal-primary" : "border-transparent text-slate-500"}`}>Sign in</button>
        <button type="button" role="tab" aria-selected={mode === "register"} onClick={() => switchMode("register")} className={`-mb-px flex-1 border-b-2 px-3 pb-4 text-sm font-bold ${mode === "register" ? "border-portal-primary text-portal-primary" : "border-transparent text-slate-500"}`}>Create account</button>
      </div>
      <h2 id="auth-form-title" className="mt-6 text-xl font-bold text-portal-navy">{mode === "signin" ? "Welcome back" : "Create your RTI account"}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{mode === "signin" ? "Sign in to continue to your saved requests and application updates." : "Register once to save applications, track responses and manage appeals."}</p>
      <form onSubmit={submit} className="mt-6 space-y-5">
        {mode === "register" && <>
          <div><label className="block text-sm font-bold text-portal-navy" htmlFor="full-name">Full name</label><input id="full-name" type="text" value={name} onChange={(event) => setName(event.target.value)} className="field mt-2" placeholder="Enter your full name" autoComplete="name" required /></div>
          <div><label className="block text-sm font-bold text-portal-navy" htmlFor="phone">Mobile number <span className="font-normal text-slate-500">(optional)</span></label><input id="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="field mt-2" placeholder="e.g. 9876543210" autoComplete="tel" /></div>
        </>}
        <div><label className="block text-sm font-bold text-portal-navy" htmlFor="account-email">Email address</label><input id="account-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field mt-2" placeholder="you@example.com" autoComplete="email" required /></div>
        <div><label className="block text-sm font-bold text-portal-navy" htmlFor="account-password">Password</label><input id="account-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="field mt-2" placeholder={mode === "register" ? "At least 6 characters" : "Enter your password"} autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={6} required /></div>
        {mode === "register" && <div><label className="block text-sm font-bold text-portal-navy" htmlFor="confirm-password">Confirm password</label><input id="confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="field mt-2" placeholder="Re-enter your password" autoComplete="new-password" minLength={6} required /></div>}
        <button disabled={loading} className="portal-primary-button min-h-12 w-full rounded-md px-5 text-sm font-bold transition disabled:cursor-not-allowed disabled:bg-slate-400">{loading ? "Please wait..." : mode === "signin" ? "Sign in securely" : "Create my account"}</button>
      </form>
      {message && <p role="alert" className={`mt-5 border-l-4 p-3 text-sm leading-6 ${message.type === "error" ? "border-red-700 bg-red-50 text-red-950" : "border-green-700 bg-green-50 text-green-900"}`}>{message.text}</p>}
      <p className="mt-5 text-center text-xs leading-5 text-slate-500">By continuing, you agree that this independent prototype stores your account details to demonstrate the RTI journey.</p>
    </section>
    <aside className="h-fit rounded-xl border border-[#C9DDED] bg-[#F2F8FC] p-6" aria-labelledby="demo-access-title">
      <p className="eyebrow">Try the prototype</p><h2 id="demo-access-title" className="mt-2 text-xl font-bold text-portal-navy">Demo access</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">Explore a pre-populated citizen account with sample applications, a received response and appeal options.</p>
      <dl className="mt-5 space-y-3 rounded-lg border border-[#C9DDED] bg-white p-4 text-sm"><div><dt className="text-slate-500">Email</dt><dd className="font-mono font-semibold text-portal-navy">{DEMO_EMAIL}</dd></div><div><dt className="text-slate-500">Password</dt><dd className="font-mono font-semibold text-portal-navy">{DEMO_PASSWORD}</dd></div></dl>
      <button type="button" onClick={useDemoAccount} className="portal-secondary-button mt-5 min-h-11 w-full rounded-md px-4 text-sm font-bold">Use demo credentials</button>
      <p className="mt-4 text-xs leading-5 text-slate-600">This account and its records are fictional. No real government credentials or OTP are used.</p>
    </aside>
  </div>;
}
