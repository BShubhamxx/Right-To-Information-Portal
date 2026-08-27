import Link from "next/link";
import { QuestionStarter } from "@/components/question-starter";
import { SiteHeader } from "@/components/site-header";

const services = [
  ["File an RTI", "Start a new information request to a Central Government public authority.", "/build", "File an RTI"],
  ["Track an RTI", "Check the status, response or next steps for an existing application.", "/track", "Track application"],
  ["First Appeal", "Appeal if a response is delayed or does not fully address your request.", "/appeal", "Start First Appeal"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas">
      <SiteHeader />
      <section className="border-b border-slate-300 bg-white"><div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-12"><p className="text-sm font-semibold text-[#075985]">RTI Online Service</p><h1 className="mt-2 text-4xl font-bold tracking-tight text-[#123B52] sm:text-5xl">File an RTI</h1><p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">Ask for information from Central Government public authorities. Start with what you need to know; we will guide you through each step.</p><div className="mt-7 max-w-4xl"><QuestionStarter /></div><Link href="/track" className="mt-5 inline-block text-sm font-semibold text-[#075985] underline underline-offset-4">Track an existing RTI</Link></div></section>
      <section className="mx-auto max-w-7xl px-4 py-9 lg:px-6"><h2 className="text-2xl font-bold text-[#123B52]">Services</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{services.map(([title, description, href, action]) => <article className="service-panel p-5" key={title}><h3 className="text-lg font-bold text-[#123B52]">{title}</h3><p className="mt-2 min-h-14 text-sm leading-6 text-slate-700">{description}</p><Link href={href} className="mt-5 inline-block text-sm font-bold text-[#075985] underline underline-offset-4">{action} →</Link></article>)}</div></section>
      <section className="border-y border-slate-300 bg-slate-100"><div className="mx-auto max-w-7xl px-4 py-8 lg:px-6"><h2 className="text-2xl font-bold text-[#123B52]">Before you file</h2><ul className="mt-4 grid gap-x-8 gap-y-3 text-sm leading-6 text-slate-700 md:grid-cols-2"><li>• This prototype demonstrates Central Government public authorities only.</li><li>• The application fee is ₹10 for eligible non-BPL applicants.</li><li>• There is no fee for a First Appeal.</li><li>• You can attach supporting documents where needed.</li><li>• RTI application text can contain up to 3,000 characters.</li></ul><Link href="/before-you-file" className="mt-5 inline-block text-sm font-bold text-[#075985] underline underline-offset-4">Read before filing →</Link></div></section>
      <footer className="bg-[#123B52] text-sm text-white"><div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-6"><div><p className="font-bold">RTI Online</p><p className="mt-2 text-xs leading-5 text-white/75">Ask. Track. Know.</p></div><div><p className="font-bold">Important links</p><Link className="mt-2 block text-xs text-white/80 underline" href="/authorities">Public Authorities</Link><Link className="mt-2 block text-xs text-white/80 underline" href="/faq">FAQ</Link></div><div><p className="font-bold">Help</p><Link className="mt-2 block text-xs text-white/80 underline" href="/help">How RTI works</Link><Link className="mt-2 block text-xs text-white/80 underline" href="/contact">Contact</Link></div><div><p className="font-bold">About this prototype</p><p className="mt-2 text-xs leading-5 text-white/75">Independent hackathon prototype • Not an official government service</p></div></div></footer>
    </main>
  );
}
