import { DemoLogin } from "@/components/demo-login";
import { SiteHeader } from "@/components/site-header";
import { Suspense } from "react";

export default function LoginPage() { return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-4xl px-4 py-8 lg:px-6"><p className="text-sm text-slate-600">Account access</p><h1 className="mt-1 text-3xl font-bold text-[#123B52]">Sign in only when an account is needed</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">Public RTI guidance, tracking by registration number, authorities, FAQ and the knowledge library do not require login. Sign in to save final submissions, view My RTIs, manage appeals and receive notifications.</p><Suspense fallback={<p className="mt-6 text-sm font-semibold text-slate-600">Loading account form...</p>}><DemoLogin /></Suspense></div></main>; }
