import { dodopayments } from "@/lib/dodopayments";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
	const supabase = await createClient();

	const { data: { user } } = await supabase
		.auth
		.getUser();

	if (!user) {
		return NextResponse.json(
			{ error: "Unauthorized" },
			{ status: 401 }
		);
	}

	const { data: userDetails } = await supabase
		.from('users')
		.select('subscription_id')
		.eq('user_id', user.id)
		.single();

	if (!userDetails?.subscription_id) {
		return NextResponse.json(null);
	}

	const payments = await
		dodopayments.payments.list({
			subscription_id: userDetails.subscription_id,
		});
	
	return NextResponse.json(
		{ payments },
		{ status: 200 }
	);
}
