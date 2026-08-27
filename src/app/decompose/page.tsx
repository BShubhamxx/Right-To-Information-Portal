import { SiteHeader } from "@/components/site-header";
import { QuestionDecomposition } from "@/components/question-decomposition";
import { LocalizedPageHeading } from "@/components/localized-page-heading";
export default async function DecomposePage({ searchParams }: { searchParams: Promise<{ question?: string }> }) { const params = await searchParams; return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-4xl px-4 py-8 lg:px-6"><LocalizedPageHeading breadcrumb="decompose.breadcrumb" title="decompose.title" intro="decompose.intro" /><QuestionDecomposition initialQuestion={params.question} /></div></main>; }
