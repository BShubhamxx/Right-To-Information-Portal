import { SiteHeader } from "@/components/site-header";
import { CheckBeforeFile } from "@/components/check-before-file";
import { createClient } from "@/lib/server";

export default async function CheckPage({ searchParams }: { searchParams: Promise<{ question?: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.from("public_information").select("title,topic,year,summary,content,keywords,demo_only").limit(50);
  const records = data?.map((item) => ({ ...item, topic: item.topic ?? item.title, keywords: item.keywords ?? [], demoOnly: item.demo_only ?? true })) ?? undefined;
  const params = await searchParams;
  return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-4xl px-4 py-8 lg:px-6"><p className="text-sm text-slate-600">File an RTI / Check first</p><h1 className="mt-1 text-3xl font-bold text-[#123B52]">Check before you file</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">Some information may already be published. Search our illustrative library first, then decide whether you still need an RTI. You will never be blocked from filing.</p><CheckBeforeFile records={records} initialQuestion={params.question} /></div></main>;
}
