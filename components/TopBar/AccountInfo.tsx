'use clinet';

import { UserDetailsType } from '@/lib/atoms';
import React, { useState } from 'react';
import AccountPanel from './AccountInfoPanels/AccountPanel';
import SubscriptionPanel from './AccountInfoPanels/SubscriptionPanel/SubscriptionPanel';

export default function AccountInfo({
	userDetails,
	signOut
}: {
	userDetails: UserDetailsType;
	signOut: () => void;
}) {
	const [panel, setPanel] = useState<'account' | 'subscription'>('account');

	return (
		<>
			<div className='w-full h-full flex max-sm:flex-col'>
				<div className='sm:flex-1 sm:border-r max-sm:border-b border-neutral-400 sm:py-10 max-sm:pt-10'>
					<div className='w-full flex sm:flex-col items-end justify-center gap-2 p-4 text-white font-semibold max-sm:h-max'>
						<button
							className={`p-2 ${panel === "account" && 'bg-neutral-800'} rounded-3xl corner-squircle transition-all cursor-pointer w-[130px] text-center`}
							onClick={() => setPanel('account')}
						>
							Account
						</button>

						<button 
							className={`p-2 ${panel === "subscription" && 'bg-neutral-800'} rounded-3xl corner-squircle transition-all cursor-pointer w-[130px] text-center`}
							onClick={() => setPanel('subscription')}
						>
							Subscription
						</button>
					</div>
				</div>

				<div className='flex-2 p-6 max-sm:p-4 text-white flex flex-col gap-6 overflow-y-auto'>
					<p className='text-3xl font-semibold'>
						{panel.charAt(0).toUpperCase() + panel.slice(1)} Settings
					</p>

					{panel === "account" ? (
						<AccountPanel userDetails={userDetails} signOut={signOut} />
					) : panel === "subscription" ? (
						<SubscriptionPanel userDetails={userDetails} />
					) : (
						<div></div>
					)}
				</div>
			</div>
		</>
	);
}
