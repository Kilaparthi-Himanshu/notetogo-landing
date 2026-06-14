// app/billing/result/page.tsx

import Link from "next/link";
import BillingStatus from "@/components/misc/BillingStatus";

export default async function BillingResultPage({
	searchParams,
}: {
	searchParams: Promise<{
		status?: string;
		subscription_id?: string;
		email?: string;
	}>;
}) {
	const params = await searchParams;

	const status = params.status;

	if (status === "failed") {
		return (
			<div className="w-screen h-screen bg-neutral-950 flex items-center justify-center p-6">
				<div className="max-w-[500px] text-center flex flex-col gap-6">
					<div className="text-7xl">❌</div>

					<h1 className="text-4xl font-bold text-white">
						Payment Failed
					</h1>

					<p className="text-neutral-400 text-lg">
						Your payment could not be processed.
						Please try again using another payment method.
					</p>

					<Link
						href="/"
						className="bg-violet-600 px-6 py-3 rounded-full text-white"
					>
						Try Again
					</Link>
				</div>
			</div>
		);
	}

	return <BillingStatus />;
}