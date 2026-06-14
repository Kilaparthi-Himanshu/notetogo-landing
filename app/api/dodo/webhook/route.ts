import { updateSubscription } from "@/lib/updateSubscription";
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

		console.log(`[WEBHOOK] ${payload.type}`);

		const subscription = payload.data;
		const userId = subscription.metadata.user_id;

		switch (payload.type) {
			case "subscription.active": {
				console.log("[SUBSCRIPTION ACTIVE]", {
					userId,
					subscriptionId: subscription.subscription_id,
					email: subscription.customer.email,
					status: subscription.status,
					nextBillingDate: subscription.next_billing_date,
				});

				await updateSubscription(userId, {
					plan: "pro",
					subscription_status: "active",
					subscription_provider: "dodo",

					subscription_id: subscription.subscription_id,
					customer_id: subscription.customer.customer_id,
					plan_id: subscription.product_id,

					subscription_current_period_start: subscription.previous_billing_date,

					subscription_current_period_end: subscription.next_billing_date,

					cancel_at_period_end: false,

					last_payment_at: subscription.previous_billing_date,
				});

				break;
			}

			case "subscription.updated": {
				console.log("[SUBSCRIPTION UPDATED]", {
					userId,
					subscriptionId: subscription.subscription_id,
					email: subscription.customer.email,
					status: subscription.status,
					nextBillingDate: subscription.next_billing_date,
				});

				await updateSubscription(userId, {
					subscription_status: subscription.status,

					subscription_current_period_start: subscription.previous_billing_date,

					subscription_current_period_end: subscription.next_billing_date,

					cancel_at_period_end: subscription.cancel_at_next_billing_date,
				});

				break;
			}

			case "subscription.on_hold": {
				console.warn("[SUBSCRIPTION ON HOLD]", {
					userId,
					subscriptionId: subscription.subscription_id,
					email: subscription.customer.email,
					status: subscription.status,
					nextBillingDate: subscription.next_billing_date,
				});

				await updateSubscription(userId, {
					subscription_status: "on_hold",
				});

				break;
			}

			case "subscription.renewed": {
				console.log("[SUBSCRIPTION RENEWED]", {
					userId,
					subscriptionId: subscription.subscription_id,
					email: subscription.customer.email,
					status: subscription.status,
					nextBillingDate: subscription.next_billing_date,
				});

				await updateSubscription(userId, {
					subscription_status: "active",

					subscription_current_period_start: subscription.previous_billing_date,

					subscription_current_period_end: subscription.next_billing_date,

					last_payment_at: subscription.previous_billing_date,
				});

				break;
			}

			case "subscription.cancelled": {
				console.log("[SUBSCRIPTION CANCELLED]", {
					userId,
					subscriptionId: subscription.subscription_id,
					email: subscription.customer.email,
					status: subscription.status,
					nextBillingDate: subscription.next_billing_date,
				});

				await updateSubscription(userId, {
					subscription_status: "cancelled",
					cancel_at_period_end: subscription.cancel_at_next_billing_date,
				});

				break;
			}

			case "subscription.failed": {
				console.log("[SUBSCRIPTION FAILED]", {
					userId,
					subscriptionId: subscription.subscription_id,
					email: subscription.customer.email,
					status: subscription.status,
					nextBillingDate: subscription.next_billing_date,
				});

				await updateSubscription(userId, {
					subscription_status: "failed",
				});

				break;
			}

			case "subscription.expired": {
				console.warn("[SUBSCRIPTION EXPIRED]", {
					userId,
					subscriptionId: subscription.subscription_id,
					email: subscription.customer.email,
					status: subscription.status,
					nextBillingDate: subscription.next_billing_date,
				});

				await updateSubscription(userId, {
					plan: "free",

					subscription_status: "expired",

					subscription_provider: null,

					cancel_at_period_end: false,

					subscription_id: null,
					customer_id: null,
					plan_id: null,

					subscription_current_period_start: null,
					subscription_current_period_end: null,
				});

				break;
			}

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
