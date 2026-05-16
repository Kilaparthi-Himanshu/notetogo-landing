'use client';

import { Sparkles } from 'lucide-react';
import NoteOptions from "./NoteOptions";
import { useState } from "react";
import { Note } from "./Note";

export default function Customization() {
	const [theme, setTheme] = useState('light');

	return (
		<section className='notes-container min-h-[100vh] max-md:min-h-max bg-neutral-900 max-md:flex-col p-2 py-14 flex items-center justify-center'>
			<div className="w-full h-full relative ml-20">
				<div className="note-1">
					<Note width={550} height={400} menuOpen={true} theme={theme} className="">
						<NoteOptions theme={theme} setTheme={setTheme} />

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

			<div className="w-full min-h-full flex items-center justify-center sync-info">
				<Sparkles size={600} style={{color: "#9B5EFF"}} className="absolute blur-lg opacity-50" />

				<div className="w-[500px] relative text-justify">
					<span className='h-[120px] flex items-center justify-center text-5xl text-white font-bold text-center gap-4 underline'>
						Realtime Sync <Sparkles size={60} style={{color: "#9B5EFF"}} className="pt-4" />
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