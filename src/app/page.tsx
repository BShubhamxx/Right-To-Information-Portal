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

      <section className="border-b border-slate-300 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,.85fr)] lg:items-start lg:px-6 lg:py-12">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-[#075985]">RTI Online Service</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#123B52] sm:text-5xl">File an RTI</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
                Ask for information from Central Government public authorities. Start with what you need to know;
                we will guide you through each step.
              </p>
            </div>

            <div className="max-w-4xl">
              <QuestionStarter />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link href="/track" className="font-semibold text-[#075985] underline underline-offset-4">
                Track an existing RTI
              </Link>
              <span className="text-slate-500">or</span>
              <Link href="/before-you-file" className="font-semibold text-[#075985] underline underline-offset-4">
                Read before filing
              </Link>
            </div>
          </div>

          <aside className="service-panel p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#075985]">What this portal does</p>
            <h2 className="mt-2 text-xl font-bold text-[#123B52]">A guided public-service workflow</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              The redesigned experience keeps the official RTI structure, while making the journey clearer for
              citizens who are filing, tracking, or appealing.
            </p>
            <dl className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-600">Central Government scope</dt>
                <dd className="text-right font-semibold text-[#123B52]">Only eligible authorities</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-600">Application fee</dt>
                <dd className="text-right font-semibold text-[#123B52]">₹10 for non-BPL applicants</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-600">Text limit</dt>
                <dd className="text-right font-semibold text-[#123B52]">3,000 characters</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-600">Appeal route</dt>
                <dd className="text-right font-semibold text-[#123B52]">First Appeal available</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-9 lg:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-[#123B52]">Services</h2>
          <p className="text-sm text-slate-600">Quick paths for the most common citizen actions.</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {services.map(([title, description, href, action]) => (
            <article className="service-panel flex h-full flex-col p-5" key={title}>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#123B52]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
              </div>
              <Link
                href={href}
                className="mt-5 inline-flex items-center text-sm font-bold text-[#075985] underline underline-offset-4"
              >
                {action} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-300 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,.85fr)] lg:items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#123B52]">Before you file</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
                <li>This prototype demonstrates Central Government public authorities only.</li>
                <li>The application fee is ₹10 for eligible non-BPL applicants.</li>
                <li>There is no fee for a First Appeal.</li>
                <li>You can attach supporting documents where needed.</li>
                <li>RTI application text can contain up to 3,000 characters.</li>
              </ul>
            </div>
            <div className="service-panel border-l-4 border-[#C65D11] bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#075985]">Help at a glance</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                This page keeps the key filing rules visible so citizens can decide quickly whether to continue,
                review published information first, or move into the RTI flow.
              </p>
              <Link href="/before-you-file" className="mt-4 inline-block text-sm font-bold text-[#075985] underline underline-offset-4">
                Read before filing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#123B52] text-sm text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
          <div>
            <p className="font-bold">RTI Online</p>
            <p className="mt-2 text-xs leading-5 text-white/75">Ask. Track. Know.</p>
          </div>
          <div>
            <p className="font-bold">Important links</p>
            <Link className="mt-2 block text-xs text-white/80 underline" href="/authorities">
              Public Authorities
            </Link>
            <Link className="mt-2 block text-xs text-white/80 underline" href="/faq">
              FAQ
            </Link>
          </div>
          <div>
            <p className="font-bold">Help</p>
            <Link className="mt-2 block text-xs text-white/80 underline" href="/help">
              How RTI works
            </Link>
            <Link className="mt-2 block text-xs text-white/80 underline" href="/contact">
              Contact
            </Link>
          </div>
          <div>
            <p className="font-bold">About this prototype</p>
            <p className="mt-2 text-xs leading-5 text-white/75">
              Independent hackathon prototype • Not an official government service
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
