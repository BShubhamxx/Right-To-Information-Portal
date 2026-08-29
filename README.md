# RTI — Ask. Track. Know.

An independent hackathon prototype that redesigns the RTI journey around the citizen’s question. It helps people understand what to ask, check whether information may already be available, identify a likely route, improve the request, and then file and track it through a clear public-service interface.

> This is an independent hackathon prototype, not an official Government of India service. All authorities, applications, payments, responses, notifications, and documents are fictional demo data.

## Product flow

**Ask → Check → Route → Decompose → Improve → Validate → File**

- Ask a question in plain language.
- Check illustrative public information before filing.
- Receive deterministic routing guidance for Central, State, or local matters.
- Review multiple information requests in one question.
- Improve wording and assess request readiness.
- Complete a pre-flight check before filing.
- Submit, track, view timelines, responses, payments, and appeal options.

## Implemented features

### Public citizen tools

- RTI homepage with natural-language question entry
- Check Before You File
- RTI Navigator
- Question Decomposition
- RTI Readiness
- Filing pre-flight guidance
- Public Authority Directory with search and expandable details
- RTI Knowledge Library
- Before You File guidance, FAQ, help, and contact pages
- Registration-number RTI tracking

### RTI lifecycle

- Guided RTI application flow with applicant details, BPL support, supporting-document handling, review, mock payment, and submission
- Unique synthetic registration numbers
- Account-linked applications
- Dynamic application case records with Supabase-backed timeline, authority, payment, and response data
- My RTIs dashboard with account-specific applications and status summaries
- First Appeal and Second Appeal handoff journeys
- Notifications and payment status views

### Authentication and access

- Supabase Auth sign-in and account creation
- Demo sign-in credentials shown in the sign-in experience
- Public guidance tools available without sign-in
- Account dashboard, notifications, appeals, and final filing protected by authentication
- New applications are stored under the signed-in account

### Accessibility and language

- English and Hindi localization across the main citizen journey
- Font-size controls, contrast control, keyboard-visible focus states, accessible labels, and responsive layouts
- Government-service visual language: navy, white, neutral grey, restrained saffron/green accents, structured panels, and clear typography

### Deterministic intelligence

No external AI service or API key is required.

- Keyword and phrase matching
- Location, topic, information-type, and time-period extraction
- Jurisdiction and authority mapping
- Public-information matching
- Question decomposition
- Request readiness and pre-flight checks
- Curated knowledge examples and request templates

## Technology

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS
- Supabase Auth, PostgreSQL, Storage, and Row-Level Security
- Deterministic local intelligence modules

## Local setup

### Prerequisites

- Node.js 18+
- npm
- A Supabase project

### Environment variables

Create `.env.local` from `.env.example`:

```ini
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-public-anon-or-publishable-key
```

Only public Supabase connection values belong in the browser. Never commit service-role keys, access tokens, or database passwords.

### Database

The project uses these existing Supabase resources:

- `supabase/migrations/0001_rti_core.sql`
- `supabase/migrations/0002_intelligence_layer.sql`
- `supabase/seed.sql`
- `supabase/seed-intelligence.sql`

Apply migrations and seed data once for a new Supabase project. Existing synchronized environments should not be reset or reseeded.

### Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm test
npm run build
```

## Deployment

Deploy to Vercel or another Node.js-compatible Next.js host.

Configure these environment variables in the hosting platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

The deployed application connects to the existing Supabase project. Supabase migrations, seed data, Auth users, Storage buckets, and Row-Level Security remain managed by Supabase.

## Project references

- [Architecture](docs/architecture.md)
- [Feature coverage](docs/feature-coverage.md)
- [New features specification](docs/NEW_FEATURES.md)
