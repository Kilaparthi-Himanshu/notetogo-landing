import { DodoPayments } from "dodopayments-checkout";

let initialized = false;

export function initializeDodo() {
	if (initialized) return;

	DodoPayments.Initialize({
		mode: process.env.NODE_ENV === "development"
			? "test"
			: "live",
		displayType: "overlay",
		onEvent: (event) => {
			console.log("EVENT: ", event);

			switch (event.event_type) {
				case "checkout.opened":
					break;

				case "checkout.closed":
					break;

				case "checkout.error":
					console.error(event);
					break;

				case "checkout.redirect":
					console.log("payment complete");
					break;
			}
		},
	});

	initialized = true;
}
