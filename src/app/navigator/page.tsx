import { SiteHeader } from "@/components/site-header";
import { RTINavigator } from "@/components/rti-navigator";
import { LocalizedPageHeading } from "@/components/localized-page-heading";

export default async function NavigatorPage({ searchParams }: { searchParams: Promise<{ question?: string }> }) {
  const params = await searchParams;
  return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-4xl px-4 py-8 lg:px-6"><LocalizedPageHeading breadcrumb="navigator.breadcrumb" title="navigator.title" intro="navigator.intro" /><RTINavigator initialQuestion={params.question} /></div></main>;
}
