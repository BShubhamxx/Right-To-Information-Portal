"use client";

import Link from "next/link";
import { AccessibilityControls } from "@/components/accessibility-controls";
import { useI18n } from "@/lib/i18n";

const primaryNav = [
  ["nav.home", "/"],
  ["nav.file", "/build"],
  ["nav.track", "/track"],
  ["nav.dashboard", "/dashboard"],
  ["nav.help", "/help"],
] as const;

const secondaryNav = [
  ["nav.firstAppeal", "/appeal"],
  ["nav.secondAppeal", "/second-appeal"],
  ["nav.authorities", "/authorities"],
  ["nav.knowledge", "/knowledge"],
  ["nav.faq", "/faq"],
  ["nav.contact", "/contact"],
] as const;

export function SiteHeader() {
  const { t } = useI18n();

  return (
    <header className="border-b border-slate-300 bg-white">
      <div className="tricolour-rule" aria-hidden="true">
        <span className="bg-[#C65D11]" />
        <span className="bg-white" />
        <span className="bg-[#138046]" />
      </div>

      <div className="bg-[#123B52] text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 lg:px-6">
          <span className="font-semibold">{t("nav.portal")}</span>
          <AccessibilityControls />
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label={t("nav.home")}>
          <span className="grid h-10 w-10 place-items-center rounded-md bg-moss text-sm font-bold text-white" aria-hidden="true">
            RT
          </span>
          <span className="min-w-0">
            <strong className="block text-lg leading-5 text-[#123B52]">{t("brand.title")}</strong>
            <span className="block text-xs leading-4 text-slate-600">{t("brand.subtitle")}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-[#123B52] lg:flex" aria-label="Primary navigation">
          {primaryNav.map(([label, href]) => (
            <Link key={label} href={href} className="transition hover:text-[#075985]">
              {t(label)}
            </Link>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none rounded border border-slate-400 px-3 py-2 text-sm font-bold text-[#123B52]">
            {t("nav.menu")}
          </summary>
          <nav className="absolute right-0 z-10 mt-2 w-56 border border-slate-300 bg-white p-2 text-sm shadow-soft">
            {primaryNav.map(([label, href]) => (
              <Link key={label} className="block rounded px-3 py-2 text-[#123B52] hover:bg-slate-100" href={href}>
                {t(label)}
              </Link>
            ))}
            <div className="my-2 border-t border-slate-200" />
            {secondaryNav.map(([label, href]) => (
              <Link key={label} className="block rounded px-3 py-2 text-[#123B52] hover:bg-slate-100" href={href}>
                {t(label)}
              </Link>
            ))}
            <Link className="block rounded px-3 py-2 font-semibold text-[#075985] hover:bg-slate-100" href="/login">
              {t("nav.demoSignIn")}
            </Link>
            <Link className="block rounded px-3 py-2 text-slate-700 hover:bg-slate-100" href="/auth/signout">
              {t("nav.signOut")}
            </Link>
          </nav>
        </details>
      </div>

      <div className="hidden border-t border-slate-200 bg-slate-50 lg:block">
        <nav className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-2 text-xs font-semibold text-slate-700" aria-label="Service navigation">
          {secondaryNav.map(([label, href]) => (
            <Link key={label} href={href} className="transition hover:text-[#075985]">
              {t(label)}
            </Link>
          ))}
          <Link href="/login" className="ml-auto text-[#075985]">
            {t("nav.demoSignIn")}
          </Link>
          <Link href="/auth/signout" className="text-slate-600">
            {t("nav.signOut")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
