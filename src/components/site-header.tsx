import Link from "next/link";
import { AccessibilityControls } from "@/components/accessibility-controls";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-300 bg-white">
      <div className="tricolour-rule" />
      <div className="bg-[#123B52] text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-6">
          <span>Citizen services portal</span>
          <AccessibilityControls />
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="RTI home">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-moss text-lg font-bold text-white" aria-hidden="true"><span className="border-2 border-white px-1 text-xs">i</span></span>
          <span><strong className="block text-lg leading-5 text-[#123B52]">RTI</strong><span className="text-xs text-slate-600">Right to Information</span></span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-[#123B52] lg:flex" aria-label="Primary navigation">
          <Link href="/">Home</Link><Link href="/build">File an RTI</Link><Link href="/track">Track an RTI</Link><Link href="/dashboard">My RTIs</Link><Link href="/help">Help</Link>
        </nav>
        <details className="relative lg:hidden"><summary className="cursor-pointer rounded border border-slate-400 px-3 py-2 text-sm font-bold text-[#123B52]">Menu</summary><nav className="absolute right-0 z-10 mt-2 w-48 border border-slate-300 bg-white p-2 text-sm shadow-soft"><Link className="block p-2" href="/">Home</Link><Link className="block p-2" href="/build">File an RTI</Link><Link className="block p-2" href="/track">Track an RTI</Link><Link className="block p-2" href="/help">Help</Link></nav></details>
      </div>
      <div className="hidden border-t border-slate-200 bg-slate-50 lg:block"><nav className="mx-auto flex max-w-7xl gap-6 px-6 py-2 text-xs font-semibold text-slate-700" aria-label="Service navigation"><Link href="/appeal">First Appeal</Link><Link href="/second-appeal">Second Appeal</Link><Link href="/authorities">Public Authorities</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact</Link><Link href="/login" className="ml-auto text-moss">Demo sign in</Link></nav></div>
    </header>
  );
}
