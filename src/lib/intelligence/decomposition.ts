import { extractEntities } from "./entities.ts";
import type { DecomposedRequest } from "./types.ts";

const groups: [string, RegExp, string][] = [["Budget and expenditure", /budget|spend|spent|expenditure|allocated|allocation|cost|paisa|kharch|बजट|खर्च|व्यय|आवंटन|राशि|लागत/, "Expenditure"], ["Contracts and contractors", /contract|contractor|tender|vendor|work order|thekedar|अनुबंध|ठेका|ठेकेदार|निविदा|वर्क ऑर्डर/, "Contracts"], ["Project completion", /complete|completed|completion|progress|status|projects?|poora|पूर्ण|पूरा|प्रगति|स्थिति|परियोजना/, "Project status"], ["Complaints", /complaint|grievance|shikayat|शिकायत|शिकायतें/, "Complaints"], ["Records and documents", /record|document|file|minutes|report|रिकॉर्ड|दस्तावेज|दस्तावेज़|फाइल|फ़ाइल|रिपोर्ट/, "Records"]];
export function decomposeQuestion(question: string): { requests: DecomposedRequest[]; hasDifferentOwners: boolean } {
  const lower = question.toLowerCase();
  const entities = extractEntities(question);
  const requests = groups.filter(([, pattern]) => pattern.test(lower)).map(([label, pattern, informationType]) => ({ label, informationType, text: question.split(/,|\band\b|\bwhich\b|\bhow many\b|और|तथा|कितने|कितनी|किन/i).find((part) => pattern.test(part))?.trim() || label }));
  if (!requests.length) requests.push({ label: entities.topic, informationType: entities.informationTypes[0] ?? "Records", text: question.trim() });
  return { requests, hasDifferentOwners: requests.some((request) => request.informationType === "Complaints") && requests.some((request) => request.informationType === "Contracts") };
}
