# Supabase setup

Apply `migrations/0001_rti_core.sql` in the Supabase SQL Editor, then apply `seed.sql`. The migration creates all application tables, indexes, Row Level Security policies and private Storage buckets.

The supplied publishable key is sufficient for browser authentication and RLS-protected reads. Do not add a service-role key to `.env.local` or any browser code. Server-side privileged operations, demo reset and seeded demo-user lifecycle updates require a future server-only service-role environment variable.
