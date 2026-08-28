import { DemoLogin } from "@/components/demo-login";
import { SiteHeader } from "@/components/site-header";

export default function LoginPage() {
  return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-5xl px-4 py-10 lg:px-6"><p className="eyebrow">Account access</p><h1 className="mt-2 text-4xl font-bold tracking-tight text-portal-navy sm:text-5xl">Your RTI workspace</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">Create an account or sign in to prepare requests, save your progress and follow every update in one place.</p><DemoLogin /></div></main>;
}
