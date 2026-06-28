'use client';

import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Note } from './Note';
import { withMedia } from '@/lib/gsapMedia';

gsap.registerPlugin(ScrollTrigger);

const Opening = () => {
  useGSAP(() => {
    const cleanup = withMedia(({ isMobile, isTablet, isDesktop }) => {
			gsap.set("#title", {
				force3D: false,
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: '#home',
					start: 'top top',
					end: 'bottom top',
					pin: '#home',
					scrub: true,
					markers: false,
				}
			});

			tl.to('#light-note', {
				scale: 1,
				ease: 'power1.inOut',
				force3D: false,
			});

			tl.to('#title', {
				scale: 2
			}, '<');
		});

    return cleanup;
  });

  return (
    <section id="home" className='w-[100dvw] h-screen flex items-center justify-center bg-white'>
      <Note id='light-note' className='mx-2 w-[710px] max-w-screen aspect-[710/480] max-sm:scale-[4.5] sm:scale-[3.2]' >
        <div className='absolute top-1/2 left-1/2 -translate-[50%]'>
          <span className='text-[60px] max-lg:text-[40px] max-md:text-[30px] max-sm:text-[14px] flex items-center text-box-space gap-3 max-sm:gap-1' id='title'>
						NoteToGo
						<img src='/icon.png' className='size-13 max-lg:size-10 max-md:size-8 max-sm:size-4' />
					</span>
        </div>
      </Note>
    </section>
  );
}

export default Opening;