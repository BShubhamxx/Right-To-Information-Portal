import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const applications = [
  ["Road repair expenditure — Pune", "DEMO/R/E/26/00421", "UNDER REVIEW", "The department is reviewing your request.", "No action needed.", "/rtis/demo-road-pune"],
  ["Government school infrastructure — Nashik", "DEMO/R/E/26/00422", "RESPONSE OVERDUE", "We have not received a response within the expected period.", "Check appeal options.", "/rtis/demo-school-nashik"],
  ["Public hospital equipment procurement — Mumbai", "DEMO/R/E/26/00423", "RESPONSE RECEIVED", "A response has been issued.", "View response.", "/rtis/demo-hospital-mumbai"],
];

export default function DashboardPage() {
  return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-5xl px-4 py-8 lg:px-6"><p className="text-sm text-slate-600">Demo Citizen</p><h1 className="mt-1 text-3xl font-bold text-[#123B52]">My RTIs</h1><p className="mt-2 text-sm text-slate-700">3 applications</p><div className="mt-6 space-y-4">{applications.map(([title, number, status, meaning, action, href]) => <article className="service-panel p-5" key={number}><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><h2 className="font-bold text-[#123B52]">{title}</h2><p className="mt-1 font-mono text-xs text-slate-600">{number}</p></div><span className={`w-fit px-2 py-1 text-xs font-bold ${status === "RESPONSE OVERDUE" ? "bg-amber-100 text-amber-900" : status === "RESPONSE RECEIVED" ? "bg-green-100 text-green-900" : "bg-blue-100 text-blue-900"}`}>{status}</span></div><div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-2"><p className="text-sm text-slate-700"><strong>What this means: </strong>{meaning}</p><p className="text-sm text-slate-700"><strong>Your next action: </strong>{action}</p></div><Link href={href} className="mt-4 inline-block text-sm font-bold text-[#075985] underline underline-offset-4">View details →</Link></article>)}</div></div></main>;
}
