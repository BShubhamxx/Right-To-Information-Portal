import type { NavigationResult } from "./types";
export function runEligibilityCheck(question: string, navigation: NavigationResult, citizen = "Indian citizen", documentPresent = true) {
  const checks = [{ label: "Indian citizen", passed: citizen === "Indian citizen" }, { label: "Central route identified", passed: navigation.jurisdiction === "Central Government" }, { label: "Request provided", passed: question.trim().length > 0 }, { label: "Supporting document handled", passed: documentPresent }];
  return { checks, eligible: checks.every((check) => check.passed), disclaimer: "Prototype guidance only, not legal advice or an official eligibility determination." };
}
