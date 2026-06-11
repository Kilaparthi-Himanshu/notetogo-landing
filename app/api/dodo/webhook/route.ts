import { dodopayments } from "@/lib/dodopayments";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";

const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_KEY!);

export async function POST(request: Request) {
	const headersList = await headers();

	try {
		const rawBody = await request.text();
		const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") || "",
      "webhook-signature": headersList.get("webhook-signature") || "",
      "webhook-timestamp": headersList.get("webhook-timestamp") || "",
    }
		await webhook.verify(rawBody, webhookHeaders);
		const payload = JSON.parse(rawBody);

		console.log("========== WEBHOOK ==========");
		console.log(payload.type);
		console.log(JSON.stringify(payload, null, 2));
		console.log("=============================");

		switch (payload.type) {
			case "subscription.active":
				const subscription = await dodopayments.subscriptions.retrieve(payload.data.subscription_id);
				console.log("-------SUBSCRIPTION DATA START-------");
				console.log(subscription);
				console.log("-------SUBSCRIPTION DATA END-------");
				break;
			case "subscription.failed":
				break;
			case "subscription.cancelled":
				break;
			case "subscription.renewed":
				break;
			case "subscription.on_hold":
				break;
			default:
				break;
		}

		return NextResponse.json({
			message: "Webhook processed successfully"
		}, {
			status: 200
		});
	} catch (error) {
		return NextResponse.json({
			message: `Webhook error occured: ${error}`
		}, {
			status: 500
		});
	}
}
