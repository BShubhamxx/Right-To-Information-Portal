import { analyzeQuestionFallback, generateAppealDraftFallback, generateRtiDraftFallback } from "./fallback";

// Gemini is introduced behind this interface in Phase 3. The deterministic provider
// is deliberately production-shaped so UI code never depends on an AI vendor.
export const rtiAi = {
  analyzeQuestion: analyzeQuestionFallback,
  generateRtiDraft: generateRtiDraftFallback,
  generateAppealDraft: generateAppealDraftFallback,
};

export { analyzeQuestionFallback, generateAppealDraftFallback, generateRtiDraftFallback } from "./fallback";
