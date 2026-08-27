"use client";

import { useEffect, useState } from "react";

type FontScale = "small" | "normal" | "large";

export function AccessibilityControls() {
  const [fontScale, setFontScale] = useState<FontScale>("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [language, setLanguage] = useState("English");

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

  return <div className="flex items-center gap-2"><label className="sr-only" htmlFor="language">Language</label><select id="language" value={language} onChange={(event) => setLanguage(event.target.value)} className="bg-transparent text-xs text-white underline underline-offset-2"><option className="text-slate-900">English</option><option className="text-slate-900">हिंदी</option></select><span aria-hidden="true">|</span><button type="button" onClick={() => setFontScale("small")} aria-label="Decrease text size" aria-pressed={fontScale === "small"}>A-</button><button type="button" onClick={() => setFontScale("normal")} aria-label="Default text size" aria-pressed={fontScale === "normal"}>A</button><button type="button" onClick={() => setFontScale("large")} aria-label="Increase text size" aria-pressed={fontScale === "large"}>A+</button><button type="button" onClick={() => setHighContrast((current) => !current)} aria-pressed={highContrast} className="border-l border-white/30 pl-2">Contrast</button></div>;
}
