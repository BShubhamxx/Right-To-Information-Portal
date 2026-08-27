# RTI — Ask. Track. Know.

An independent hackathon prototype that reimagines the RTI journey around a citizen's question instead of government terminology and forms.

> Independent hackathon prototype • Not an official government service • All people, authorities, applications, payments and documents are fictional demo data.

## Stack

Next.js App Router, TypeScript, Tailwind CSS and Supabase (Auth, PostgreSQL, Storage). All request guidance uses deterministic local rules and fictional demo data; no external AI service is used.

## Getting started

1. Copy `.env.example` to `.env.local` and add the public Supabase URL and publishable key.
2. Install packages with `npm install`.
3. Run `npm run dev`.

`SUPABASE_SERVICE_ROLE_KEY`, `DEMO_RESET_TOKEN` and `ENABLE_DEMO_RESET` are optional server-only values for a controlled demo reset. Do not add them unless that route is explicitly needed.

## Deployment

The production Supabase database and seed data are already managed separately. Deploy the Next.js application without rerunning migrations or seed scripts. Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in the hosting platform for every environment. Leave demo reset disabled in normal production deployments.

## Current implementation

The public-service design system, service hub, guided six-stage filing flow, authority directory, public-information discovery, RTI tracking, action dashboard, RTI detail timeline, First Appeal, FAQ and help routes are implemented. See [the product architecture](docs/architecture.md) and [feature coverage](docs/feature-coverage.md) for the route map, Supabase plan and remaining integration work.

## What will be real vs mocked

The production-shaped frontend, Supabase data model, authentication, storage paths and lifecycle persistence are real application functionality. Authorities, responses, payments, status updates, documents and public-information results are deliberately synthetic for the demo.
