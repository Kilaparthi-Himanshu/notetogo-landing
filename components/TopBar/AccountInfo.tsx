'use clinet';

import { UserDetailsType } from '@/lib/atoms';
import React, { useState } from 'react';

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
			<div className='min-w-full min-h-full flex'>
				<div className='flex-1 border-r border-neutral-400 py-10'>
					<div className='w-full flex flex-col items-end justify-center gap-2 p-4 text-white font-semibold'>
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

				<div className='flex-2 p-6 text-white flex flex-col gap-6 overflow-y-auto'>
					<p className='text-3xl font-semibold'>
						{panel.charAt(0).toUpperCase() + panel.slice(1)} Settings
					</p>

					{panel === "account" && (
						<div className='w-full rounded-[32px] corner-squircle bg-neutral-900 border border-neutral-700 p-6 flex flex-col gap-6 shadow-[0px_0px_20px_rgba(0,0,0,0.25)]'>

							{/* Profile */}
							<div className='flex items-center gap-4'>
								<div className='size-16 rounded-full bg-violet-600 flex items-center justify-center text-3xl font-bold'>
									{userDetails?.email?.[0]?.toUpperCase()}
								</div>

								<div className='flex flex-col'>
									<span className='text-2xl font-semibold break-all'>
										{userDetails?.email}
									</span>

									<span className='text-neutral-400 text-sm'>
										Joined NoteToGo
									</span>
								</div>
							</div>

							<div className='w-full h-[1px] bg-neutral-700' />

							{/* Subscription */}
							<div className='flex flex-col gap-3'>
								<span className='text-lg text-neutral-400'>
									Subscription
								</span>

								<div className='flex items-center justify-between bg-neutral-800 rounded-3xl corner-squircle px-5 py-4'>
									<div className='flex flex-col'>
										<span className='text-xl font-semibold'>
											Current Plan
										</span>

										<span className='text-neutral-400 text-sm'>
											Manage your NoteToGo subscription
										</span>
									</div>

									<div
										className={`px-4 py-2 rounded-full text-sm font-semibold border ${
											userDetails?.plan === 'pro'
												? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
												: 'bg-neutral-700 border-neutral-600 text-neutral-300'
										}`}
									>
										{userDetails?.plan?.toUpperCase()}
									</div>
								</div>
							</div>

							{/* Account Info */}
							<div className='flex flex-col gap-3'>
								<span className='text-lg text-neutral-400'>
									Account Information
								</span>

								<div className='bg-neutral-800 rounded-3xl corner-squircle p-5 flex flex-col gap-4'>
									<div className='flex items-center justify-between'>
										<span className='text-neutral-400'>
											Email Address
										</span>

										<span className='font-medium break-all text-right max-w-[60%]'>
											{userDetails?.email}
										</span>
									</div>

									<div className='w-full h-[1px] bg-neutral-700' />

									<div className='flex items-center justify-between'>
										<span className='text-neutral-400'>
											User ID
										</span>

										<span className='font-medium text-right max-w-[60%] truncate'>
											{userDetails?.user_id}
										</span>
									</div>
								</div>
							</div>

							{/* Danger Zone */}
							<div className='flex flex-col gap-3'>
								<span className='text-lg text-red-400'>
									Danger Zone
								</span>

								<button
									className='w-full h-[55px] rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 font-semibold hover:bg-red-500/20 transition-all cursor-pointer corner-squircle'
									type='button'
									onClick={signOut}
								>
									Sign Out
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
