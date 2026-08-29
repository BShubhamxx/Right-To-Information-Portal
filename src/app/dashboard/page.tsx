import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/server";

type RtiRecord = {
  id: string;
  title: string;
  registration_number: string;
  status: string;
  submitted_at: string | null;
  response_due_at: string | null;
  payment_status: string;
};

function readableStatus(status: string) {
  return status.replaceAll("_", " ");
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const profile = user.user
    ? await supabase.from("profiles").select("name,email,phone").eq("id", user.user.id).maybeSingle()
    : { data: null };
  const { data } = user.user
    ? await supabase.from("rti_applications").select("id,title,registration_number,status,submitted_at,response_due_at,payment_status").order("created_at", { ascending: false })
    : { data: null };

  const records = (data ?? []) as RtiRecord[];
  const needsAttention = records.filter((item) => ["RESPONSE_OVERDUE", "SUPPORTING_DOCUMENT_REQUIRED", "ADDITIONAL_FEE_REQUIRED", "APPEAL_AVAILABLE", "RETURNED"].includes(item.status)).length;
  const underReview = records.filter((item) => ["SUBMITTED", "RECEIVED", "UNDER_REVIEW", "TRANSFERRED"].includes(item.status)).length;
  const completed = records.filter((item) => ["RESPONSE_RECEIVED", "CLOSED"].includes(item.status)).length;
  const displayName = profile.data?.name || user.user?.user_metadata?.name || "Citizen";
  const email = profile.data?.email || user.user?.email || "Signed-in account";

  return (
    <main className="min-h-screen bg-canvas">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        <p className="text-sm text-slate-600">Account / My RTIs</p>
        <div className="mt-2 grid gap-5 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] lg:items-start">
          <section className="service-panel p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[#075985]">Signed-in citizen</p>
            <h1 className="mt-2 text-3xl font-bold text-[#123B52]">{displayName}</h1>
            <p className="mt-1 text-sm text-slate-700">{email}</p>
            <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-200 pt-5 text-center text-sm">
              <div><dt className="text-2xl font-bold text-[#123B52]">{records.length}</dt><dd className="mt-1 text-xs text-slate-600">Applications</dd></div>
              <div><dt className="text-2xl font-bold text-[#C65D11]">{needsAttention}</dt><dd className="mt-1 text-xs text-slate-600">Needs attention</dd></div>
              <div><dt className="text-2xl font-bold text-green-700">{completed}</dt><dd className="mt-1 text-xs text-slate-600">Completed</dd></div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/build" className="rounded bg-moss px-4 py-2 text-sm font-bold text-white">File new RTI</Link>
              <Link href="/notifications" className="px-4 py-2 text-sm font-bold text-[#075985] underline underline-offset-4">Notifications</Link>
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-3xl font-bold text-[#123B52]">My RTIs</h2>
                <p className="mt-1 text-sm text-slate-700">{records.length} account-linked applications</p>
              </div>
              <div className="flex gap-2 text-xs font-bold">
                <span className="bg-amber-100 px-2 py-1 text-amber-900">Needs attention {needsAttention}</span>
                <span className="bg-blue-100 px-2 py-1 text-blue-900">Under review {underReview}</span>
                <span className="bg-green-100 px-2 py-1 text-green-900">Completed {completed}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {records.map((record) => (
                <article className="service-panel p-5" key={record.id}>
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div><h3 className="font-bold text-[#123B52]">{record.title}</h3><p className="mt-1 font-mono text-xs text-slate-600">{record.registration_number}</p></div>
                    <span className="w-fit bg-blue-100 px-2 py-1 text-xs font-bold text-blue-900">{readableStatus(record.status)}</span>
                  </div>
                  <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-3">
                    <p className="text-sm text-slate-700"><strong>Payment: </strong>{readableStatus(record.payment_status)}</p>
                    <p className="text-sm text-slate-700"><strong>Submitted: </strong>{record.submitted_at ? new Date(record.submitted_at).toLocaleDateString("en-IN") : "Draft"}</p>
                    <p className="text-sm text-slate-700"><strong>Expected: </strong>{record.response_due_at ? new Date(record.response_due_at).toLocaleDateString("en-IN") : "After submission"}</p>
                  </div>
                  <Link href={`/rtis/${record.id}`} className="mt-4 inline-block text-sm font-bold text-[#075985] underline underline-offset-4">View case record →</Link>
                </article>
              ))}

              {!records.length && (
                <section className="service-panel border-l-4 border-[#075985] p-5">
                  <h3 className="font-bold text-[#123B52]">No RTIs are linked to this account yet</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">You can still track an existing application by registration number. New RTIs submitted after sign-in will appear here.</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link href="/build" className="rounded bg-moss px-4 py-2 text-sm font-bold text-white">File an RTI</Link>
                    <Link href="/track" className="px-4 py-2 text-sm font-bold text-[#075985] underline underline-offset-4">Track by registration number</Link>
                  </div>
                </section>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
