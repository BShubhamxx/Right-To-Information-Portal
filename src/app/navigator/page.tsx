import { SiteHeader } from "@/components/site-header";
import { RTINavigator } from "@/components/rti-navigator";

export default async function NavigatorPage({ searchParams }: { searchParams: Promise<{ question?: string }> }) {
  const params = await searchParams;
  return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-4xl px-4 py-8 lg:px-6"><p className="text-sm text-slate-600">File an RTI / Route guidance</p><h1 className="mt-1 text-3xl font-bold text-[#123B52]">RTI Navigator</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">We’ll suggest whether your question appears to concern a Central, State or local authority. You can always review or change the suggested route.</p><RTINavigator initialQuestion={params.question} /></div></main>;
}
