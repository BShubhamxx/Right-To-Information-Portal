"use client";

import { useI18n, type TranslationKey } from "@/lib/i18n";

export function LocalizedPageHeading({ breadcrumb, title, intro }: { breadcrumb: TranslationKey; title: TranslationKey; intro: TranslationKey }) {
  const { t } = useI18n();
  return (
    <>
      <p className="text-sm text-slate-600">{t(breadcrumb)}</p>
      <h1 className="mt-1 text-3xl font-bold text-[#123B52]">{t(title)}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">{t(intro)}</p>
    </>
  );
}
