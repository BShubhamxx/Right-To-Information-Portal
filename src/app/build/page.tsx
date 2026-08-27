import { Suspense } from "react";
import { RTIBuilder } from "@/components/rti-builder";

export default function BuildPage() {
  return <Suspense fallback={<main className="grid min-h-screen place-items-center bg-canvas text-sm font-bold text-ink/60">Preparing your RTI…</main>}><RTIBuilder /></Suspense>;
}
