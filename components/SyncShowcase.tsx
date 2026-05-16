'use client';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Note } from "./Note";
import { IoMdCloudOutline } from "react-icons/io";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SyncShowcase() {
	const [note1, setNote1] = useState("Hello");
	const [note2, setNote2] = useState("Hello");
	const syncTimeout = useRef<NodeJS.Timeout | null>(null);

	// Simulate delayed chunk updates
	const syncNotes = (value: string, source: 1 | 2) => {
		if (syncTimeout.current) {
			clearTimeout(syncTimeout.current);
		}

		syncTimeout.current = setTimeout(() => {
			if (source === 1) {
				setNote2(value);
			} else {
				setNote1(value);
			}
		}, 500);
	}

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

		gsap.timeline({
			scrollTrigger: {
				trigger: ".notes-container",
				start: 'top center',
        end: 'top top',
				// scrub: true,
				markers: false,
				toggleActions: 'play none none reverse',
			}
		}).from(".sync-info", {
			opacity: 0,
			y: 100,
			duration: 1
		});
	});

	return (
		<section className='notes-container min-h-[100vh] max-md:min-h-max bg-neutral-900 max-md:flex-col p-2 py-14 flex items-center justify-center'>
			<div className="w-full h-full relative ml-20">
				<div className="absolute bottom-2 left-2 note-1">
					<Note width={500} height={300} className="border-2 border-red-400">
						<div 
							className="absolute top-[35px] w-full h-[calc(100%-35px)] px-4 py-2 text-black text-wrap break-words text-lg"
						>
							<textarea 
								className="overflow-auto w-full min-h-full outline-0 resize-none" 
								data-lenis-prevent
								value={note1}
								onChange={(e) => {
									setNote1(e.target.value);
									syncNotes(e.target.value, 1);
								}}
							/>
						</div>
					</Note>
				</div>

				<div className="absolute -bottom-50 left-60 note-2">
					<Note width={400} height={300} className="border-2 border-blue-400">
						<div 
							className="absolute top-[35px] w-full h-[calc(100%-35px)] px-4 py-2 text-black text-wrap break-words text-lg"
						>
							<textarea 
								className="overflow-auto w-full min-h-full outline-0 resize-none" 
								data-lenis-prevent
								value={note2}
								onChange={(e) => {
									setNote2(e.target.value);
									syncNotes(e.target.value, 2);
								}}
							/>
						</div>
					</Note>
				</div>

			</div>

			<div className="w-full min-h-full flex items-center justify-center sync-info">
				<IoMdCloudOutline size={600} style={{color: "#32D74B"}} className="absolute blur-lg opacity-50" />

				<div className="w-[500px] relative text-justify">
					<span className='h-[120px] flex items-center justify-center text-5xl text-white font-bold text-center gap-4 underline'>
						Realtime Sync <IoMdCloudOutline size={60} style={{color: "#32D74B"}} className="pt-4" />
					</span>

					<span className='h-[180px] text-xl text-white'>
						Write once, access everywhere. NoteToGo instantly syncs your notes across devices in realtime and securely saves them to the cloud, so your latest ideas are always available no matter where you open them. Perfect for switching between work, study, and browsing sessions without losing momentum.
						<br /><br />

						Try the demo on the left - start typing in one note and watch the second note update live instantly, just like it would across multiple devices and browsers.
					</span>

					<br /><br />

					<span className="text-sm text-neutral-400">
						Free plan includes up to 2 synced notes.
					</span>
				</div>
			</div>
		</section>
	);
}