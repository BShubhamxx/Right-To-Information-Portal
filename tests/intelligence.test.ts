import test from "node:test";
import assert from "node:assert/strict";
import { calculateReadiness, decomposeQuestion, determineJurisdiction, extractEntities, searchPublicInformation, type PublicInformationRecord } from "../src/lib/intelligence/index.ts";

test("extracts road, Pune and year entities", () => {
  const result = extractEntities("How much was spent repairing roads in Pune in 2025?");
  assert.equal(result.location, "Pune"); assert.equal(result.year, "2025"); assert.ok(result.informationTypes.includes("Expenditure"));
});
test("routes railway questions to Central Government", () => assert.equal(determineJurisdiction("How much did Indian Railways spend on station redevelopment?").jurisdiction, "Central Government"));
test("routes property tax questions to local government", () => assert.equal(determineJurisdiction("Why did my property tax increase in Pune?").jurisdiction, "Local Government"));
test("decomposes multiple information groups", () => assert.equal(decomposeQuestion("How much was spent, which contractors received contracts and how many projects were completed?").requests.length, 3));
test("readiness identifies missing year", () => { const result = calculateReadiness("Please provide road repair records in Pune."); assert.equal(result.checks.find((check) => check.type === "time_period")?.passed, false); });
test("public information distinguishes exact, partial and no match", () => { const records: PublicInformationRecord[] = [{ title: "Road expenditure Pune 2025", topic: "road repair expenditure", summary: "Budget and expenditure", content: "demo", keywords: ["road", "pune", "2025"], demoOnly: true }]; assert.equal(searchPublicInformation("road expenditure Pune 2025", records).state, "exact"); assert.equal(searchPublicInformation("road contractors", records).state, "partial"); assert.equal(searchPublicInformation("railway recruitment", records).state, "none"); });
