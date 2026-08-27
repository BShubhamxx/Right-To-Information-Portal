import Link from "next/link";
import { AccessibilityControls } from "@/components/accessibility-controls";

const primaryNav = [
  ["Home", "/"],
  ["File an RTI", "/build"],
  ["Track an RTI", "/track"],
  ["My RTIs", "/dashboard"],
  ["Help", "/help"],
] as const;

const secondaryNav = [
  ["First Appeal", "/appeal"],
  ["Second Appeal", "/second-appeal"],
  ["Public Authorities", "/authorities"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-slate-300 bg-white">
      <div className="tricolour-rule" aria-hidden="true">
        <span className="bg-[#C65D11]" />
        <span className="bg-white" />
        <span className="bg-[#138046]" />
      </div>

      <div className="bg-[#123B52] text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 lg:px-6">
          <span className="font-semibold">Citizen services portal</span>
          <AccessibilityControls />
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="RTI home">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-moss text-sm font-bold text-white" aria-hidden="true">
            RT
          </span>
          <span className="min-w-0">
            <strong className="block text-lg leading-5 text-[#123B52]">RTI</strong>
            <span className="block text-xs leading-4 text-slate-600">Right to Information</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-[#123B52] lg:flex" aria-label="Primary navigation">
          {primaryNav.map(([label, href]) => (
            <Link key={label} href={href} className="transition hover:text-[#075985]">
              {label}
            </Link>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none rounded border border-slate-400 px-3 py-2 text-sm font-bold text-[#123B52]">
            Menu
          </summary>
          <nav className="absolute right-0 z-10 mt-2 w-56 border border-slate-300 bg-white p-2 text-sm shadow-soft">
            {primaryNav.map(([label, href]) => (
              <Link key={label} className="block rounded px-3 py-2 text-[#123B52] hover:bg-slate-100" href={href}>
                {label}
              </Link>
            ))}
            <div className="my-2 border-t border-slate-200" />
            {secondaryNav.map(([label, href]) => (
              <Link key={label} className="block rounded px-3 py-2 text-[#123B52] hover:bg-slate-100" href={href}>
                {label}
              </Link>
            ))}
            <Link className="block rounded px-3 py-2 font-semibold text-[#075985] hover:bg-slate-100" href="/login">
              Demo sign in
            </Link>
          </nav>
        </details>
      </div>

      <div className="hidden border-t border-slate-200 bg-slate-50 lg:block">
        <nav className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-2 text-xs font-semibold text-slate-700" aria-label="Service navigation">
          {secondaryNav.map(([label, href]) => (
            <Link key={label} href={href} className="transition hover:text-[#075985]">
              {label}
            </Link>
          ))}
          <Link href="/login" className="ml-auto text-[#075985]">
            Demo sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
