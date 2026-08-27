import { extractEntities } from "./entities.ts";
import type { DecomposedRequest } from "./types.ts";

const groups: [string, RegExp, string][] = [["Budget and expenditure", /budget|spend|spent|expenditure|allocated|allocation|cost/, "Expenditure"], ["Contracts and contractors", /contract|contractor|tender|vendor|work order/, "Contracts"], ["Project completion", /complete|completed|completion|progress|status|projects?/, "Project status"], ["Complaints", /complaint|grievance/, "Complaints"], ["Records and documents", /record|document|file|minutes|report/, "Records"]];
export function decomposeQuestion(question: string): { requests: DecomposedRequest[]; hasDifferentOwners: boolean } {
  const lower = question.toLowerCase();
  const entities = extractEntities(question);
  const requests = groups.filter(([, pattern]) => pattern.test(lower)).map(([label, pattern, informationType]) => ({ label, informationType, text: question.split(/,|\band\b|\bwhich\b|\bhow many\b/i).find((part) => pattern.test(part))?.trim() || label }));
  if (!requests.length) requests.push({ label: entities.topic, informationType: entities.informationTypes[0] ?? "Records", text: question.trim() });
  return { requests, hasDifferentOwners: requests.some((request) => request.informationType === "Complaints") && requests.some((request) => request.informationType === "Contracts") };
}
