import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RTI — Ask. Track. Know.",
  description: "An independent RTI journey prototype for Build What Moves India.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
