import { UserDetailsType } from '@/lib/atoms';
import React from 'react'

export default function Manage({
	userDetails,
	dodoSubscriptionData
}: {
	userDetails: UserDetailsType;
	dodoSubscriptionData: any;
}) {
	return (
		<div className='flex flex-col gap-6'>
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

			{/* Subscription Info */}
			<div className='flex flex-col gap-3'>
				<span className='text-lg text-neutral-400'>
					Subscription Information
				</span>

				<div className='bg-neutral-800 rounded-3xl corner-squircle p-5 flex flex-col gap-4'>
					<div className='flex items-center justify-between'>
						<span className='text-neutral-400'>
							Status
						</span>

						<span className='font-medium break-all text-right max-w-[60%]'>
							{userDetails?.subscription_status
								? userDetails.subscription_status.charAt(0).toUpperCase() +
									userDetails.subscription_status.slice(1)
								: ''
							}
						</span>
					</div>

					<div className='w-full h-[1px] bg-neutral-700' />

					{/* <div className='flex items-center justify-between'>
						<span className='text-neutral-400'>
							Started On
						</span>

						<span className='font-medium text-right max-w-[60%] truncate'>
							{dodoSubscriptionData?.created_at &&
  							new Date(dodoSubscriptionData.created_at).toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
									year: 'numeric',
								})
							}
						</span>
					</div>

					<div className='w-full h-[1px] bg-neutral-700' /> */}

					<div className='flex items-center justify-between'>
						<span className='text-neutral-400'>
							Next Billing Date
						</span>

						<span className='font-medium text-right max-w-[60%] truncate'>
							{userDetails?.subscription_current_period_end &&
  							new Date(userDetails.subscription_current_period_end).toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
									year: 'numeric',
								})
							}
						</span>
					</div>

					<div className='w-full h-[1px] bg-neutral-700' />

					<div className='flex items-center justify-between'>
						<span className='text-neutral-400'>
							Auto Renewal
						</span>

						<span className='font-medium text-right max-w-[60%] truncate'>
							Enabled
						</span>
					</div>

					<div className='w-full h-[1px] bg-neutral-700' />

					<div className='flex items-center justify-between'>
						<span className='text-neutral-400'>
							Provider
						</span>

						<span className='font-medium text-right max-w-[60%] truncate'>
							Dodo Payments
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
