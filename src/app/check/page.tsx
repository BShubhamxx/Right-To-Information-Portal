import { SiteHeader } from "@/components/site-header";
import { CheckBeforeFile } from "@/components/check-before-file";
import { LocalizedPageHeading } from "@/components/localized-page-heading";
import { createClient } from "@/lib/server";

export default async function CheckPage({ searchParams }: { searchParams: Promise<{ question?: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.from("public_information").select("title,topic,year,summary,content,keywords,demo_only").limit(50);
  const records = data?.map((item) => ({ ...item, topic: item.topic ?? item.title, keywords: item.keywords ?? [], demoOnly: item.demo_only ?? true })) ?? undefined;
  const params = await searchParams;
  return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-4xl px-4 py-8 lg:px-6"><LocalizedPageHeading breadcrumb="check.breadcrumb" title="check.title" intro="check.intro" /><CheckBeforeFile records={records} initialQuestion={params.question} /></div></main>;
}
