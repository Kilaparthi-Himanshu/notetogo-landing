'use client';

import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LightNote } from './LightNote';

gsap.registerPlugin(ScrollTrigger);

const Opening = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#opening',
        start: 'top top',
        end: 'bottom top',
        pin: '#opening',
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
    <section className='w-[100vw] h-[100vh] flex items-center justify-center bg-white' id='opening'>
      <LightNote>
        <div className='absolute top-1/2 left-1/2 -translate-[50%]'>
          <span className='text-[80px] inline-block' id='title'>NoteToGo</span>
        </div>
      </LightNote>
    </section>
  );
}

export default Opening;