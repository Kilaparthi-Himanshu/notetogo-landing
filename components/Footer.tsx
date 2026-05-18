'use client';

import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
	return (
		<footer id='footer' className="w-full bg-neutral-950 border-t border-neutral-800 px-6 py-14">
			<div className="max-w-[1400px] mx-auto flex max-md:flex-col justify-between gap-16">

				{/* Left */}
				<div className="flex flex-col gap-5 max-w-[420px]">
					<span className="text-4xl font-bold text-white flex gap-3 items-center">
						NoteToGo <img src='/icon.png' className='size-8' />
					</span>

					<span className="text-neutral-400 text-lg leading-relaxed">
						A lightweight, distraction-free note-taking extension
						built for quick thoughts, ideas, research, and creativity
						without leaving your workflow.
					</span>

					<div className="flex items-center gap-4 pt-2">

						<a
							href="https://github.com/Kilaparthi-Himanshu/notes-extension-plasmo" target='_blank'
							className="size-11 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-all cursor-pointer"
						>
							<Github size={20} />
						</a>

						<a
							href="#"
							className="size-11 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-all cursor-pointer"
						>
							<FaXTwitter size={20} />
						</a>

						<a
							href="#"
							className="size-11 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-all cursor-pointer"
						>
							<Mail size={20} />
						</a>

					</div>
				</div>

				{/* Right */}
				<div className="flex max-sm:flex-col gap-20">

					<div className="flex flex-col gap-5">
						<span className="text-white text-xl font-semibold">
							Product
						</span>

						<div className="flex flex-col gap-3 text-neutral-400 text-lg">
							<button 
								className="hover:text-white transition-colors cursor-pointer text-start"
								onClick={() => {
									document
										.getElementById("features")
										?.scrollIntoView({ behavior: "smooth" });
								}}
							>
								Features
							</button>

							<button 
								className="hover:text-white transition-colors cursor-pointer text-start"
								onClick={() => {
									document
										.getElementById("pricing")
										?.scrollIntoView({ behavior: "smooth" });
								}}
							>
								Pricing
							</button>

							<a href="https://chromewebstore.google.com/detail/notetogo-save-notes-passw/aacbmfpcgjlmefmhhbafimdaefpifkjk" target='_blank' className="hover:text-white transition-colors cursor-pointer">
								Download
							</a>

							<a href="#" className="hover:text-white transition-colors cursor-pointer">
								Changelog
							</a>
						</div>
					</div>

					<div className="flex flex-col gap-5">
						<span className="text-white text-xl font-semibold">
							Resources
						</span>

						<div className="flex flex-col gap-3 text-neutral-400 text-lg">
							<a href="https://github.com/Kilaparthi-Himanshu/notes-extension-plasmo" target='_blank' className="hover:text-white transition-colors cursor-pointer">
								GitHub
							</a>

							<a href="#" className="hover:text-white transition-colors cursor-pointer">
								Support
							</a>

							<a href="#" className="hover:text-white transition-colors cursor-pointer">
								Privacy Policy
							</a>

							<a href="#" className="hover:text-white transition-colors cursor-pointer">
								Terms of Service
							</a>
						</div>
					</div>

				</div>
			</div>

			{/* Bottom */}
			<div className="max-w-[1400px] mx-auto pt-12 mt-12 border-t border-neutral-800 flex max-md:flex-col items-center justify-between gap-4">

				<span className="text-neutral-500 text-base">
					© 2026 NoteToGo. All rights reserved.
				</span>

				<span className="text-neutral-600 text-sm">
					Built with focus, simplicity, and late-night ideas.
				</span>

			</div>
		</footer>
	)
}