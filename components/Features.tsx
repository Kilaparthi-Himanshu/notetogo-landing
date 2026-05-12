'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

export const Features = () => {
	useGSAP(() => {
		gsap.timeline({
			scrollTrigger: {
        trigger: '.features',
        start: 'top center-=60',
        end: 'top top',
				scrub: true,
        markers: true
      }
		}).from(".line", {
			height: "0%",
			duration: 1
		})
		// .from(".line1", {
		// 	height: "0%",
		// 	duration: 0.6
		// }, ">");
	});

	return (
		<section className='bg-change min-h-[100vh] bg-neutral-900 flex features'>
			<div className='relative flex-1'>
				<div className='absolute bottom-0 right-0 h-[60%] w-[2px] bg-neutral-500 line' />
			</div>

			<div className='relative flex-1'>
				<div className='absolute top-0 right-0 h-[60%] w-[2px] bg-neutral-500 line' />
			</div>

			<div className='flex-1'>

			</div>
		</section>
	)
}
