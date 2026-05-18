'use client';

import { Sparkles } from 'lucide-react';
import NoteOptions from "./NoteOptions";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useState } from "react";
import { Note } from "./Note";
import Poem from './Poem';

gsap.registerPlugin(ScrollTrigger);

export default function Customization() {
	const [theme, setTheme] = useState('light');
	const [customColor, setCustomColor] = useState("#b23447");
	const [glassEffect, setGlassEffect] = useState(false);

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

		gsap.timeline({
			scrollTrigger: {
				trigger: ".customization-note-container",
				start: 'top center-=60',
        end: 'top top',
				// scrub: true,
				markers: false,
				toggleActions: 'play none none reverse',
			}
		}).from(".customization-text-info", {
			opacity: 0,
			x: 120,
			duration: 1
		});
	});

	const handleThemeChange = (newTheme: string) => {
		setTheme(newTheme);
		setCustomColor(newTheme === "light" ? "#ffffff" : "#262626"); // Reset custom color when theme changes
	}

	useEffect(() => {
		console.log(customColor);
	}, [customColor]);

	return (
		<section className='customization-note-container min-h-[100vh] max-md:min-h-max bg-neutral-900 max-md:flex-col p-2 py-14 flex items-center justify-center'>
			<div className="w-full h-full relative ml-20 customization-note">
				<Poem />

				<div>
					<Note theme={theme} width={570} height={460} menuOpen={true} customColor={customColor} glassEffect={glassEffect} className="">
						<NoteOptions customColor={customColor} setCustomColor={setCustomColor} theme={theme} handleThemeChange={handleThemeChange} glassEffect={glassEffect} setGlassEffect={setGlassEffect} disabledOptions={["Pin", "Persist", "Password", "Sync", "Export"]} />

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

			<div className="customization-text-info w-full min-h-full flex items-center justify-center">
				<Sparkles size={600} style={{color: "#9B5EFF"}} className="absolute blur-lg opacity-50" />

				<div className="w-[500px] relative text-justify">
					<span className='h-[120px] flex items-center justify-center text-5xl text-white font-bold text-center gap-4 underline'>
						Customization <Sparkles size={60} style={{color: "#9B5EFF"}} className="pt-4" />
					</span>

					<span className='h-[180px] text-xl text-white'>
						Make NoteToGo truly yours with customizable themes, accent colors, transparency, and glass effects. Create a workspace that matches your style while staying clean, modern, and distraction-free.
						<br /><br />

						Try the interactive demo on the right - experiment with themes and appearance settings to instantly transform your notes in realtime.
					</span>

					<br /><br />

					<span className="text-sm text-neutral-400">
						Glass effect is a pro only feature.
					</span>
				</div>
			</div>
		</section>
	);
}