# APEX — Adaptive Planning & Execution System
Personal productivity OS for Luis at Zenith Rise Capital.

## Deploy
Connect to Netlify: build=`npm run build`, publish=`dist`.

Required environment variables (Site settings → Environment variables in Netlify — changing these requires a new deploy to take effect):
- `VITE_API_URL=https://zrc-api.onrender.com` (optional AI features; app works without it)
- `VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co` (from Supabase → Project Settings → API — must match exactly, no extra characters)
- `VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>` (same page, "anon public" key)