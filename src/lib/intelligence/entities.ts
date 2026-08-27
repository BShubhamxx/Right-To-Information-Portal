import type { ExtractedEntities } from "./types.ts";

const locations: Record<string, { label: string; state?: string }> = {
  pune: { label: "Pune", state: "Maharashtra" },
  "पुणे": { label: "Pune", state: "Maharashtra" },
  mumbai: { label: "Mumbai", state: "Maharashtra" },
  "मुंबई": { label: "Mumbai", state: "Maharashtra" },
  nashik: { label: "Nashik", state: "Maharashtra" },
  "नाशिक": { label: "Nashik", state: "Maharashtra" },
  delhi: { label: "Delhi" },
  "दिल्ली": { label: "Delhi" },
  bengaluru: { label: "Bengaluru", state: "Karnataka" },
  bangalore: { label: "Bengaluru", state: "Karnataka" },
  "बेंगलुरु": { label: "Bengaluru", state: "Karnataka" },
  chennai: { label: "Chennai", state: "Tamil Nadu" },
  "चेन्नई": { label: "Chennai", state: "Tamil Nadu" },
  kolkata: { label: "Kolkata", state: "West Bengal" },
  "कोलकाता": { label: "Kolkata", state: "West Bengal" },
  hyderabad: { label: "Hyderabad", state: "Telangana" },
  "हैदराबाद": { label: "Hyderabad", state: "Telangana" },
  maharashtra: { label: "Maharashtra", state: "Maharashtra" },
  "महाराष्ट्र": { label: "Maharashtra", state: "Maharashtra" },
  karnataka: { label: "Karnataka", state: "Karnataka" },
  "कर्नाटक": { label: "Karnataka", state: "Karnataka" },
};

const topicRules = [
  ["Roads and road repair", /road|roads|pothole|street|highway|bridge|sadak|sarak|सड़क|सड़कें|मार्ग|रोड|मरम्मत/],
  ["Education and schools", /school|education|classroom|teacher|vidyalay|विद्यालय|स्कूल|शिक्षा|कक्षा|शिक्षक/],
  ["Healthcare and hospitals", /hospital|health|medical|clinic|aspatal|अस्पताल|चिकित्सा|स्वास्थ्य|क्लिनिक|चिकित्सालय/],
  ["Railways and transport", /railway|railways|station|train|transport|रेलवे|स्टेशन|ट्रेन|परिवहन/],
  ["Recruitment and employees", /recruit|vacanc|employee|staff|exam|bharti|भर्ती|नियुक्ति|कर्मचारी|रिक्ति|परीक्षा/],
  ["Contracts and tenders", /contract|contractor|tender|vendor|work order|thekedar|tender|अनुबंध|ठेका|ठेकेदार|निविदा|वर्क ऑर्डर/],
] as const;

const infoRules = [
  ["Expenditure", /spend|spent|expenditure|cost|fund|budget|allocation|paisa|kharch|kitna|बजट|आवंटन|खर्च|व्यय|राशि|लागत|फंड|कितना/],
  ["Contracts", /contract|contractor|tender|vendor|work order|thekedar|अनुबंध|ठेका|ठेकेदार|निविदा|वर्क ऑर्डर/],
  ["Project status", /complete|completed|completion|progress|status|ongoing|poora|पूर्ण|पूरा|प्रगति|स्थिति|चालू|परियोजना/],
  ["Complaints", /complaint|grievance|complaints|shikayat|शिकायत|शिकायतें/],
  ["Records", /record|document|file|minutes|report|रिकॉर्ड|दस्तावेज|दस्तावेज़|फाइल|फ़ाइल|रिपोर्ट|कार्यवाही/],
  ["Counts", /how many|number of|count|kitne|kitni|कितने|कितनी|संख्या/],
] as const;

const opinionPattern = /\bwhy\b|reason|how come|what do you think|kyun|kyo|क्यों|कारण|राय|क्या सोचते/i;

export function extractEntities(question: string): ExtractedEntities {
  const normalized = question.toLowerCase();
  const locationEntry = Object.entries(locations).find(([key]) => normalized.includes(key.toLowerCase()));
  const year = question.match(/(?:fy\s*)?20\d{2}(?:\s*[–-]\s*\d{2,4})?|वित्तीय वर्ष\s*20\d{2}(?:\s*[–-]\s*\d{2,4})?/i)?.[0]?.replace(/\s+/g, " ");
  const topic = topicRules.find(([, pattern]) => pattern.test(normalized))?.[0] ?? "Public service information";
  const informationTypes = infoRules.filter(([, pattern]) => pattern.test(normalized)).map(([label]) => label);

  return {
    topic,
    location: locationEntry?.[1].label,
    state: locationEntry?.[1].state,
    year,
    informationTypes: informationTypes.length ? informationTypes : ["Records"],
    opinionStyle: opinionPattern.test(normalized),
  };
}
