import { AppealForm } from "@/components/appeal-form";
import { SiteHeader } from "@/components/site-header";

export default function AppealPage() { return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-4xl px-4 py-8 lg:px-6"><p className="text-sm text-slate-600">First Appeal</p><h1 className="mt-1 text-3xl font-bold text-[#123B52]">First Appeal</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">Use a First Appeal if your RTI response has not been received within the applicable period or if you are not satisfied with the response. There is no fee for a First Appeal.</p><AppealForm /></div></main>; }
