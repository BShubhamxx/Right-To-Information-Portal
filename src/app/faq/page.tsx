import { FAQList } from "@/components/faq-list";
import { SiteHeader } from "@/components/site-header";
export default function FAQPage() { return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-4xl px-4 py-8 lg:px-6"><p className="text-sm text-slate-600">Help center</p><h1 className="mt-1 text-3xl font-bold text-[#123B52]">Frequently asked questions</h1><p className="mt-3 text-sm leading-7 text-slate-700">Find guidance on filing, payment, documents, tracking and appeals.</p><FAQList /></div></main>; }
