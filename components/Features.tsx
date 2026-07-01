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
		<section id="features" className='bg-change min-h-[100vh] max-md:min-h-max bg-neutral-900 flex features max-md:flex-col max-md:gap-8 relative overflow-hidden'>

			{/* shared ghost watermark, consistent with the rest of the site */}
			<span className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] font-black tracking-tighter text-neutral-800/15 whitespace-nowrap z-0">
				FEATURES
			</span>

			<div className='relative flex-1 flex items-center justify-center'>
				<div className='max-md:hidden absolute bottom-0 right-0 h-[60%] w-[2px] bg-neutral-500 line' />

				<div className='relative flex-1 flex flex-col items-center justify-center px-16 gap-5 card'>
					<div className="h-20 w-20 rounded-full border border-[#b7aee2]/30 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center">
						<FaRegNoteSticky className='text-[#b7aee2]' size={34} />
					</div>

					<span className='font-mono text-xs tracking-[0.3em] uppercase text-[#b7aee2]'>
						◆ Zero friction
					</span>

					<span className='h-[120px] flex items-center justify-center text-5xl text-white font-bold text-center'>
						Instant Access
					</span>

					<span className='h-[180px] text-xl text-neutral-400 text-justify leading-relaxed'>
						Open NoteToGo the moment an idea appears. Capture thoughts, links, and snippets instantly without interrupting your workflow or leaving the page you’re on.
					</span>

					<span className="font-mono text-[11px] text-neutral-500 border border-neutral-800 rounded-full px-3 py-1 bg-neutral-950/60">
						⌘⇧N → new note
					</span>
				</div>
			</div>

			<div className='border-b border-neutral-500 mx-10 md:hidden relative z-10' />

			<div className='relative flex-1 flex items-center justify-center'>
				<div className='max-md:hidden absolute top-0 right-0 h-[60%] w-[2px] bg-neutral-500 line' />

				<div className='relative flex-1 flex flex-col items-center justify-center px-16 gap-5 card'>
					<div className="h-20 w-20 rounded-full border border-[#FFB02E]/30 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center">
						<Pin className='text-[#FFB02E]' size={34} />
					</div>

					<span className='font-mono text-xs tracking-[0.3em] uppercase text-[#FFB02E]'>
						◆ Stays in view
					</span>

					<span className='h-[120px] flex items-center justify-center text-5xl text-white font-bold text-center'>
						Pin Anywhere
					</span>

					<span className='h-[180px] text-xl text-neutral-400 text-justify leading-relaxed'>
						Keep your notes visible while you browse, research, or work. Important ideas stay exactly where you need them - always within reach.
					</span>

					<span className="font-mono text-[11px] text-neutral-500 border border-neutral-800 rounded-full px-3 py-1 bg-neutral-950/60">
						position: fixed
					</span>
				</div>
			</div>

			<div className='border-b border-neutral-500 mx-10 md:hidden relative z-10' />

			<div className='relative flex-1 flex items-center justify-center'>
				<div className='relative flex-1 flex flex-col items-center justify-center px-16 gap-5 card'>
					<div className="h-20 w-20 rounded-full border border-[#00C2FF]/30 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center">
						<Lock className='text-[#00C2FF]' size={34} />
					</div>

					<span className='font-mono text-xs tracking-[0.3em] uppercase text-[#00C2FF]'>
						◆ Locked by default
					</span>

					<span className='h-[120px] flex items-center justify-center text-5xl text-white font-bold text-center'>
						Password Protected
					</span>

					<span className='h-[180px] text-xl text-neutral-400 text-justify leading-relaxed'>
						Secure personal notes, private thoughts, and sensitive information with built-in password protection designed for simplicity and peace of mind.
					</span>

					<span className="font-mono text-[11px] text-neutral-500 border border-neutral-800 rounded-full px-3 py-1 bg-neutral-950/60">
						encrypted at rest
					</span>
				</div>
			</div>
		</section>
	);
}