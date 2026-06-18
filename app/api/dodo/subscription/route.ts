import { dodopayments } from "@/lib/dodopayments";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const ENABLE_DODO_SUBSCRIPTION_API = false;

export async function GET() {
	if (!ENABLE_DODO_SUBSCRIPTION_API) {
		return NextResponse.json(
			{ error: "Endpoint disabled" },
			{ status: 503 }
		);
	}

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

	const subscription = await
		dodopayments.subscriptions.retrieve(
			userDetails.subscription_id
		);
	
	return NextResponse.json(
		{ subscription },
		{ status: 200 }
	);
}
