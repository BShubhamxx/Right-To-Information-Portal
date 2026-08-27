export type JurisdictionType = "Central Government" | "State Government" | "Local Government" | "PSU" | "Unknown";

export type ExtractedEntities = {
  topic: string;
  location?: string;
  state?: string;
  year?: string;
  informationTypes: string[];
  opinionStyle: boolean;
};

export type AuthorityCandidate = {
  name: string;
  jurisdiction: JurisdictionType;
  reason: string;
  demoOnly: true;
};

export type NavigationResult = {
  jurisdiction: JurisdictionType;
  routeLabel: string;
  authority: AuthorityCandidate;
  explanation: string;
  disclaimer: string;
};

export type DecomposedRequest = { label: string; text: string; informationType: string };

export type ReadinessCheck = { type: string; passed: boolean; message: string; recommendation?: string };

export type ReadinessResult = { passed: number; total: number; state: "Ready to submit" | "Almost ready" | "Needs information" | "Review required"; checks: ReadinessCheck[] };
