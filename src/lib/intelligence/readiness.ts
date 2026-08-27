import { decomposeQuestion } from "./decomposition.ts";
import { extractEntities } from "./entities.ts";
import type { ReadinessResult } from "./types.ts";

export function calculateReadiness(question: string, authorityIdentified = true, supportingDocumentPresent = true): ReadinessResult {
  const entities = extractEntities(question); const decomposition = decomposeQuestion(question); const checks = [
    { type: "clear_request", passed: question.trim().length >= 20, message: "Information requested", recommendation: "Describe the records or information you need." },
    { type: "time_period", passed: Boolean(entities.year), message: "Time period specified", recommendation: "Add a year or financial year where relevant." },
    { type: "location", passed: !/road|school|hospital|project|property|station|सड़क|स्कूल|विद्यालय|अस्पताल|परियोजना|संपत्ति|स्टेशन/i.test(question) || Boolean(entities.location), message: "Location specified", recommendation: "Add the city, district or state where relevant." },
    { type: "authority", passed: authorityIdentified, message: "Relevant authority identified", recommendation: "Review the suggested route." },
    { type: "records_request", passed: !entities.opinionStyle, message: "Request asks for information or records", recommendation: "Ask for records, reports or documents rather than an opinion or reason." },
    { type: "character_limit", passed: question.length <= 3000, message: "Within 3,000 characters", recommendation: "Shorten the request or attach a supporting PDF." },
    { type: "single_request", passed: decomposition.requests.length <= 4, message: "Question structure reviewed", recommendation: "Consider splitting unrelated information groups." },
  ];
  if (!supportingDocumentPresent) checks.push({ type: "supporting_document", passed: false, message: "Supporting document", recommendation: "Attach the required supporting document before submission." });
  const passed = checks.filter((check) => check.passed).length; const failed = checks.length - passed;
  const state = failed === 0 ? "Ready to submit" : failed <= 2 ? "Almost ready" : checks.some((check) => check.type === "authority" && !check.passed) ? "Review required" : "Needs information";
  return { passed, total: checks.length, state, checks };
}
