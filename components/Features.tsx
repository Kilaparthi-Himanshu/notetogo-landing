'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React from 'react';
import { FaRegNoteSticky } from "react-icons/fa6";
import { Lock, Pin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Features = () => {
	useGSAP(() => {
		gsap.timeline({
			scrollTrigger: {
        trigger: '.features',
        start: 'top center-=100',
        end: 'top top',
				// toggleActions: 'play reverse play reverse',
				scrub: true,
				// snap: {
				// 	snapTo: 1,
				// 	duration: 0.35,
				// 	delay: 0,
				// 	ease: 'power2.out',
				// 	inertia: false
				// },
        markers: false
      }
		}).from(".line", {
			height: "0%",
			duration: 1
		});
		// .from(".line1", {
		// 	height: "0%",
		// 	duration: 0.6
		// }, ">");

		gsap.timeline({
			scrollTrigger: {
        trigger: '.features',
        start: 'top center-=120',
        end: 'top top-=50',
				// scrub: true,
				toggleActions: 'play none none reverse',
        markers: false
      }
		}).from(".card", {
			opacity: 0,
			duration: 1
		});
	});

	return (
		<section id="features" className='bg-change min-h-[100vh] max-md:min-h-max bg-neutral-900 flex features max-md:flex-col max-md:gap-8'>
			<div className='relative flex-1 flex items-center justify-center'>
				<div className='max-md:hidden absolute bottom-0 right-0 h-[60%] w-[2px] bg-neutral-500 line' />

				<div className='relative flex-1 flex flex-col items-center justify-center px-16 gap-6 card'>
					<FaRegNoteSticky className='text-[#b7aee2]' size={100} />

					<span className='h-[120px] flex items-center justify-center text-5xl text-white font-bold text-center'>
						Instant Access
					</span>

					<span className='h-[180px] text-xl text-white text-justify'>
						Open NoteToGo the moment an idea appears. Capture thoughts, links, and snippets instantly without interrupting your workflow or leaving the page you’re on.
					</span>
				</div>
			</div>

			<div className='border-b border-neutral-500 mx-10 md:hidden' />

			<div className='relative flex-1 flex items-center justify-center'>
				<div className='max-md:hidden absolute top-0 right-0 h-[60%] w-[2px] bg-neutral-500 line' />

				<div className='relative flex-1 flex flex-col items-center justify-center px-16 gap-6 card'>
					<Pin className='text-[#FFB02E]' size={100} />

					<span className='h-[120px] flex items-center justify-center text-5xl text-white font-bold text-center'>
						Pin Anywhere
					</span>

					<span className='h-[180px] text-xl text-white text-justify'>
						Keep your notes visible while you browse, research, or work. Important ideas stay exactly where you need them - always within reach.
					</span>
				</div>
			</div>

			<div className='border-b border-neutral-500 mx-10 md:hidden' />

			<div className='relative flex-1 flex items-center justify-center'>
				<div className='relative flex-1 flex flex-col items-center justify-center px-16 gap-6 card'>
					<Lock className='text-[#00C2FF]' size={100} />

					<span className='h-[120px] flex items-center justify-center text-5xl text-white font-bold text-center'>
						Password Protected
					</span>

					<span className='h-[180px] text-xl text-white text-justify'>
						Secure personal notes, private thoughts, and sensitive information with built-in password protection designed for simplicity and peace of mind.
					</span>
				</div>
			</div>
		</section>
	);
}
