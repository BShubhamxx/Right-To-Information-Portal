# Supabase setup

Apply `migrations/0001_rti_core.sql` in the Supabase SQL Editor, then apply `seed.sql`. The migration creates all application tables, indexes, Row Level Security policies and private Storage buckets.

The supplied publishable key is sufficient for browser authentication and RLS-protected reads. Do not add a service-role key to `.env.local` or any browser code. Server-side privileged operations, demo reset and seeded demo-user lifecycle updates require a future server-only service-role environment variable.

## Reproducible demo setup

1. Run `supabase/migrations/0001_rti_core.sql` in the Supabase SQL editor, then run `supabase/seed.sql`.
2. Set `SUPABASE_SERVICE_ROLE_KEY` and `DEMO_RESET_TOKEN` only in the server environment.
3. POST `/api/demo-reset` with header `x-demo-reset-token: <DEMO_RESET_TOKEN>` to recreate the synthetic Demo Citizen (`demo@rti-demo.in` / `demo123`) and three sample applications.

The reset endpoint is intentionally token-protected and must never be called from browser code.
