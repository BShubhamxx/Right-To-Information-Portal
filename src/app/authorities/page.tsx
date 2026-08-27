import { AuthorityDirectory } from "@/components/authority-directory";
import { SiteHeader } from "@/components/site-header";

export default function AuthoritiesPage() {
  return <main className="min-h-screen bg-canvas"><SiteHeader /><div className="mx-auto max-w-5xl px-4 py-8 lg:px-6"><p className="text-sm text-slate-600">Directory / Illustrative demo data</p><h1 className="mt-1 text-3xl font-bold text-[#123B52]">Public Authorities</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">Find a representative public authority by ministry, department or category. Suggested authorities in the filing flow are clearly marked as demo recommendations.</p><AuthorityDirectory /></div></main>;
}
