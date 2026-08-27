"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <header className="border-b border-portal-border bg-white">
      <div className="portal-utility-bar text-xs">
        <div className="portal-container flex min-h-10 items-center justify-between gap-4">
          <span className="font-semibold">{t("nav.portal")}</span>
          <AccessibilityControls />
        </div>
      </div>

      <div className="portal-container flex min-h-24 items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={t("nav.home")}>
          <Image src="/assets/indian-emblem.png" alt="" width={42} height={56} className="h-12 w-auto object-contain" aria-hidden="true" />
          <span className="min-w-0">
            <strong className="block text-2xl leading-7 text-portal-navy">RTI Online</strong>
            <span className="hidden text-xs leading-4 text-slate-600 sm:block">Version 2.0 · An Initiative of Department of Personnel &amp; Training, Government of India</span>
          </span>
        </Link>

        <nav className="hidden items-stretch gap-8 text-base portal-nav-link lg:flex" aria-label="Primary navigation">
          {primaryNav.map(([label, href]) => (
            <Link key={label} href={href} className={`flex items-center border-b-2 px-1 pt-1 transition hover:text-portal-blue ${pathname === href ? "border-portal-navy font-bold" : "border-transparent"}`}>
              {t(label)}
            </Link>
          ))}
        </nav>


        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none rounded border border-portal-border px-4 py-3 text-sm font-bold text-portal-navy">
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

    </header>
  );
}
