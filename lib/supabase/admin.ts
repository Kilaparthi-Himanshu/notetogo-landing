// STRICTLY SERVER-SIDE ONLY.
// Uses the Supabase Service Role key and bypasses all RLS policies.
// Intended for trusted backend operations such as webhooks, cron jobs,
// admin actions, and internal server APIs. Never import into client code.

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/database.types";

export const supabaseAdmin = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!
);
