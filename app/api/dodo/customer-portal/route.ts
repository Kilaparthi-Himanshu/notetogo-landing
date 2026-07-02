import { dodopayments } from "@/lib/dodopayments";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
	const supabase = await createClient();

	const {
		data: { user },
		error: userError
	} = await supabase.auth.getUser();

	if (userError || !user) {
		return NextResponse.json({
			error: "Unauthorized"
		}, {
			status: 401,
		});
	}

	const { data: userDetails } = await supabase
		.from('users')
		.select('customer_id')
		.eq('user_id', user.id)
		.single();

	if (!userDetails?.customer_id) {
		return NextResponse.json({ 
			error: "Customer not found" 
		}, {
			status: 404 
		});
	}

	const session = await dodopayments.customers.customerPortal.create(
		userDetails.customer_id
	);

	return NextResponse.json({
		url: session.link,
	});
}
