import { SiteHeader } from "@/components/site-header";
import { PreflightCheck } from "@/components/preflight-check";
import { LocalizedPageHeading } from "@/components/localized-page-heading";
export default async function PreflightPage({ searchParams }: { searchParams: Promise<{ question?: string }> }) { const params = await searchParams; const question = params.question || "How much money was spent on road repairs in Pune in 2025?"; return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-4xl px-4 py-8 lg:px-6"><LocalizedPageHeading breadcrumb="preflight.breadcrumb" title="preflight.title" intro="preflight.intro" /><PreflightCheck question={question} /></div></main>; }
