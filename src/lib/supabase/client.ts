import { createClient } from "@supabase/supabase-js";

function getSupabaseBrowserConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local.",
    );
  }

  return { url, key };
}

/**
 * Browser-safe Supabase client. This accepts only the public publishable key;
 * privileged operations remain in server actions or route handlers.
 */
export function createSupabaseBrowserClient() {
  const { url, key } = getSupabaseBrowserConfig();
  return createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
}
