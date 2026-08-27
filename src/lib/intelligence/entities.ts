import type { ExtractedEntities } from "./types";

const locations: Record<string, { label: string; state?: string }> = {
  pune: { label: "Pune", state: "Maharashtra" }, mumbai: { label: "Mumbai", state: "Maharashtra" }, nashik: { label: "Nashik", state: "Maharashtra" },
  delhi: { label: "Delhi" }, bengaluru: { label: "Bengaluru", state: "Karnataka" }, chennai: { label: "Chennai", state: "Tamil Nadu" },
  kolkata: { label: "Kolkata", state: "West Bengal" }, hyderabad: { label: "Hyderabad", state: "Telangana" }, maharashtra: { label: "Maharashtra", state: "Maharashtra" }, karnataka: { label: "Karnataka", state: "Karnataka" },
};
const topicRules = [["Roads and road repair", /road|pothole|street|highway|bridge/], ["Education and schools", /school|education|classroom|teacher/], ["Healthcare and hospitals", /hospital|health|medical|clinic/], ["Railways and transport", /railway|station|train|transport/], ["Recruitment and employees", /recruit|vacanc|employee|staff|exam/], ["Contracts and tenders", /contract|tender|vendor|work order/]] as const;
const infoRules = [["Expenditure", /spend|spent|expenditure|cost|fund|budget|allocation/], ["Contracts", /contract|contractor|tender|vendor|work order/], ["Project status", /complete|completion|progress|status|ongoing/], ["Complaints", /complaint|grievance|complaints/], ["Records", /record|document|file|minutes|report/], ["Counts", /how many|number of|count/]] as const;

export function extractEntities(question: string): ExtractedEntities {
  const normalized = question.toLowerCase();
  const locationEntry = Object.entries(locations).find(([key]) => normalized.includes(key));
  const year = question.match(/(?:fy\s*)?20\d{2}(?:\s*[–-]\s*\d{2,4})?/i)?.[0]?.replace(/\s+/g, " ");
  const topic = topicRules.find(([, pattern]) => pattern.test(normalized))?.[0] ?? "Public service information";
  const informationTypes = infoRules.filter(([, pattern]) => pattern.test(normalized)).map(([label]) => label);
  return { topic, location: locationEntry?.[1].label, state: locationEntry?.[1].state, year, informationTypes: informationTypes.length ? informationTypes : ["Records"], opinionStyle: /\bwhy\b|reason|how come|what do you think/.test(normalized) };
}
