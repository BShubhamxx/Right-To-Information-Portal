# RTI — Ask. Track. Know.

An independent hackathon prototype that reimagines the RTI journey around a citizen's question instead of government terminology and forms.

> Independent hackathon prototype • Not an official government service • All people, authorities, applications, payments and documents are fictional demo data.

## Stack

Next.js App Router, TypeScript, Tailwind CSS, Supabase (Auth, PostgreSQL, Storage), and Google Gemini with a deterministic local AI fallback.

## Getting started

1. Copy `.env.example` to `.env.local` and add Supabase values when the backend phase begins.
2. Install packages with `npm install`.
3. Run `npm run dev`.

`GEMINI_API_KEY` is optional. AI-assisted flows always work using the deterministic fallback if it is missing or Gemini is unavailable.

## Current implementation

The public-service design system, service hub, guided six-stage filing flow, authority directory, public-information discovery, RTI tracking, action dashboard, RTI detail timeline, First Appeal, FAQ and help routes are implemented. See [the product architecture](docs/architecture.md) and [feature coverage](docs/feature-coverage.md) for the route map, Supabase plan and remaining integration work.

## What will be real vs mocked

The production-shaped frontend, Supabase data model, authentication, storage paths and lifecycle persistence are real application functionality. Authorities, responses, payments, status updates, documents and public-information results are deliberately synthetic for the demo.
