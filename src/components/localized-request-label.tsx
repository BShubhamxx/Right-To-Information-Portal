"use client";

import { useI18n } from "@/lib/i18n";

export function LocalizedRequestLabel() {
  const { t } = useI18n();
  return <strong>{t("common.yourRequest")}:</strong>;
}
