'use client';

import React, { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useAtomValue } from 'jotai';
import { userAtom, userDetailsAtom } from '@/lib/atoms';

gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
	const user = useAtomValue(userAtom);
	const userDetails = useAtomValue(userDetailsAtom);

	return (
		<section className='bg-change-pricing min-h-[100vh]'>
			<div className="w-full min-h-[50vh] bg-linear-to-b from-neutral-900 to-white gradient-ease-in-out" />

			<div id="pricing" className='w-full min-h-[110vh] bg-white'>
				<div className='w-full bg-white flex flex-col items-center px-6 py-4'>
					<div className='max-w-[1200px] w-full flex flex-col items-center gap-10'>

						{/* Heading */}
						<div className='text-center flex flex-col gap-4'>
							<span className='text-6xl max-md:text-4xl font-bold text-neutral-900'>
								Simple Pricing
							</span>

							<span className='text-xl text-neutral-500 max-w-[700px] leading-relaxed'>
								Choose the workflow that fits your note-taking style.
								No bloated subscriptions. Just powerful features when you need them.
							</span>
						</div>

						{/* Pricing Cards */}
						<div className='w-full flex max-lg:flex-col items-center justify-center gap-10'>

							{/* Free */}
							<div className='w-[380px] rounded-[60px] corner-squircle border border-neutral-200 bg-white p-8 flex flex-col gap-4 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2'>

								<div className='flex flex-col gap-3'>
									<span className='text-4xl font-bold text-neutral-900'>
										Free
									</span>

									<span className='text-neutral-500 text-lg'>
										Perfect for quick notes and everyday use.
									</span>
								</div>

								<div className='flex items-end gap-2'>
									<span className='text-6xl font-bold text-neutral-900'>
										$0
									</span>

									<span className='text-neutral-500 text-xl pb-2'>
										/ forever
									</span>
								</div>

								<Link
									className='w-full h-[58px] rounded-full border border-neutral-300 text-lg font-medium transition-all hover:bg-neutral-100 cursor-pointer flex items-center justify-center'
									href={"https://chromewebstore.google.com/detail/notetogo-save-notes-passw/aacbmfpcgjlmefmhhbafimdaefpifkjk"}
									target="_blank"
								>
									Get Started
								</Link>

								<div className='w-full h-[1px] bg-neutral-200' />

								<div className='flex flex-col gap-2 text-lg text-neutral-700'>

									<div>✓ Unlimited local notes</div>

									<div>✓ 2 cloud synced notes</div>

									<div>✓ Themes & custom colors</div>

									<div>✓ Pin notes</div>

									<div>✓ Persist notes between sessions</div>

									<div>✓ Password protection</div>

									<div>✓ Lightweight & distraction-free</div>

								</div>
							</div>

							{/* Pro */}
							<div className='relative w-[420px] rounded-[60px] corner-squircle border border-[#8B5CF6]/30 bg-neutral-900 p-9 flex flex-col gap-4 shadow-[0px_0px_30px_rgba(139,92,246,0.68)] scale-[1.03] transition-all duration-300 hover:-translate-y-2'>

								{/* Badge */}
								<div className='absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-[#8B5CF6] text-white text-sm font-medium shadow-lg'>
									Most Popular
								</div>

								<div className='flex flex-col gap-3'>
									<span className='text-4xl font-bold text-white'>
										Pro
									</span>

									<span className='text-neutral-400 text-lg leading-relaxed'>
										Built for creators, developers, and power users.
									</span>
								</div>

								<div className='flex items-end gap-2'>
									<span className='text-6xl font-bold text-white'>
										$2.99
									</span>

									<span className='text-neutral-400 text-xl pb-2'>
										/ month
									</span>
								</div>

								<button className='w-full h-[60px] rounded-full bg-[#8B5CF6] text-white text-lg font-medium transition-all hover:scale-[1.02] hover:bg-[#7C3AED] cursor-pointer'>
									{userDetails ?  '✓ Active Plan' : 'Upgrade to Pro'}
								</button>

								<div className='w-full h-[1px] bg-neutral-700' />

								<div className='flex flex-col gap-2 text-lg text-neutral-200'>

									<div>✓ Everything in Free</div>

									<div>✓ Unlimited synced notes</div>

									<div>✓ Realtime sync across devices</div>

									<div>✓ Glass effect</div>

									<div>✓ Rich text editor</div>

									<div>✓ Images, lists & formatting tools</div>

									<div>✓ Export as HTML, Markdown, PDF & DOCX</div>

									<div>✓ Priority feature updates</div>

									<div>✓ Future AI-powered features</div>

								</div>
							</div>

						</div>
					</div>
</div>
			</div>
		</section>
	);
}
