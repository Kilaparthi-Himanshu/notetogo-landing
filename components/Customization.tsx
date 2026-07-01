'use client';

import NoteOptions from "./NoteOptions";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useRef, useState } from "react";
import { Note } from "./Note";
import Poem from './Poem';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Customization() {
	const [theme, setTheme] = useState('light');
	const [customColor, setCustomColor] = useState("#b23447");
	const [glassEffect, setGlassEffect] = useState(false);
	const headingRef = useRef<HTMLHeadingElement>(null);

	useGSAP(() => {
		gsap.timeline({
			scrollTrigger: {
				trigger: ".customization-note-container",
				start: 'top center-=60',
				end: 'top top',
				// scrub: true,
				markers: false,
				toggleActions: 'play none none reverse',
			}
		})
		.from(".customization-note", {
			opacity: 0,
			x: -120,
			duration: 1
		});

		const split = headingRef.current
			? new SplitText(headingRef.current, { type: "chars", charsClass: "char" })
			: null;

		const infoTl = gsap.timeline({
			scrollTrigger: {
				trigger: ".customization-note-container",
				start: 'top center-=60',
				end: 'top top',
				// scrub: true,
				markers: false,
				toggleActions: 'play none none reverse',
			}
		});

		infoTl
			.from(".customization-text-info", {
				opacity: 0,
				x: 120,
				duration: 1
			})
			.from(".custom-eyebrow", { opacity: 0, y: 20, duration: 0.4 }, "-=0.6")
			.from(split ? split.chars : ".custom-heading", {
				opacity: 0,
				y: 30,
				stagger: 0.02,
				duration: 0.5,
			}, "-=0.2")
			.from(".custom-config-row", {
				opacity: 0,
				x: -12,
				stagger: 0.12,
				duration: 0.35,
			}, "-=0.1")
			.from(".custom-copy", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2");

		return () => split?.revert();
	});

	const handleThemeChange = (newTheme: string) => {
		setTheme(newTheme);
		setCustomColor(newTheme === "light" ? "#ffffff" : "#262626"); // Reset custom color when theme changes
	}

	// useEffect(() => {
	// 	console.log(customColor);
	// }, [customColor]);

	return (
		<section className='customization-note-container min-h-[100vh] max-md:min-h-max bg-neutral-900 max-lg:flex-col-reverse max-xl:gap-20 p-2 py-14 flex items-center justify-center relative overflow-hidden'>

			{/* ghost watermark, consistent with the rest of the site */}
			<span className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-neutral-800/20 whitespace-nowrap">
				STYLE
			</span>

			<div className="w-full h-full relative xl:ml-20 customization-note max-xl:flex max-xl:justify-center max-xl:items-center max-sm:px-2 z-10">
				<Poem />

				<div>
					<Note theme={theme} menuOpen={true} customColor={customColor} glassEffect={glassEffect} className="w-[570px] h-[470px] max-sm:w-[500px] max-sm:scale-76">
						<NoteOptions customColor={customColor} setCustomColor={setCustomColor} theme={theme} handleThemeChange={handleThemeChange} glassEffect={glassEffect} setGlassEffect={setGlassEffect} disabledOptions={["Pin", "Persist", "Password", "Sync", "Export", "Toolbar"]} />

						<div 
							className="absolute top-[35px] w-full h-[calc(100%-35px)] px-4 py-2 text-black text-wrap break-words text-lg"
						>
							<textarea 
								className="overflow-auto w-full min-h-full outline-0 resize-none" 
								data-lenis-prevent
								defaultValue={""}
							/>
						</div>
					</Note>
				</div>
			</div>

			<div className="customization-text-info w-full min-h-full flex items-center justify-center relative z-10">
				<div className="w-[500px] flex flex-col gap-6 relative max-sm:px-2">

					<span className="custom-eyebrow font-mono text-xs tracking-[0.3em] uppercase text-[#9B5EFF] flex items-center gap-2">
						<span className="h-1.5 w-1.5 rounded-full bg-[#9B5EFF]" />
						Interactive demo · Live preview
					</span>

					<h2
						ref={headingRef}
						className="custom-heading text-5xl max-sm:text-4xl font-bold text-white leading-tight"
					>
						Customization
					</h2>

					{/* signature element: reflects the demo's actual live state, not decoration */}
					<div className="rounded-lg border border-neutral-800 bg-neutral-950/60 backdrop-blur-sm font-mono text-xs overflow-hidden">
						<div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 text-neutral-600">
							<span>appearance.config</span>
							<span className="text-[#9B5EFF] flex items-center gap-1.5">
								<span className="h-1.5 w-1.5 rounded-full bg-[#9B5EFF] animate-pulse" />
								live
							</span>
						</div>
						<div className="p-4 flex flex-col gap-2">
							<div className="custom-config-row flex items-center justify-between text-neutral-500">
								<span>theme</span>
								<span className="text-neutral-300">{theme}</span>
							</div>
							<div className="custom-config-row flex items-center justify-between text-neutral-500">
								<span>color</span>
								<span className="flex items-center gap-2 text-neutral-300">
									<span
										className="h-2.5 w-2.5 rounded-full border border-neutral-700"
										style={{ backgroundColor: customColor }}
									/>
									{customColor}
								</span>
							</div>
							<div className="custom-config-row flex items-center justify-between text-neutral-500">
								<span>glass</span>
								<span className={glassEffect ? "text-[#9B5EFF]" : "text-neutral-300"}>
									{glassEffect ? "on" : "off"}
								</span>
							</div>
						</div>
					</div>

					<p className="custom-copy text-neutral-400 text-lg leading-relaxed max-sm:text-[16px]">
						Make NoteToGo truly yours with customizable themes, accent colors,
						transparency, and glass effects. Create a workspace that matches your style
						while staying clean, modern, and distraction-free.
						<br /><br />
						Try the interactive demo on the left — experiment with themes and appearance
						settings to instantly transform your notes in realtime.
					</p>

					<span className="custom-copy text-sm text-neutral-500">
						Glass effect is a pro only feature.
					</span>
				</div>
			</div>
		</section>
	);
}