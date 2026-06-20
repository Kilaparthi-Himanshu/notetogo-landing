'use client';

import React, { useEffect, useState } from 'react'
import { FaCheck, FaSpinner, FaXmark } from 'react-icons/fa6';

export default function History() {
	const [payments, setPayments] = useState<null | []>(null);

	useEffect(() => {
		async function fetchDodoPaymentsData() {
			const res = await fetch('/api/dodo/payments-history');
			const data = await res.json();

			if (!data || !res.ok) {
				setPayments([]);
				return;
			}

			setPayments(data.payments.items);
		}

		fetchDodoPaymentsData();
	}, []);

	if (payments === null) {
		return <div>Loading...</div>;
	}

	if (payments.length === 0) {
		return <div>No payment history found.</div>;
	}

	return (
		<div className='max-h-[500px] overflow-y-auto space-y-4 custom-scrollbar'>
			{
				payments.map((payment: any) => (
					<div
						key={payment.payment_id}
						className="bg-neutral-800 rounded-3xl p-5 corner-squircle"
					>
						<div className="flex justify-between">
							<div>
								<p className="font-semibold">
									{
										new Intl.NumberFormat(undefined, {
											style: 'currency',
											currency: payment.currency,
										}).format(payment.total_amount / 100)
									}
								</p>

								<p className="text-sm text-neutral-400">
									{new Date(payment.created_at).toLocaleDateString()}
								</p>
							</div>

							<span className={`${payment.status === "succeeded" ? 'text-green-400' :  payment.status === "cancelled" ? 'text-red-400' : 'text-yellow-400'} flex gap-2 items-center h-max`}>
								{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}

								{payment.status === "succeeded" ? <FaCheck /> : payment.status === "cancelled" ? <FaXmark /> : <FaSpinner />}
							</span>
						</div>

						<div className="mt-4 text-sm text-neutral-400">
							 {payment.payment_method === "upi" ? (
									"UPI"
								) : payment.card_network ? (
									`${payment.card_network.charAt(0).toUpperCase() + payment.card_network.slice(1)} •••• ${payment.card_last_four ?? ""}`
								) : (
									payment.payment_method ?? "Unknown"
								)}
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
