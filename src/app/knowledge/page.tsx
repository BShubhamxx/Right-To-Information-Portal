import { SiteHeader } from "@/components/site-header";
import { KnowledgeLibrary } from "@/components/knowledge-library";
import { LocalizedPageHeading } from "@/components/localized-page-heading";
export default async function KnowledgePage({ searchParams }: { searchParams: Promise<{ query?: string }> }) { const params = await searchParams; return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-5xl px-4 py-8 lg:px-6"><LocalizedPageHeading breadcrumb="knowledge.breadcrumb" title="knowledge.title" intro="knowledge.intro" /><KnowledgeLibrary initialQuery={params.query} /></div></main>; }
