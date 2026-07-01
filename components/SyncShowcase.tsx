'use client';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Note } from "./Note";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const LOG_LINES = [
	{ t: "09:41:02.100", msg: "note_1 → edited (local)" },
	{ t: "09:41:02.410", msg: "chunk queued → chrome.storage.local" },
	{ t: "09:41:02.980", msg: "mergeSyncedNotes() → resolving" },
	{ t: "09:41:03.220", msg: "note_2 ← updated (remote)" },
];

export default function SyncShowcase() {
	const [note1, setNote1] = useState("Hello");
	const [note2, setNote2] = useState("Hello");
	const syncTimeout = useRef<NodeJS.Timeout | null>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);

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
		const split = headingRef.current
			? new SplitText(headingRef.current, { type: "chars", charsClass: "char" })
			: null;

		gsap.timeline({
			scrollTrigger: {
				trigger: ".notes-container",
				start: 'top center',
				end: 'top top',
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
		}, ">")
		.fromTo(".sync-line", {
			strokeDashoffset: 240,
		}, {
			strokeDashoffset: 0,
			duration: 0.6,
		}, "<")
		.to(".sync-dot", {
			opacity: 1,
			repeat: -1,
			yoyo: true,
			duration: 0.8,
		}, ">-0.2");

		const infoTl = gsap.timeline({
			scrollTrigger: {
				trigger: ".notes-container",
				start: 'top center',
				end: 'top top',
				markers: false,
				toggleActions: 'play none none reverse',
			}
		});

		infoTl
			.from(".sync-eyebrow", { opacity: 0, y: 20, duration: 0.4 })
			.from(split ? split.chars : ".sync-heading", {
				opacity: 0,
				y: 30,
				stagger: 0.02,
				duration: 0.5,
			}, "-=0.2")
			.from(".sync-log-line", {
				opacity: 0,
				x: -12,
				stagger: 0.12,
				duration: 0.35,
			}, "-=0.1")
			.from(".sync-copy", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2");

		return () => split?.revert();
	});

	return (
		<section className='notes-container min-h-[100vh] max-md:min-h-max bg-neutral-900 relative overflow-hidden p-2 py-14 flex max-lg:flex-col-reverse max-xl:gap-20 items-center justify-center max-lg:pb-40'>

			{/* ghost watermark, consistent with the rest of the site */}
			<span className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black tracking-tighter text-neutral-800/20 whitespace-nowrap">
				SYNC
			</span>

			{/* Notes stage */}
			<div className="w-full h-full relative xl:ml-20 max-xl:flex max-xl:items-center max-xl:justify-center z-10">
				<div className="xl:absolute bottom-2 left-2 note-1">
					<div className="mb-2 flex items-center gap-2 max-xl:justify-center">
						<span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
						<span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">Device A</span>
					</div>
					<Note className="w-[500px] h-[300px] border border-neutral-700 max-sm:scale-76 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
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

				<div className="absolute -bottom-30 xl:-bottom-50 xl:left-40 note-2">
					<div className="mb-2 flex items-center gap-2 max-xl:justify-center">
						<span className="h-1.5 w-1.5 rounded-full bg-[#32D74B]" />
						<span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">Device B</span>
					</div>
					<Note glassEffect={true} customColor="#236234" className="w-[500px] h-[300px] border border-neutral-700 max-sm:scale-76 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
						<div
							className="absolute top-[35px] w-full h-[calc(100%-35px)] px-4 py-2 text-white text-wrap break-words text-lg"
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

			{/* Info panel */}
			<div className="w-full flex items-center justify-center">
				<div className="w-full min-h-full flex flex-col justify-center sync-info gap-6 relative z-10 max-w-[560px] max-sm:px-2">

					<span className="sync-eyebrow font-mono text-xs tracking-[0.3em] uppercase text-[#32D74B]">
						● Live demo — cross-device
					</span>

					<h2
						ref={headingRef}
						className="sync-heading text-5xl max-sm:text-4xl font-bold text-white leading-tight"
					>
						Realtime Sync
					</h2>

					{/* signature element: a live-looking sync log tied to the real merge flow */}
					<div className="rounded-lg border border-neutral-800 bg-neutral-950/60 backdrop-blur-sm font-mono text-xs overflow-hidden">
						<div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 text-neutral-600">
							<span>sync.log</span>
							<span className="text-[#32D74B] flex items-center gap-1.5">
								<span className="h-1.5 w-1.5 rounded-full bg-[#32D74B] animate-pulse" />
								connected
							</span>
						</div>
						<div className="p-4 flex flex-col gap-1.5">
							{LOG_LINES.map((line) => (
								<div key={line.t} className="sync-log-line flex gap-3 text-neutral-500">
									<span className="text-neutral-700 shrink-0">{line.t}</span>
									<span className="text-neutral-300">{line.msg}</span>
								</div>
							))}
						</div>
					</div>

					<p className="sync-copy text-neutral-400 text-lg leading-relaxed max-sm:text-[16px] text-center">
						Write once, access everywhere. NoteToGo syncs your notes across devices in
						realtime and saves them securely to the cloud, so your latest ideas are always
						where you left them — switching between work, study, and browsing without losing momentum.
						<br /><br />
						Try it — type in one note and watch the other update live, just like it would across
						your own devices and browsers.
					</p>

					<span className="sync-copy text-sm text-neutral-500">
						Free plan includes up to 2 synced notes.
					</span>
				</div>
			</div>
		</section>
	);
}
