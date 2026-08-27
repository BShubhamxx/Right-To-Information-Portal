# RTI Prototype Feature Coverage

Last updated: 27 August 2026

This document distinguishes the user-facing prototype from the planned production-shaped Supabase implementation. All records, people, authorities, status updates, payments and documents shown by the prototype are fictional.

## Implemented in the current interface

- Government-service visual system: navy header, subtle saffron/white/green rule, formal navigation, original geometric RTI mark, light panels, sans-serif typography and independent-prototype disclosure.
- Accessibility controls: English/Hindi selector, A-/A/A+ font controls, high-contrast toggle, semantic labels, focus styles and responsive navigation.
- Home service hub: natural-language request entry, example questions, filing, tracking and appeal entry points, scope/fee/BPL/3,000-character guidance.
- Before-you-file guidance and public-information discovery demonstration.
- Representative authority directory with search and category filtering.
- Six-stage filing flow: guideline acknowledgement, question analysis, authority suggestion, applicant/eligibility/BPL fields, document validation, review, mock payment and confirmation.
- Deterministic request analysis and suggested RTI wording; the UI does not expose technical AI errors.
- Registration-number confirmation, tracking lookup, My RTIs action list, human-readable statuses, case-file detail view and timeline.
- First Appeal form with prefilled demo RTI, reason selection, editable suggested wording and ₹0 fee.
- FAQ/help center, contact disclaimer and external-link-style Second Appeal handoff.

## Supabase-ready implementation

`supabase/migrations/0001_rti_core.sql` defines the primary persistent schema for profiles, authorities, RTI applications, timelines, appeals, responses, notifications, payments, public information and attachments. It also defines indexes, RLS policies and private Storage buckets.

`supabase/seed.sql` adds representative public authorities and illustrative public information. Apply the migration and seed SQL in the Supabase SQL Editor before switching the interface from the current demonstrative records to data-backed records.

## Remaining integration work

- Apply the migration and seed data to the provided Supabase project.
- Create the designated synthetic Demo Citizen in Supabase Auth, then seed its applications, timeline events, payment events, notifications, appeal and response document.
- Replace the demonstrative route data with Supabase queries and server actions; all submissions, edits, uploads and payment transitions must persist through RLS-protected operations.
- Connect the provided browser/server Supabase clients to cookie refresh middleware and implement demo login/logout.
- Replace the compatibility helpers in `lib/ai` with the new local deterministic `lib/intelligence` services.
- Store document uploads in Supabase Storage and use signed URLs for document preview/download.
- Persist mock payment, reconciliation, notification and lifecycle state transitions. Add a protected demo-reset operation.
- Add automated tests for fallback analysis, form validation, payment transitions, lifecycle transitions and appeals.

## Explicit non-features

- No official Government of India, DoPT, NIC or CIC affiliation is claimed.
- No connection to rtionline.gov.in or undocumented government APIs.
- No real payments, OTPs, Aadhaar, PAN, government credentials or citizen documents.
- Second Appeal is an explanatory external handoff only, not a filing integration.
