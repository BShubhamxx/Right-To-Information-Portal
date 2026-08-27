import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const points = [
  ["Who can file", "Indian citizens can request information from Central Government ministries, departments and public authorities."],
  ["Where to file", "Do not use this prototype for State Government authorities or Government of NCT Delhi. Those applications need the relevant State portal."],
  ["Application fee", "The illustrative application fee is ₹10 for eligible non-BPL applicants. A First Appeal has no fee."],
  ["BPL applicants", "Eligible applicants below the poverty line have no application fee and must attach the relevant BPL certificate."],
  ["Your application text", "Use up to 3,000 characters. If you need more space, attach a supporting PDF. Never upload Aadhaar, PAN or other personal identity documents."],
  ["What happens next", "You receive a registration number after submission. Track updates and consider a First Appeal if a response is delayed or incomplete."],
];

export default function BeforeYouFilePage() {
  return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-5xl px-4 py-8 lg:px-6"><p className="text-sm text-slate-600">Help / Before you file</p><h1 className="mt-1 text-3xl font-bold text-[#123B52]">Before you file an RTI</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">The RTI process works best when the request is directed to the right public authority and asks for specific existing records. This page explains the important requirements in plain language.</p><div className="mt-7 grid gap-4 md:grid-cols-2">{points.map(([title, text]) => <section key={title} className="service-panel p-5"><h2 className="font-bold text-[#123B52]">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-700">{text}</p></section>)}</div><section className="service-panel mt-6 border-l-4 border-[#C65D11] p-5"><h2 className="font-bold text-[#123B52]">Look for published information first</h2><p className="mt-2 text-sm leading-6 text-slate-700">Some information may already be available. Search the illustrative public information directory before filing a request.</p><div className="mt-4 flex flex-wrap gap-3"><Link href="/public-information" className="rounded bg-moss px-4 py-2 text-sm font-bold text-white">Search public information</Link><Link href="/build" className="px-4 py-2 text-sm font-bold text-[#075985] underline underline-offset-4">Still want to file an RTI?</Link></div></section></div></main>;
}
