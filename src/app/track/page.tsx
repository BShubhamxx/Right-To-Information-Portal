import { SiteHeader } from "@/components/site-header";
import { TrackRTI } from "@/components/track-rti";

export default function TrackPage() {
  return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-3xl px-4 py-8 lg:px-6"><p className="text-sm text-slate-600">Track an RTI</p><h1 className="mt-1 text-3xl font-bold text-[#123B52]">Check your application status</h1><p className="mt-3 text-sm leading-7 text-slate-700">Use your registration number to view an application, response, payment update or next step. This demonstration does not require a real OTP.</p><TrackRTI /></div></main>;
}
