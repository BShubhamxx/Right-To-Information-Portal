import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/server";

const demoNotifications = [
  ["Response overdue", "Your school infrastructure request may be eligible for a First Appeal.", "/appeal"],
  ["Response available", "A response is available for your public hospital equipment request.", "/rtis/demo-hospital-mumbai"],
  ["Application under review", "The department is reviewing your road repair request.", "/rtis/demo-road-pune"],
] as const;

export default async function NotificationsPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data } = user.user ? await supabase.from("notifications").select("id,title,description,action_url,created_at,read").order("created_at", { ascending: false }) : { data: null };
  const notifications = data?.length ? data.map((item) => [item.title, item.description, item.action_url ?? "/dashboard", item.id] as const) : demoNotifications.map((item, index) => [...item, `demo-${index}`] as const);
  return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-4xl px-4 py-8 lg:px-6"><p className="text-sm text-slate-600">My RTIs / Notifications</p><h1 className="mt-1 text-3xl font-bold text-[#123B52]">Notifications</h1><p className="mt-2 text-sm text-slate-700">Updates about your applications, responses and next steps.</p><div className="mt-6 space-y-3">{notifications.map(([title, description, href, id]) => <article key={id} className="service-panel flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between"><div><h2 className="font-bold text-[#123B52]">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-700">{description}</p></div><Link href={href} className="shrink-0 text-sm font-bold text-[#075985] underline underline-offset-4">View details →</Link></article>)}</div></div></main>;
}
