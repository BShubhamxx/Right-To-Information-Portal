import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/server";

type TimelineEvent = { id: string; status: string; title: string; description: string; event_date: string; action_required: boolean; action_label: string | null };

function formatDate(value: string | null) {
  return value ? new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value)) : "Not available";
}

function readableStatus(status: string) { return status.replaceAll("_", " "); }

function statusGuidance(status: string, responseDueAt: string | null) {
  if (["RESPONSE_OVERDUE", "APPEAL_AVAILABLE"].includes(status)) return ["The response date has passed.", "You may be able to file a First Appeal.", "Appeal options available now"];
  if (status === "RESPONSE_RECEIVED") return ["A response has been issued.", "Read the response and decide if it answers your question.", "Response available"];
  if (status === "SUPPORTING_DOCUMENT_REQUIRED") return ["The authority needs a supporting document.", "Upload the requested document.", "Action required"];
  if (status === "ADDITIONAL_FEE_REQUIRED") return ["The authority has requested an additional fee.", "Review and pay the requested fee.", "Action required"];
  return ["The department is reviewing your request.", "No action needed.", responseDueAt ? `By ${formatDate(responseDueAt)}` : "After submission"];
}

export default async function RTIDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: application } = await supabase
    .from("rti_applications")
    .select("id,title,registration_number,status,submitted_at,response_due_at,fee,payment_status,authority:authorities(name)")
    .eq("id", id)
    .maybeSingle();

  if (!application) notFound();

  const { data: savedEvents } = await supabase
    .from("timeline_events")
    .select("id,status,title,description,event_date,action_required,action_label")
    .eq("rti_id", application.id)
    .order("event_date", { ascending: true });
  const { data: response } = await supabase.from("responses").select("summary,content,received_at").eq("rti_id", application.id).maybeSingle();

  const events = (savedEvents ?? []) as TimelineEvent[];
  const fallbackEvents: TimelineEvent[] = application.submitted_at ? [{ id: "submitted", status: "SUBMITTED", title: "Application submitted", description: "Your RTI was submitted through the portal.", event_date: application.submitted_at, action_required: false, action_label: null }] : [];
  const timeline = events.length ? events : fallbackEvents;
  const [meaning, nextAction, expectedUpdate] = statusGuidance(application.status, application.response_due_at);
  const actionNeeded = ["RESPONSE_OVERDUE", "APPEAL_AVAILABLE", "SUPPORTING_DOCUMENT_REQUIRED", "ADDITIONAL_FEE_REQUIRED"].includes(application.status);
  const authority = application.authority as unknown as { name: string } | { name: string }[] | null;
  const authorityName = Array.isArray(authority) ? authority[0]?.name : authority?.name;

  return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-5xl px-4 py-8 lg:px-6">
    <p className="text-sm text-slate-600">My RTIs / Case record</p>
    <div className="mt-2 flex flex-col justify-between gap-4 border-b border-slate-300 pb-5 sm:flex-row"><div><h1 className="text-3xl font-bold text-[#123B52]">{application.title}</h1><p className="mt-2 font-mono text-sm text-slate-700">{application.registration_number}</p></div><span className={`h-fit px-3 py-2 text-sm font-bold ${actionNeeded ? "bg-amber-100 text-amber-900" : application.status === "RESPONSE_RECEIVED" ? "bg-green-100 text-green-900" : "bg-blue-100 text-blue-900"}`}>{readableStatus(application.status)}</span></div>
    <section className="service-panel mt-6"><div className="border-b border-slate-300 bg-slate-50 px-5 py-4"><h2 className="font-bold text-[#123B52]">Status and next action</h2></div><div className="grid gap-5 p-5 sm:grid-cols-3"><div><p className="text-xs font-bold uppercase text-slate-600">What this means</p><p className="mt-2 text-sm leading-6 text-slate-700">{meaning}</p></div><div><p className="text-xs font-bold uppercase text-slate-600">Your next action</p><p className="mt-2 text-sm leading-6 text-slate-700">{nextAction}</p></div><div><p className="text-xs font-bold uppercase text-slate-600">Expected update</p><p className="mt-2 text-sm leading-6 text-slate-700">{expectedUpdate}</p></div></div></section>
    <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_.85fr]"><section className="service-panel"><div className="border-b border-slate-300 bg-slate-50 px-5 py-4"><h2 className="font-bold text-[#123B52]">Timeline</h2></div><ol className="p-5">{timeline.map((event, index) => <li className="relative border-l-2 border-slate-300 pb-6 pl-6 last:border-transparent last:pb-0" key={event.id}><span className={`absolute -left-[.55rem] top-0 grid h-4 w-4 place-items-center rounded-full text-[9px] ${event.action_required ? "bg-[#C65D11] text-white" : index === timeline.length - 1 ? "bg-moss text-white" : "bg-green-700 text-white"}`}>{!event.action_required ? "✓" : "!"}</span><p className="font-bold text-[#123B52]">{event.title}</p><p className="mt-1 text-xs font-semibold text-slate-600">{formatDate(event.event_date)}</p><p className="mt-2 text-sm leading-6 text-slate-700">{event.description}</p>{event.action_required && event.action_label && <p className="mt-2 text-sm font-bold text-[#C65D11]">Next: {event.action_label}</p>}</li>)}{!timeline.length && <li className="text-sm text-slate-700">No timeline events have been recorded yet.</li>}</ol></section>
      <aside className="space-y-5"><section className="service-panel p-5"><h2 className="font-bold text-[#123B52]">Application details</h2><dl className="mt-4 space-y-3 text-sm"><div><dt className="text-slate-600">Public authority</dt><dd className="font-semibold">{authorityName ?? "Not available"}</dd></div><div><dt className="text-slate-600">Date filed</dt><dd className="font-semibold">{formatDate(application.submitted_at)}</dd></div><div><dt className="text-slate-600">Payment</dt><dd className="font-semibold">₹{application.fee} · {readableStatus(application.payment_status)}</dd></div></dl></section><section className="service-panel p-5"><h2 className="font-bold text-[#123B52]">Documents & response</h2><p className="mt-2 text-sm leading-6 text-slate-700">{response?.summary ?? "No response document is available yet."}</p>{response && <details className="mt-4"><summary className="cursor-pointer text-sm font-bold text-[#075985] underline underline-offset-4">Read response</summary><p className="mt-3 text-sm leading-6 text-slate-700">{response.content}</p></details>}</section>{actionNeeded && <Link href="/appeal" className="block rounded bg-moss px-4 py-3 text-center text-sm font-bold text-white">Review appeal options</Link>}</aside>
    </div></div></main>;
}
