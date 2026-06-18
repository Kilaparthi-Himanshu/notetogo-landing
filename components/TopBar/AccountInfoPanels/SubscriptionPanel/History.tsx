'use client';

import React, { useEffect, useState } from 'react'

export default function History() {
	const [payments, setPayments] = useState([]);

	useEffect(() => {
		async function fetchDodoPaymentsData() {
			const res = await fetch('/api/dodo/payments-history');
			const data = await res.json();

			if (!data || !res.ok) return;

			console.log(data);
			setPayments(data.payments.items);
		}

		fetchDodoPaymentsData();
	}, []);

	if (!payments.length) return <div className='text-white'>Loading...</div>

	return (
		<div>
			{
				payments.map((payment: any) => (
					<div
						key={payment.payment_id}
						className="bg-neutral-800 rounded-3xl p-5 corner-squircle"
					>
						<div className="flex justify-between">
							<div>
								<p className="font-semibold">
									₹{(payment.total_amount / 100).toFixed(2)}
								</p>

								<p className="text-sm text-neutral-400">
									{new Date(payment.created_at).toLocaleDateString()}
								</p>
							</div>

							<span className={`${payment.status === "succeeded" ? 'text-green-400' : 'text-red-400'}`}>
								{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
							</span>
						</div>

						<div className="mt-4 text-sm text-neutral-400">
							{payment.payment_method === "upi"
								? "UPI"
								: `${payment.card_network} •••• ${payment.card_last_four}`}
						</div>

						{payment.invoice_url && (
							<a
								href={payment.invoice_url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-violet-400 mt-3 inline-block rounded-2xl corner-squircle bg-neutral-700 p-2"
							>
								Download Invoice
							</a>
						)}
					</div>
				))
			}
		</div>
	);
}
