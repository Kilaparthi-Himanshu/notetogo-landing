'use client';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LightNote } from "./LightNote";
import { CgToolbarBottom } from "react-icons/cg";
import { DarkNote } from "./DarkNote";
import TipTapEditorDemo from "./RichEditorDemo/TipTapEditorDemo";


gsap.registerPlugin(ScrollTrigger);

export default function RichTextShowcase() {
	useGSAP(() => {
		gsap.timeline({
			scrollTrigger: {
				trigger: ".rich-note-container",
				start: 'top center-=40',
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

		gsap.timeline({
			scrollTrigger: {
				trigger: ".rich-note-container",
				start: 'top center-=40',
        end: 'top top',
				// scrub: true,
				markers: false,
				toggleActions: 'play none none reverse',
			}
		}).from(".rich-text-info", {
			opacity: 0,
			y: 200,
			duration: 1
		});
	});

	return (
		<section className='rich-note-container min-h-[100vh] max-md:min-h-max bg-neutral-900 max-md:flex-col p-2 py-14 flex items-center justify-center'>
			<div className="w-full min-h-full flex items-center justify-center rich-text-info">
				<CgToolbarBottom size={600} style={{color: "#c45533"}} className="absolute blur-lg opacity-50" />

				<div className="w-[500px] relative text-justify">
					<span className='h-[120px] flex items-center justify-center text-5xl text-white font-bold text-center gap-4 underline relative'>
						Rich Text Editing <CgToolbarBottom size={60} style={{color: "#c45533"}} className="pt-4" />

						<span className="absolute top-0 left-0 px-3 py-1 text-sm rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 font-medium">
							PRO
						</span>
					</span>

					<span className='h-[180px] text-xl text-white'>
						Create more than plain notes with powerful rich text editing. Format text, organize ideas, highlight important sections, and customize your notes with an intuitive editor designed to stay fast and distraction-free.

						<br /><br />

						Try the demo on the right - experiment with formatting tools like bold text, colors, lists, alignment, and more to see how effortlessly NoteToGo adapts to your workflow.
					</span>

					<br /><br />

					<span className="text-sm text-neutral-400">
						Pro only feature.
					</span>
				</div>
			</div>

			<div className="w-full h-full relative ml-20 flex items-center justify-center">
				<div className="rich-note">
					<DarkNote width={530} height={450} className="">
						<div 
							className="absolute top-[35px] w-full h-[calc(100%-35px)] text-black text-wrap break-words text-lg"
						>
							<TipTapEditorDemo />
						</div>
					</DarkNote>
				</div>
			</div>
		</section>
	);
}