import { Database } from "@/database.types";
import { supabaseAdmin } from "./supabase/admin";

export async function updateSubscription(
	userId: string,
	data: Partial<Database["public"]["Tables"]["users"]["Update"]>
) {
	/**
	 * Uses the Supabase Service Role client instead of the normal
	 * server client because subscription updates are triggered from
	 * Dodo Payments webhooks.
	 *
	 * Webhook requests originate from Dodo's servers and do not carry
	 * any authenticated user session or Supabase auth cookies, meaning
	 * auth.uid() is null and RLS policies would block reads/updates.
	 *
	 * The Service Role client bypasses RLS and allows the backend to
	 * securely update subscription data based on verified webhook events.
	 */
	return supabaseAdmin
		.from("users")
		.update({
			...data,
			updated_at: new Date().toISOString(),
		})
		.eq("user_id", userId);
}
