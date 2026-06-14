'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function BillingStatus() {
	const router = useRouter();

	const [activated, setActivated] = useState(false);
	const [seconds, setSeconds] = useState(3);

	useEffect(() => {
		if (activated) return;

		const interval = setInterval(async () => {
			try {
				const {
					data: { user },
				} = await supabase.auth.getUser();

				if (!user) return;

				const { data } = await supabase
					.from("users")
					.select("plan")
					.eq("user_id", user.id)
					.maybeSingle();

				if (data?.plan === "pro") {
					clearInterval(interval);
					setActivated(true);
				}
			} catch (error) {
				console.error(error);
			}
		}, 2000);

		return () => clearInterval(interval);
	}, [activated]);

	useEffect(() => {
		if (!activated) return;

		if (seconds === 0) {
			router.push("/");
			return;
		}

		const timer = setTimeout(() => {
			setSeconds((prev) => prev - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [activated, seconds, router]);

	if (activated) {
		return (
			<div className="w-screen h-screen bg-neutral-950 flex items-center justify-center p-6">
				<div className="max-w-[500px] text-center flex flex-col gap-6">
					<div className="text-7xl">🎉</div>

					<h1 className="text-4xl font-bold text-white">
						NoteToGo Pro Activated
					</h1>

					<p className="text-neutral-400 text-lg">
						Your subscription is now active and all Pro features
						are ready to use.
					</p>

					<div className="text-neutral-500">
						Redirecting in {seconds}s...
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-screen h-screen bg-neutral-950 flex items-center justify-center p-6">
			<div className="max-w-[500px] text-center flex flex-col gap-6">
				<div className="text-7xl">⏳</div>

				<h1 className="text-4xl font-bold text-white">
					Payment Processing
				</h1>

				<p className="text-neutral-400 text-lg">
					We're activating your NoteToGo Pro subscription.
					This usually takes a few seconds.
				</p>
			</div>
		</div>
	);
}