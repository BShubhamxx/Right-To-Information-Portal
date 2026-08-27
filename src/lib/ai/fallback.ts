export type QuestionAnalysis = {
  topic: string;
  location: string;
  information: string;
  timePeriod: string;
  authority: string;
  authorityReason: string;
};

const locations = ["Pune", "Mumbai", "Nashik", "Delhi", "Bengaluru", "Chennai", "Kolkata", "Hyderabad"];

export function analyzeQuestionFallback(question: string): QuestionAnalysis {
  const normalized = question.toLowerCase();
  const location = locations.find((place) => normalized.includes(place.toLowerCase())) ?? "the specified area";
  const year = question.match(/(?:20\d{2}(?:\s*[–-]\s*\d{2})?|FY\s*20\d{2}(?:\s*[–-]\s*\d{2})?)/i)?.[0] ?? "the relevant financial year";
  const isRoad = /road|repair|pothole|street/.test(normalized);
  const isSchool = /school|teacher|education|classroom/.test(normalized);
  const isHospital = /hospital|health|medical|equipment/.test(normalized);
  const topic = isRoad ? "Road repairs" : isSchool ? "School infrastructure" : isHospital ? "Public health services" : "Public service information";
  const information = /spend|spent|budget|fund|allocation|cost|expenditure/.test(normalized) ? "Budget allocation and expenditure" : /how many|number|count/.test(normalized) ? "Records and counts" : "Relevant records and documents";
  const authority = isSchool ? "Demo School Education Authority" : isHospital ? "Demo Public Health Authority" : "Demo Public Works Authority";
  return { topic, location, information, timePeriod: year, authority, authorityReason: `${authority} is the fictional demo authority most likely to hold these records.` };
}

export function generateRtiDraftFallback(question: string, analysis: QuestionAnalysis): string {
  return `Please provide certified copies of records relating to ${analysis.topic.toLowerCase()} in ${analysis.location} for ${analysis.timePeriod}. Specifically, please provide: (1) the funds sanctioned or allocated; (2) the amount spent, with work-wise or project-wise details where available; and (3) copies of relevant completion, inspection, or expenditure records. This request is based on my question: “${question.trim()}”`;
}

export function generateAppealDraftFallback(registrationNumber: string, reason: string): string {
  return `I am filing this First Appeal in relation to RTI application ${registrationNumber}. ${reason} I request the First Appellate Authority to review the matter and arrange for a complete, point-wise response or appropriate directions to the concerned officer.`;
}
