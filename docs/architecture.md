# RTI — Ask. Track. Know.

## Repository assessment

This is a greenfield Next.js App Router application. The implementation starts with a dependency-light, mobile-first application shell and places backend integrations behind domain modules so the demo can be developed independently of credentials.

## Product architecture

The citizen journey is `Question → Understand → Prepare → Submit → Track → Act → Resolve`.

The browser renders interaction and presentation. Next.js route handlers/server actions own validation and mutations. Supabase is the sole persistent system of record; it provides Auth, PostgreSQL and Storage. The server-only AI layer first attempts Gemini and uses a deterministic fallback for every operation if Gemini is unavailable.

## Route map

| Area | Route | Purpose |
| --- | --- | --- |
| Public | `/` | Question-first landing page |
| Public | `/build` | Guided RTI builder |
| Public | `/before-you-file` | Illustrative public information lookup |
| Public | `/track` | Registration-number lookup |
| Public | `/help` | Plain-language RTI guide |
| Authenticated | `/dashboard` | Action-focused citizen dashboard |
| Authenticated | `/rtis/[id]` | RTI detail, timeline and response |
| Authenticated | `/rtis/[id]/appeal` | First Appeal flow |
| Authenticated | `/notifications` | Notification inbox |
| System | `/login` | Demo Citizen sign-in |

## Component architecture

`components/site-header` owns shared navigation. `components/question-starter` owns the home-to-builder handoff. `components/rti-builder` manages temporary client-side drafting state only. Reusable status, timeline, document, payment and action components are introduced alongside the data-backed routes that need them.

## AI and fallback architecture

`lib/ai` is the only layer allowed to call Gemini. Its public interface has typed operations for question analysis, RTI wording, appeal wording, and response summaries. `fallback.ts` provides deterministic, testable equivalents; the UI never receives a provider-specific result or a raw provider error.

## Supabase schema plan

The first migration will create `profiles`, `authorities`, `rti_applications`, `timeline_events`, `appeals`, `responses`, `notifications`, `payments`, `public_information`, and `attachments`. Every citizen-owned table will reference `auth.users(id)`, be indexed by its foreign keys, and use Row Level Security that restricts reads and writes to the owning user. Authorities and illustrative public information will be publicly readable. Storage buckets will be private and accessed with scoped paths or signed URLs.

## Implementation phases

1. Design system and application shell — in progress
2. Landing and RTI Builder — in progress
3. Gemini integration and deterministic fallback
4. Supabase schema, authentication and persistence
5. Submission and mock payment
6. Dashboard, lifecycle and timeline
7. Response viewer and First Appeal
8. Notifications and supporting features
9. Accessibility and mobile verification
10. Testing, polish and deployment preparation

## Deployment plan

Vercel hosts the Next.js application. Environment values are supplied through Vercel and documented in `.env.example`. Supabase migrations and a reproducible demo seed run before deployment. `GEMINI_API_KEY` is optional: missing or failed Gemini requests use the local deterministic provider.
