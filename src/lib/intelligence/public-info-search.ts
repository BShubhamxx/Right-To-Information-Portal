export type PublicInformationRecord = { title: string; topic: string; year?: string; summary: string; content: string; keywords: string[]; demoOnly: true };
export type PublicInfoMatch = { state: "exact" | "partial" | "none"; matches: PublicInformationRecord[]; missing: string[] };
export function searchPublicInformation(question: string, records: PublicInformationRecord[]): PublicInfoMatch {
  const terms = question.toLowerCase().split(/\W+/).filter((term) => term.length > 2); const scored = records.map((record) => ({ record, score: terms.filter((term) => `${record.title} ${record.topic} ${record.summary} ${record.keywords.join(" ")}`.toLowerCase().includes(term)).length })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
  if (!scored.length) return { state: "none", matches: [], missing: ["Relevant published information"] };
  const matches = scored.slice(0, 3).map((item) => item.record); const top = scored[0].score; const state = top >= Math.max(2, Math.ceil(terms.length * 0.6)) ? "exact" : "partial";
  return { state, matches, missing: state === "partial" ? ["Project-wise or authority-specific details"] : [] };
}
