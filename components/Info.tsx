'use client';

import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { DarkNote } from './DarkNote';
import DarkNoteOptions from './DarkNoteOptions';

gsap.registerPlugin(ScrollTrigger);

const Info = () => {
  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.bg-change',
        start: 'top bottom',
        end: 'top+=200 top',
        scrub: true,
        markers: false
      }
    })
    .fromTo('.bg-change', {
      backgroundColor: '#ffffff',
      opacity: 0
    }, {
      opacity: 1,
      backgroundColor: '#171717',
      ease: 'power1.in'
    });

    gsap.from('.dark-note-container', {
      scrollTrigger: {
        trigger: '.info',
        start: 'top center',
        end: 'top top',
        scrub: true,
        markers: false
      },
      x: -800
    });

    gsap.fromTo('.text-info', {
      opacity: 0,
      y: -200
    }, {
      scrollTrigger: {
        trigger: '.info',
        start: 'top top+=200',
        // end: 'top top',
        // scrub: true,
        toggleActions: 'play none none none',
        markers: false
      },
      duration: 1,
      opacity: 1,
      y: 0,
    });
  });

  // Horizontal scroll
  useGSAP(() => {
    const infoWrapper = document.querySelector('.info-inner');

    function getScrollAmount() {
      return infoWrapper!.scrollWidth - window.innerWidth; // return +ve value
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.info',
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 2,
        invalidateOnRefresh: true,
        markers: false
      }
    });

    tl.to(infoWrapper, { x: 0, duration: 0 }) // stay still
      .to(infoWrapper, {
        x: () => getScrollAmount(), // scroll to right (+ve x direction)
        duration: 6,
        // duration in a tween no longer means “seconds” — it becomes a proportion of that total scroll range. i.e. speed across 100vw scroll range
      }, "+=5")
      // Here 5 dosen't mean seconds unlike normally due to scrub
      // "+=5" means "start this tween 5 timeline units after the previous one ends."
      // In a scroll-linked timeline, those units are not seconds — they’re proportional to the scroll range defined by your start and end.
      .to({}, {}, "+=5");
  });

  return (
    <section className='bg-change min-h-[100vh]'>
      <div className="w-full min-h-[50vh] bg-linear-to-b from-white to-neutral-900" />

      <div className='info right-0 w-[200vw] h-[100vh] flex items-center justify-center bg-neutral-900'>
        <div className='info-inner -translate-x-[100vw] flex items-center w-full h-max justify-between'>
          <div className='text-info-2 w-max h-max text-center ml-30 flex flex-col items-center justify-center gap-8'>
            <span className='text-8xl text-white font-bold'>
              Perfect For…
            </span>

            <span className='text-2xl text-white leading-relaxed text-left'>
              • 📚 Students - Save research notes without breaking focus.<br />

              • 💡 Professionals - Capture ideas the moment they strike.<br />

              • 🛍️ Shoppers - Keep track of must-buy products.<br />

              • 🎨 Creators - Brainstorm anytime, anywhere.<br />
            </span>
          </div>

          {/* <div className='w-max'> */}
            <div className='dark-note-container'>
              <DarkNote width={800} height={600} menuOpen={true}>
                <DarkNoteOptions />
              </DarkNote>
            </div>
          {/* </div> */}

          <div className='text-info w-[560px] h-max text-center mr-30 flex flex-col items-center justify-center gap-8'>
            <span className='text-8xl text-white font-bold'>
              What Is NoteToGo?
            </span>

            <span className='text-2xl text-white'>
              NoteToGo is a lightweight, distraction-free note-taking extension that lets you jot ideas instantly while browsing. Capture thoughts, links, and snippets without switching tabs — everything stays right where you need it.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Info;
