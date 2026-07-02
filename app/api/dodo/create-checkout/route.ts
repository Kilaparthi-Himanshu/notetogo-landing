import { dodopayments } from "@/lib/dodopayments";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
	try {
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

		const checkout = await dodopayments.checkoutSessions.create({
			product_cart: [{
				product_id: process.env.DODO_PRO_PRODUCT_ID!,
				quantity: 1,
			}],
			customer: {
				email: user.email!,
			},
			metadata: {
				user_id: user.id,
				email: user.email!,
			},
			return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/billing/result`
		});

		console.log(
			JSON.stringify(checkout, null, 2)
		);

		return NextResponse.json({
			url: checkout.checkout_url,
		});
	} catch (error) {
		console.error("Checkout error: ", error);

		return NextResponse.json({
			error: "Failed to create checkout session"
		}, {
			status: 500,
		});
	}
}
