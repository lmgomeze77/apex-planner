import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidSupabaseUrl = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(supabaseUrl || "");

export const supabaseConfigError = !supabaseUrl || !supabaseAnonKey
  ? "Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — check Netlify environment variables."
  : !isValidSupabaseUrl
  ? `VITE_SUPABASE_URL is set to "${supabaseUrl}", which isn't a valid Supabase project URL (expected https://<project-ref>.supabase.co). Check for a copy-paste error in Netlify environment variables.`
  : null;

if (supabaseConfigError) console.error(supabaseConfigError);

export const supabase = createClient(
  isValidSupabaseUrl ? supabaseUrl : "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder"
);
