"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { analyzeQuestionFallback, generateRtiDraftFallback } from "@/lib/ai";
import { calculateReadiness, decomposeQuestion, determineJurisdiction } from "@/lib/intelligence";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/client";

const defaultQuestion = "How much money was spent on road repairs in Pune in 2025?";
const labels = ["Question", "Authority", "Applicant", "Documents", "Review", "Payment"];
const allowedDocumentTypes = ["application/pdf"];

export function RTIBuilder() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuestion = searchParams.get("question") || defaultQuestion;
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState(initialQuestion);
  const [draft, setDraft] = useState(() => generateRtiDraftFallback(initialQuestion, analyzeQuestionFallback(initialQuestion)));
  const [acknowledged, setAcknowledged] = useState(false);
  const [citizen, setCitizen] = useState("Indian citizen");
  const [bpl, setBpl] = useState("No");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("DEMO/R/E/26/00424");
  const analysis = useMemo(() => analyzeQuestionFallback(question || defaultQuestion), [question]);
  const navigation = useMemo(() => determineJurisdiction(question || defaultQuestion), [question]);
  const decomposition = useMemo(() => decomposeQuestion(question || defaultQuestion), [question]);
  const readiness = useMemo(() => calculateReadiness(question || defaultQuestion, navigation.jurisdiction !== "Unknown"), [question, navigation.jurisdiction]);
  const fee = bpl === "Yes" ? 0 : 10;

  useEffect(() => {
    const stored = window.localStorage.getItem("rti-draft-before-login");
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Partial<{ question: string; draft: string; citizen: string; bpl: string; fileName: string; paymentMethod: string }>;
      if (parsed.question) setQuestion(parsed.question);
      if (parsed.draft) setDraft(parsed.draft);
      if (parsed.citizen) setCitizen(parsed.citizen);
      if (parsed.bpl) setBpl(parsed.bpl);
      if (parsed.fileName) setFileName(parsed.fileName);
      if (parsed.paymentMethod) setPaymentMethod(parsed.paymentMethod);
      setStep(5);
    } catch {
      window.localStorage.removeItem("rti-draft-before-login");
    }
  }, []);

  function next() {
    if (step === 0) setDraft(`${generateRtiDraftFallback(question || defaultQuestion, analysis)}\n\nSuggested route: ${navigation.routeLabel}. Information groups identified: ${decomposition.requests.map((request) => request.label).join(", ")}. Readiness: ${readiness.state}.`);
    setStep((current) => Math.min(current + 1, 5));
  }
  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFileError("");
    setFileName("");
    if (!file) return;
    if (!allowedDocumentTypes.includes(file.type)) return setFileError("Please choose a PDF document.");
    if (file.size > 10 * 1024 * 1024) return setFileError("The file must be 10 MB or smaller.");
    setFileName(file.name);
  }
  async function submitApplication() {
    setSubmitting(true);
    setSubmissionError("");
    const supabase = createClient();
    const { data: userResult, error: userError } = await supabase.auth.getUser();
    const user = userResult.user;
    if (userError || !user) {
      window.localStorage.setItem("rti-draft-before-login", JSON.stringify({ question, draft, citizen, bpl, fileName, paymentMethod }));
      const next = `/build?question=${encodeURIComponent(question || defaultQuestion)}`;
      router.push(`/login?next=${encodeURIComponent(next)}`);
      return;
    }

    const authorityResult = await supabase.from("authorities").select("id,name").eq("name", analysis.authority).maybeSingle();
    const fallbackAuthority = authorityResult.data ? null : await supabase.from("authorities").select("id,name").eq("active", true).limit(1).maybeSingle();
    const authorityId = authorityResult.data?.id ?? fallbackAuthority?.data?.id;
    if (!authorityId) {
      setSubmitting(false);
      setSubmissionError("Could not find a demo authority. Please seed authorities before filing.");
      return;
    }

    const generatedNumber = `DEMO/R/E/${String(new Date().getFullYear()).slice(-2)}/${String(Math.floor(Math.random() * 90000) + 10000)}`;
    const inserted = await supabase.from("rti_applications").insert({
      user_id: user.id,
      registration_number: generatedNumber,
      title: `${analysis.topic} - ${analysis.location}`,
      original_question: question,
      polished_question: draft,
      authority_id: authorityId,
      status: "SUBMITTED",
      submitted_at: new Date().toISOString(),
      response_due_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      fee,
      payment_status: "SUCCESS",
    }).select("id,registration_number").single();

    if (inserted.error || !inserted.data) {
      setSubmitting(false);
      setSubmissionError(inserted.error?.message ?? "Could not submit the RTI application.");
      return;
    }

    await Promise.all([
      supabase.from("payments").insert({ rti_id: inserted.data.id, user_id: user.id, amount: fee, method: paymentMethod, status: "SUCCESS", transaction_reference: `DEMO-PAY-${Date.now()}` }),
      supabase.from("timeline_events").insert({ rti_id: inserted.data.id, status: "SUBMITTED", title: "Application submitted", description: "The RTI application was submitted through the demo portal.", action_required: false }),
      supabase.from("notifications").insert({ user_id: user.id, title: "Your application was submitted successfully", description: `RTI ${inserted.data.registration_number} has been recorded under your account.`, action_url: `/rtis/${inserted.data.id}` }),
    ]);

    window.localStorage.removeItem("rti-draft-before-login");
    setRegistrationNumber(inserted.data.registration_number);
    setSubmitted(true);
    setSubmitting(false);
  }
  const canContinue = step === 0 ? Boolean(question.trim() && acknowledged) : step === 2 ? citizen === "Indian citizen" : true;
  const body = [
    <section key="question" className="service-panel p-5 sm:p-7"><p className="eyebrow">Section 01 · Request details</p><h1 className="title">What information are you looking for?</h1><p className="intro">Describe the information you need in your own words. You do not need to know RTI terms to begin.</p><label className="mt-7 block text-sm font-bold text-[#123B52]" htmlFor="rti-question">Your request <span className="text-red-700">*</span></label><textarea id="rti-question" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={3000} rows={6} className="field mt-2" placeholder="Describe what you want to know…" /><div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-600"><span>Need help? We will suggest clearer wording in the next steps.</span><span>{question.length}/3,000 characters</span></div><div className="mt-6 border-l-4 border-[#C65D11] bg-[#FFF7ED] p-4 text-sm leading-6 text-slate-700"><p><strong>Please note:</strong> This independent prototype represents Central Government public authorities only. Do not enter Aadhaar, PAN or other personal identification documents.</p><label className="mt-3 flex cursor-pointer gap-2"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} /><span>I have read and understood the filing guidance.</span></label></div></section>,
    <section key="authority" className="service-panel p-5 sm:p-7"><p className="eyebrow">Section 02 · Public authority</p><h1 className="title">Confirm the request and authority</h1><p className="intro">These are suggested details based on your question. You can edit the request in the next sections.</p><dl className="mt-7 grid border border-slate-300 sm:grid-cols-2">{[["Topic", analysis.topic], ["Location", analysis.location], ["Information requested", analysis.information], ["Period", analysis.timePeriod]].map(([label, value]) => <div className="border-b border-slate-300 p-4 even:border-l sm:[&:nth-last-child(-n+2)]:border-b-0" key={label}><dt className="text-xs font-bold uppercase tracking-wide text-slate-600">{label}</dt><dd className="mt-2 font-semibold text-slate-900">{value}</dd></div>)}</dl><article className="mt-6 border border-slate-300 bg-slate-50 p-5"><p className="text-xs font-bold uppercase tracking-wide text-[#075985]">Suggested authority · demo data</p><h2 className="mt-2 text-xl font-bold text-[#123B52]">{analysis.authority}</h2><p className="mt-3 text-sm leading-6 text-slate-700">{analysis.authorityReason}</p><Link href="/authorities" className="mt-4 inline-block text-sm font-bold text-[#075985] underline underline-offset-4">Search another authority</Link></article></section>,
    <section key="applicant" className="service-panel p-5 sm:p-7"><p className="eyebrow">Section 03 · Applicant details</p><h1 className="title">Your details</h1><p className="intro">Fields marked with <span className="text-red-700">*</span> are required. This prototype uses fictional demo details—do not enter real personal information.</p><fieldset className="mt-7"><legend className="text-sm font-bold text-[#123B52]">Eligibility <span className="text-red-700">*</span></legend><div className="mt-3 flex flex-wrap gap-4 text-sm"><label><input type="radio" name="citizen" value="Indian citizen" checked={citizen === "Indian citizen"} onChange={(event) => setCitizen(event.target.value)} /> Indian citizen</label><label><input type="radio" name="citizen" value="Other" checked={citizen === "Other"} onChange={(event) => setCitizen(event.target.value)} /> Other</label></div>{citizen !== "Indian citizen" && <p className="mt-3 border-l-4 border-red-700 bg-red-50 p-3 text-sm text-red-900">Only Indian citizens are eligible to file an RTI request through this demonstration.</p>}</fieldset><div className="mt-6 grid gap-4 sm:grid-cols-2">{[["Full name", "Demo Citizen"], ["Email", "demo@rti-demo.in"], ["Confirm email", "demo@rti-demo.in"], ["Mobile number", "+91 98XXXXXX42"], ["Address", "Demo address — no real data"], ["PIN code", "411001"]].map(([label, value]) => <label className="block text-sm font-bold text-[#123B52]" key={label}>{label} {label !== "Address" && <span className="text-red-700">*</span>}<input defaultValue={value} className="mt-2 min-h-11 w-full rounded border border-slate-400 bg-white px-3 font-normal text-slate-800" /></label>)}</div><div className="mt-5 grid gap-4 sm:grid-cols-3"><label className="text-sm font-bold text-[#123B52]">Gender<select className="mt-2 min-h-11 w-full rounded border border-slate-400 bg-white px-3 font-normal"><option>Prefer not to say</option><option>Male</option><option>Female</option><option>Third Gender</option></select></label><label className="text-sm font-bold text-[#123B52]">Area<select className="mt-2 min-h-11 w-full rounded border border-slate-400 bg-white px-3 font-normal"><option>Urban</option><option>Rural</option></select></label><label className="text-sm font-bold text-[#123B52]">Educational status<select className="mt-2 min-h-11 w-full rounded border border-slate-400 bg-white px-3 font-normal"><option>Graduate</option><option>12th standard</option><option>Below 12th standard</option><option>Literate</option><option>Illiterate</option></select></label></div><fieldset className="mt-6 border-t border-slate-200 pt-5"><legend className="text-sm font-bold text-[#123B52]">Below Poverty Line (BPL)</legend><p className="mt-1 text-xs text-slate-600">Eligible BPL applicants pay ₹0 and must attach a BPL certificate in the next step.</p><div className="mt-3 flex gap-4 text-sm"><label><input type="radio" name="bpl" value="No" checked={bpl === "No"} onChange={(event) => setBpl(event.target.value)} /> No</label><label><input type="radio" name="bpl" value="Yes" checked={bpl === "Yes"} onChange={(event) => setBpl(event.target.value)} /> Yes</label></div></fieldset></section>,
    <section key="documents" className="service-panel p-5 sm:p-7"><p className="eyebrow">Section 04 · Supporting documents</p><h1 className="title">Attach a document if needed</h1><p className="intro">You can attach a supporting PDF, including a BPL certificate when you selected BPL eligibility. It is optional unless required for that exemption.</p><label className="mt-7 block text-sm font-bold text-[#123B52]" htmlFor="supporting-document">Supporting PDF {bpl === "Yes" && <span className="text-red-700">*</span>}</label><input id="supporting-document" type="file" accept="application/pdf" onChange={handleFile} className="mt-3 block text-sm" /><p className="mt-2 text-xs text-slate-600">PDF only · up to 10 MB · files are stored in a protected demo bucket once Supabase Storage is enabled.</p>{fileError && <p className="mt-3 text-sm font-semibold text-red-700">{fileError}</p>}{fileName && <div className="mt-4 flex items-center justify-between border border-green-300 bg-green-50 p-3 text-sm text-green-900"><span>Attached: {fileName}</span><button type="button" onClick={() => setFileName("")} className="font-bold underline">Remove</button></div>}{bpl === "Yes" && !fileName && <p className="mt-4 border-l-4 border-[#C65D11] bg-[#FFF7ED] p-3 text-sm text-slate-700">A BPL certificate is required to claim the ₹0 application fee.</p>}</section>,
    <section key="review" className="service-panel p-5 sm:p-7"><p className="eyebrow">Section 05 · Review</p><h1 className="title">Review your application</h1><p className="intro">You can go back to edit any section. Suggested wording is assistance only; it is not an official determination.</p><div className="mt-7 divide-y divide-slate-200 border border-slate-300 bg-white text-sm"><div className="p-4"><p className="font-bold text-[#123B52]">Public authority</p><p className="mt-1 text-slate-700">{analysis.authority}</p></div><div className="p-4"><p className="font-bold text-[#123B52]">RTI application text</p><textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={7} maxLength={3000} className="field mt-2" /><p className="mt-2 text-right text-xs text-slate-600">{draft.length}/3,000 characters</p></div><div className="grid gap-3 p-4 sm:grid-cols-2"><div><p className="font-bold text-[#123B52]">Applicant</p><p className="mt-1 text-slate-700">Demo Citizen · Indian citizen</p></div><div><p className="font-bold text-[#123B52]">Supporting document</p><p className="mt-1 text-slate-700">{fileName || "Not attached"}</p></div></div><div className="p-4"><p className="font-bold text-[#123B52]">Application fee</p><p className="mt-1 text-slate-700">₹{fee} {bpl === "Yes" ? "· BPL fee exemption" : "· non-BPL applicant"}</p></div></div></section>,
    <section key="payment" className="service-panel p-5 sm:p-7"><p className="eyebrow">Section 06 · Demo payment</p><h1 className="title">Complete application fee</h1><p className="intro">This is a mock payment. No money will move and you must not enter real card, UPI or bank details.</p><div className="mt-7 border border-slate-300 bg-slate-50 p-4"><p className="text-sm text-slate-600">Application fee</p><p className="mt-1 text-2xl font-bold text-[#123B52]">₹{fee}</p></div>{fee > 0 && <fieldset className="mt-6"><legend className="text-sm font-bold text-[#123B52]">Payment method</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{[["UPI", "UPI"], ["CARD", "Debit / credit card"], ["NET_BANKING", "Internet banking"], ["RUPAY", "RuPay card"]].map(([value, label]) => <label className={`border p-4 text-sm ${paymentMethod === value ? "border-moss bg-blue-50" : "border-slate-300 bg-white"}`} key={value}><input type="radio" name="payment" value={value} checked={paymentMethod === value} onChange={(event) => setPaymentMethod(event.target.value)} /> <span className="ml-2 font-bold">{label}</span></label>)}</div></fieldset>}<div className="mt-6 border-l-4 border-[#075985] bg-blue-50 p-4 text-sm leading-6 text-slate-700">If payment is received but a registration number is delayed, the application will show <strong>Payment received, registration pending</strong>. Do not pay again; the mock reconciliation process will generate the number.</div></section>,
  ][step];
  if (submitted) return <div className="min-h-screen bg-canvas"><SiteHeader /><main className="mx-auto max-w-3xl px-4 py-10 lg:px-6"><section className="service-panel border-t-4 border-green-700 p-6 sm:p-8"><p className="text-sm font-bold text-green-800">APPLICATION SUBMITTED</p><h1 className="mt-2 text-3xl font-bold text-[#123B52]">Your RTI has been submitted</h1><p className="mt-3 text-sm leading-7 text-slate-700">You&apos;re done for now. This fictional demo submission is recorded under your signed-in account only; no information was sent to any government authority.</p><div className="mt-7 border border-slate-300 bg-slate-50 p-5"><p className="text-xs font-bold uppercase text-slate-600">Registration number</p><p className="mt-2 font-mono text-xl font-bold text-[#123B52]">{registrationNumber}</p><button type="button" onClick={() => navigator.clipboard?.writeText(registrationNumber)} className="mt-3 text-sm font-bold text-[#075985] underline underline-offset-4">Copy registration number</button></div><dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-slate-600">Public authority</dt><dd className="font-semibold">{analysis.authority}</dd></div><div><dt className="text-slate-600">Fee paid</dt><dd className="font-semibold">₹{fee} · Mock payment successful</dd></div><div><dt className="text-slate-600">Date submitted</dt><dd>29 Aug 2026</dd></div><div><dt className="text-slate-600">Expected response</dt><dd>Within the applicable RTI response period</dd></div></dl><h2 className="mt-8 font-bold text-[#123B52]">What happens next</h2><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700"><li>The application is recorded and routed to the selected authority in this demo.</li><li>The authority reviews the request.</li><li>You receive a mock notification when the status changes or a response is issued.</li></ol><div className="mt-7 flex flex-wrap gap-3"><Link href="/track" className="rounded bg-moss px-4 py-2 text-sm font-bold text-white">Track with registration number</Link><Link href="/dashboard" className="px-4 py-2 text-sm font-bold text-[#075985] underline underline-offset-4">Go to My RTIs</Link></div></section></main></div>;
  return <div className="min-h-screen bg-canvas"><SiteHeader /><main className="mx-auto max-w-4xl px-4 pb-16 pt-8 lg:px-6"><div className="border-b border-slate-300 pb-5"><p className="text-sm text-slate-600">File an RTI</p><h1 className="mt-1 text-2xl font-bold text-[#123B52]">New RTI application</h1></div><ol className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6" aria-label="RTI application progress">{labels.map((label, index) => <li key={label} className="text-xs font-semibold text-slate-600"><span className={`mb-2 grid h-7 w-7 place-items-center rounded-full border text-xs ${index < step ? "border-green-700 bg-green-700 text-white" : index === step ? "border-moss bg-moss text-white" : "border-slate-400 bg-white text-slate-600"}`}>{index < step ? "✓" : String(index + 1).padStart(2, "0")}</span><span className="hidden sm:inline">{label}</span>{index === step && <span className="sm:hidden">{label} · {step + 1} of 6</span>}</li>)}</ol><div className="mt-7">{body}</div>{step === 5 && <p className="mt-4 border-l-4 border-[#075985] bg-blue-50 p-3 text-sm leading-6 text-slate-700">You can prepare this RTI without signing in. Sign in is required only now so the final application, payment record, timeline and notifications are saved under your account.</p>}{submissionError && <p className="mt-4 border-l-4 border-red-700 bg-red-50 p-3 text-sm leading-6 text-red-900">{submissionError}</p>}<div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-300 pt-5"><button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="min-h-11 px-3 text-sm font-bold text-[#075985] underline underline-offset-4 disabled:invisible">Back</button>{step < 5 ? <button type="button" onClick={next} disabled={!canContinue || (step === 3 && Boolean(fileError)) || (step === 3 && bpl === "Yes" && !fileName)} className="min-h-11 rounded bg-moss px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-400">{step === 0 ? "Confirm details" : "Continue"}</button> : <button type="button" onClick={submitApplication} disabled={submitting} className="min-h-11 rounded bg-moss px-5 text-sm font-bold text-white disabled:bg-slate-400">{submitting ? "Saving..." : "Submit application"}</button>}</div></main></div>;
}
