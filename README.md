# RTI — Ask. Track. Know.

An independent hackathon prototype that reimagines the RTI journey around a citizen's question instead of government terminology and forms.

> **Note**: This is an independent hackathon prototype. Not an official government service. All people, authorities, applications, payments and documents are fictional demo data.

## Stack

- **Frontend**: Next.js 15 App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, PostgreSQL, Storage)
- **AI**: Deterministic local rules for request analysis
- **Architecture**: Browser renders UI; server actions handle validation and mutations

## Getting started

### Prerequisites
- Node.js 18+
- npm or yarn
- A Supabase account (free tier available)

### Setup

1. **Create Supabase project**
   ```
   Visit supabase.com and create a new project
   ```

2. **Clone and configure**
   ```bash
   cp .env.example .env.local
   ```
   Add from Supabase project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

3. **Initialize database**
   - In Supabase SQL Editor, run: `supabase/migrations/0001_rti_core.sql`
   - Then run: `supabase/seed.sql`
   - Create a "Demo Citizen" user in Supabase Auth

4. **Run locally**
   ```bash
   npm install
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to **Vercel** (recommended for Next.js) or your preferred host.

### Steps

1. **Set environment variables** in your hosting platform:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

2. **Initialize production database**
   - Apply migration: `supabase/migrations/0001_rti_core.sql`
   - Run seed: `supabase/seed.sql`
   - Create Demo Citizen user in Auth

3. **Deploy**
   ```bash
   git push  # Auto-deploys to Vercel
   ```

Supabase manages your production database independently. Demo reset is disabled by default (recommended for production).

## Current implementation

### ✓ Complete

- Public service design system and navigation
- Natural-language question entry
- Guided six-stage RTI filing flow
- Authority directory with search
- RTI tracking and lookup
- Dashboard and action list
- RTI detail view with timeline
- First Appeal workflow
- FAQ and help center
- Supabase schema with Row-Level Security

### ◇ Remaining

- Wire routes to live Supabase queries
- Implement login/logout flow
- Enable document upload and signed URLs
- Add automated tests
- Accessibility audit

See [architecture.md](docs/architecture.md) and [feature-coverage.md](docs/feature-coverage.md) for details.

## What's real vs demo

### Real (production-ready)
- Application structure and routes
- Supabase database schema and Row-Level Security
- Authentication and session management
- Server actions and validation
- Storage paths and file handling

### Demo (fictional)
- All authorities and their details
- RTI applications and statuses
- Responses, payments, and timeline events
- Appeals and notifications
- Citizen data and case history

This separation ensures a complete, convincing experience while remaining clearly non-official.

## Codex

This prototype was designed and implemented as a Codex-assisted hackathon build. The key design principle is **clear separation** between the real application infrastructure (routes, database, authentication) and simulated government data (authorities, responses, payments). This allows the demo to be feature-complete and convincing while remaining unmistakably non-official.
