'use client';

import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Note } from './Note';

gsap.registerPlugin(ScrollTrigger);

const Opening = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        pin: '#home',
        scrub: true,
        markers: false
      }
    });

    tl.from('#light-note', {
      scale: 3.2,
      ease: 'power1.inOut'
    });

    tl.to('#title', {
      scale: 2
    }, '<');
  });

  return (
    <section id="home" className='w-[100vw] h-[100vh] flex items-center justify-center bg-white'>
      <Note id='light-note'>
        <div className='absolute top-1/2 left-1/2 -translate-[50%]'>
          <span className='text-[60px] flex items-center text-box-space gap-2' id='title'>
						NoteToGo 
						<img src='/icon.png' className='size-12' />
					</span>
        </div>
      </Note>
    </section>
  );
}

export default Opening;