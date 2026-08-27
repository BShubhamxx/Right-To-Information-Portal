"use client";

import { useEffect, useState } from "react";
import { useI18n, type Locale } from "@/lib/i18n";

type FontScale = "small" | "normal" | "large";

export function AccessibilityControls() {
  const [fontScale, setFontScale] = useState<FontScale>("normal");
  const [highContrast, setHighContrast] = useState(false);
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    document.documentElement.dataset.fontScale = fontScale;
    document.documentElement.classList.toggle("high-contrast", highContrast);
    window.localStorage.setItem("rti-font-scale", fontScale);
    window.localStorage.setItem("rti-high-contrast", String(highContrast));
  }, [fontScale, highContrast]);

  useEffect(() => {
    const storedScale = window.localStorage.getItem("rti-font-scale") as FontScale | null;
    const storedContrast = window.localStorage.getItem("rti-high-contrast");
    if (storedScale === "small" || storedScale === "normal" || storedScale === "large") setFontScale(storedScale);
    if (storedContrast === "true") setHighContrast(true);
  }, []);

  return <div className="flex flex-wrap items-center gap-2"><label className="sr-only" htmlFor="language">{t("a11y.language")}</label><select id="language" value={locale} onChange={(event) => setLocale(event.target.value as Locale)} className="max-w-[9rem] bg-transparent text-xs text-white underline underline-offset-2"><option className="text-slate-900" value="en">English</option><option className="text-slate-900" value="hi">हिंदी</option></select><span aria-hidden="true">|</span><button type="button" onClick={() => setFontScale("small")} aria-label={t("a11y.decreaseText")} aria-pressed={fontScale === "small"}>A-</button><button type="button" onClick={() => setFontScale("normal")} aria-label={t("a11y.defaultText")} aria-pressed={fontScale === "normal"}>A</button><button type="button" onClick={() => setFontScale("large")} aria-label={t("a11y.increaseText")} aria-pressed={fontScale === "large"}>A+</button><button type="button" onClick={() => setHighContrast((current) => !current)} aria-pressed={highContrast} className="border-l border-white/30 pl-2">{t("a11y.contrast")}</button></div>;
}
