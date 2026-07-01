'use client';

import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Note } from "./Note";
import TipTapEditorDemo from "./RichEditorDemo/TipTapEditorDemo";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const FORMAT_LOG = [
	{ t: "09:41:02.100", msg: "bold → toggled" },
	{ t: "09:41:02.410", msg: "highlight → #FFD60A" },
	{ t: "09:41:02.980", msg: "list → ordered" },
	{ t: "09:41:03.220", msg: "font → Gill Sans MT · 16px" },
];

export default function RichTextShowcase() {
	const headingRef = useRef<HTMLHeadingElement>(null);

	useGSAP(() => {
		gsap.timeline({
			scrollTrigger: {
				trigger: ".rich-note-container",
				start: 'top center-=60',
				end: 'top top',
				// scrub: true,
				markers: false,
				toggleActions: 'play none none reverse',
			}
		})
		.from(".rich-note", {
			opacity: 0,
			y: -120,
			duration: 1
		});

		const split = headingRef.current
			? new SplitText(headingRef.current, { type: "chars", charsClass: "char" })
			: null;

		const infoTl = gsap.timeline({
			scrollTrigger: {
				trigger: ".rich-note-container",
				start: 'top center-=60',
				end: 'top top',
				// scrub: true,
				markers: false,
				toggleActions: 'play none none reverse',
			}
		});

		infoTl
			.from(".rich-text-info", {
				opacity: 0,
				y: 200,
				duration: 1
			})
			.from(".rich-eyebrow", { opacity: 0, y: 20, duration: 0.4 }, "-=0.6")
			.from(split ? split.chars : ".rich-heading", {
				opacity: 0,
				y: 30,
				stagger: 0.02,
				duration: 0.5,
			}, "-=0.2")
			.from(".format-log-line", {
				opacity: 0,
				x: -12,
				stagger: 0.12,
				duration: 0.35,
			}, "-=0.1")
			.from(".rich-copy", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2");

		return () => split?.revert();
	});

	return (
		<section className='rich-note-container min-h-[100vh] max-md:min-h-max bg-neutral-900 max-lg:flex-col p-2 py-14 flex items-center justify-center max-xl:gap-20 max-lg:pb-20 relative overflow-hidden'>

			{/* ghost watermark, consistent with the rest of the site */}
			<span className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black tracking-tighter text-neutral-800/20 whitespace-nowrap">
				RICH
			</span>

			<div className="w-full min-h-full flex items-center justify-center rich-text-info relative z-10">
				<div className="w-[500px] flex flex-col gap-6 relative max-sm:px-2">

					<span className="rich-eyebrow font-mono text-xs tracking-[0.3em] uppercase text-[#c45533] flex items-center gap-2">
						<span className="h-1.5 w-1.5 rounded-full bg-[#c45533]" />
						Pro · Rich text editor
					</span>

					<h2
						ref={headingRef}
						className="rich-heading text-5xl max-sm:text-4xl font-bold text-white leading-tight"
					>
						Rich Text Editing
					</h2>

					{/* signature element: a live-looking format log tied to the real editor toolbar */}
					<div className="rounded-lg border border-neutral-800 bg-neutral-950/60 backdrop-blur-sm font-mono text-xs overflow-hidden">
						<div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 text-neutral-600">
							<span>format.log</span>
							<span className="text-[#c45533] flex items-center gap-1.5">
								<span className="h-1.5 w-1.5 rounded-full bg-[#c45533] animate-pulse" />
								editing
							</span>
						</div>
						<div className="p-4 flex flex-col gap-1.5">
							{FORMAT_LOG.map((line) => (
								<div key={line.t} className="format-log-line flex gap-3 text-neutral-500">
									<span className="text-neutral-700 shrink-0">{line.t}</span>
									<span className="text-neutral-300">{line.msg}</span>
								</div>
							))}
						</div>
					</div>

					<p className="rich-copy text-neutral-400 text-lg leading-relaxed max-sm:text-[16px]">
						Create more than plain notes with powerful rich text editing. Format text,
						organize ideas, highlight important sections, and customize your notes with
						an intuitive editor designed to stay fast and distraction-free.
						<br /><br />
						Try the demo on the right — experiment with formatting tools like bold text,
						colors, lists, alignment, and more to see how effortlessly NoteToGo adapts
						to your workflow.
					</p>

					<span className="rich-copy text-sm text-neutral-500">
						Pro only feature.
					</span>
				</div>
			</div>

			<div className="w-full h-full relative xl:ml-20 flex items-center justify-center z-10">
				<div className="rich-note">
					<Note theme="dark" className="w-[530px] h-[450px] max-sm:w-[450px] max-sm:scale-76">
						<div
							className="absolute top-[35px] w-full h-[calc(100%-35px)] text-black text-wrap break-words text-lg"
							data-lenis-prevent
						>
							<TipTapEditorDemo />
						</div>
					</Note>
				</div>
			</div>
		</section>
	);
}