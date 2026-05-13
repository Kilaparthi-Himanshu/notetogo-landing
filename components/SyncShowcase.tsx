'use client';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LightNote } from "./LightNote";
import { IoMdCloudOutline } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

export default function SyncShowcase() {
	useGSAP(() => {
		gsap.timeline({
			scrollTrigger: {
				trigger: ".notes-container",
				start: 'top center',
        end: 'top top',
				// scrub: true,
				markers: false,
				toggleActions: 'play none none reverse',
			}
		})
		.from(".note-1", {
			opacity: 0,
			y: -120,
			duration: 0.4
		})
		.from(".note-2", {
			opacity: 0,
			y: -60,
			duration: 0.4
		}, ">");
	});

	return (
		<section className='notes-container min-h-[100vh] max-md:min-h-max bg-neutral-900 flex max-md:flex-col p-2 py-14 flex items-center justify-center'>
			<div className="w-full h-full relative ml-20">
				<div className="absolute bottom-2 left-2 note-1">
					<LightNote width={500} height={300} className="border-2 border-red-400">
						<div 
							className="absolute top-[35px] w-full h-[calc(100%-35px)] px-4 py-2 text-black text-wrap break-words text-lg"
						>
							<textarea defaultValue={"Hello"} className="overflow-auto w-full min-h-full outline-0 resize-none" data-lenis-prevent />
						</div>
					</LightNote>
				</div>

				<div className="absolute -bottom-60 left-60 note-2">
					<LightNote width={400} height={300} className="border-2 border-blue-400">
						<div 
							className="absolute top-[35px] w-full h-[calc(100%-35px)] px-4 py-2 text-black text-wrap break-words text-lg"
						>
							<textarea defaultValue={"Hello"} className="overflow-auto w-full min-h-full outline-0 resize-none" data-lenis-prevent />
						</div>
					</LightNote>
				</div>

			</div>

			<div className="w-full min-h-full flex items-center justify-center">
				<IoMdCloudOutline size={600} style={{color: "#32D74B"}} className="absolute blur-lg opacity-50" />

				<div className="w-[500px] relative">
					<span className='h-[120px] flex items-center justify-center text-5xl text-white font-bold text-center gap-4 underline'>
						Realtime Sync <IoMdCloudOutline size={60} style={{color: "#32D74B"}} className="pt-4" />
					</span>

					<span className='h-[180px] text-xl text-white text-justify'>
						Write once, access everywhere. NoteToGo instantly syncs your notes across devices in realtime, so your latest ideas are always up to date no matter where you open them. Perfect for switching between work, study, and browsing sessions without losing momentum.<br /><br />

						Try the demo on the left - start typing in one note and watch the second note update live instantly, just like it would across multiple devices and browsers.
					</span>
				</div>
			</div>
		</section>
	);
}