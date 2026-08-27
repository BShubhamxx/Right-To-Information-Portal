import { analyzeQuestionFallback, generateAppealDraftFallback, generateRtiDraftFallback } from "./fallback";

// Local deterministic provider. No external AI service or API key is required.
export const rtiAi = {
  analyzeQuestion: analyzeQuestionFallback,
  generateRtiDraft: generateRtiDraftFallback,
  generateAppealDraft: generateAppealDraftFallback,
};

export { analyzeQuestionFallback, generateAppealDraftFallback, generateRtiDraftFallback } from "./fallback";
