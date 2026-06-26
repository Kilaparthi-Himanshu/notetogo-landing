'use client';

import { UserDetailsType } from '@/lib/atoms';
import React, { useEffect, useState } from 'react';
import Manage from './Manage';
import { AnimatePresence, motion } from 'framer-motion';
import History from './History';

export default function SubscriptionPanel({
	userDetails,
}: {
	userDetails: UserDetailsType;
}) {
	const [tab, setTab] = useState<'manage' | 'history'>('manage');
	const [dodoSubscriptionData, setDodoSubscriptionData] = useState(null);

	// useEffect(() => {
	// 	async function fetchDodoSubscriptionData() {
	// 		const res = await fetch('/api/dodo/subscription');
	// 		const data = await res.json();

	// 		if (!data || !res.ok) return;

	// 		console.log(data);
	// 		setDodoSubscriptionData(data.subscription);
	// 	}

	// 	fetchDodoSubscriptionData();
	// }, []);

	return (
		<motion.div 
			layout
			className='w-full rounded-[32px] corner-squircle bg-neutral-900 border border-neutral-700 p-6 max-sm:p-4 flex flex-col gap-6 shadow-[0px_0px_20px_rgba(0,0,0,0.25)]'
		>
			{/* Tab Bar */}
			<div className='w-max flex gap-2'>
				<button className={`${tab === 'manage' && 'bg-neutral-800'} px-4 py-2 rounded-2xl corner-squircle cursor-pointer transition-all`} onClick={() => setTab('manage')}>
					Manage
				</button>

				<button className={`${tab === 'history' && 'bg-neutral-800'} px-4 py-2 rounded-2xl corner-squircle cursor-pointer transition-all`} onClick={() => setTab('history')}>
					History
				</button>
			</div>

			<div className='w-full h-[1px] bg-neutral-700' />

			<AnimatePresence mode="wait">
				{tab === 'manage' ? (
					<motion.div
						key="manage"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<Manage userDetails={userDetails} dodoSubscriptionData={dodoSubscriptionData} />
					</motion.div>
				) : (
					<motion.div
						key="history"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<History />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
