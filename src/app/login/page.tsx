import { DemoLogin } from "@/components/demo-login";
import { SiteHeader } from "@/components/site-header";

export default function LoginPage() { return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-4xl px-4 py-8 lg:px-6"><p className="text-sm text-slate-600">Demo access</p><h1 className="mt-1 text-3xl font-bold text-[#123B52]">Sign in to the demo account</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">Use the synthetic Demo Citizen account to view sample applications, a received response, an overdue request and a First Appeal. No real government credentials or OTP are used.</p><DemoLogin /></div></main>; }
