import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "RTI — Ask. Track. Know.",
  description: "An independent RTI journey prototype for Build What Moves India.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><I18nProvider>{children}</I18nProvider></body>
    </html>
  );
}
