import { extractEntities } from "./entities";
import type { NavigationResult } from "./types";

export function determineJurisdiction(question: string): NavigationResult {
  const entities = extractEntities(question);
  const text = question.toLowerCase();
  const local = /property tax|municipal|corporation|ward|panchayat|local road|water bill/.test(text);
  const central = /indian rail|railway|central government|union ministry|national highway|passport|income tax/.test(text);
  const jurisdiction = central ? "Central Government" : local ? "Local Government" : entities.state ? "State Government" : "Unknown";
  const authority = central ? "Demo Central Government Authority" : local && entities.location === "Pune" ? "Pune Municipal Corporation (demo)" : entities.topic.startsWith("Education") ? "Demo School Education Authority" : entities.topic.startsWith("Healthcare") ? "Demo Public Health Authority" : entities.topic.startsWith("Railways") ? "Demo Rail Services Authority" : "Demo Public Works Authority";
  const routeLabel = central ? "Central Government RTI" : local ? "State / Local RTI" : jurisdiction === "State Government" ? "State Government RTI" : "Review authority before filing";
  return { jurisdiction, routeLabel, authority: { name: authority, jurisdiction, reason: central ? "This appears to concern a national ministry or Central Government transport matter." : local ? "This appears to concern a local-government matter." : "This appears to concern the public-service topic identified in your question.", demoOnly: true }, explanation: central ? "This looks like a Central Government RTI based on the topic and wording." : local ? `This appears to concern a local-government matter${entities.location ? ` in ${entities.location}` : ""}.` : "The route is a suggestion based on the topic, location and demo authority data.", disclaimer: "Suggested route based on deterministic rules and fictional demo data, not an official determination." };
}

export function recommendAuthority(question: string) { return determineJurisdiction(question).authority; }
