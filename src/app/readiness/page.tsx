import { SiteHeader } from "@/components/site-header";
import { ReadinessCheck } from "@/components/readiness-check";
import { LocalizedPageHeading } from "@/components/localized-page-heading";
import { LocalizedRequestLabel } from "@/components/localized-request-label";
export default async function ReadinessPage({ searchParams }: { searchParams: Promise<{ question?: string }> }) { const params = await searchParams; const question = params.question || "How much money was spent on road repairs in Pune in 2025?"; return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-4xl px-4 py-8 lg:px-6"><LocalizedPageHeading breadcrumb="readiness.breadcrumb" title="readiness.title" intro="readiness.intro" /><div className="service-panel mt-6 bg-slate-50 p-4 text-sm leading-6 text-slate-700"><LocalizedRequestLabel /> {question}</div><ReadinessCheck question={question} /></div></main>; }
