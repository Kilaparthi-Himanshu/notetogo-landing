'use client';

import { navAtom } from "@/app/atoms";
import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { RiArrowRightUpLongFill } from "react-icons/ri";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";

function TopBar() {
	const [nav, setNav] = useAtom(navAtom);
	const [visible, setVisible] = useState(true);

	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// Ignore micro movements
			if (Math.abs(currentScrollY - lastScrollY.current) < 4) return;

			// scrolling down
			if (currentScrollY > lastScrollY.current) {
				setVisible(false);
			}
			// scrolling up
			else {
				setVisible(true);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<motion.div 
			className="fixed left-0 z-9999 top-3 w-full h-max flex items-center justify-center gap-2"
			initial={{ y: 0, opacity: 1 }}
			animate={{
				y: visible ? 0 : -100,
				opacity: visible ? 1 : 0
			}}
			transition={{
				duration: 0.5,
				ease: [0.22, 1, 0.36, 1]
			}}
		>
			<div className="w-[600px] h-[50px] bg-white shadow-[0px_0px_6px_hsla(0,0%,0%,0.2)] rounded-4xl corner-squircle flex p-2 gap-2">	
				<button 
					className={`bg-neutral-100 rounded-4xl corner-squircle px-2 min-w-max w-full text-center text-black text-md cursor-pointer transition-all ${nav === "home" && "bg-neutral-300"}`}
					onClick={() => setNav("home")}
				>
					Home
				</button>

				<button 
					className={`bg-neutral-100 rounded-4xl corner-squircle px-2 min-w-max w-full text-center text-black text-md cursor-pointer transition-all ${nav === "features" && "bg-neutral-300"}`}
					onClick={() => setNav("features")}
				>
					Features
				</button>

				<button 
					className={`bg-neutral-100 rounded-4xl corner-squircle px-2 min-w-max w-full text-center text-black text-md cursor-pointer transition-all ${nav === "pricing" && "bg-neutral-300"}`}
					onClick={() => setNav("pricing")}
				>
					Pricing
				</button>

				<button 
					className={`bg-neutral-100 rounded-4xl corner-squircle px-2 min-w-max w-full text-center text-black text-md cursor-pointer transition-all ${nav === "contact" && "bg-neutral-300"}`}
					onClick={() => setNav("contact")}
				>
					Contact
				</button>

				<Link 
					className={`bg-neutral-100 rounded-4xl corner-squircle px-2 min-w-max w-full text-center text-black text-md cursor-pointer transition-all flex items-center justify-center gap-2`}
					href={"https://chromewebstore.google.com/detail/notetogo-save-notes-passw/aacbmfpcgjlmefmhhbafimdaefpifkjk"}
					target="_blank"
				>
					Add to chrome <RiArrowRightUpLongFill />
				</Link>
			</div>

			<MdAccountCircle className="absolute right-5 size-12 text-neutral-500 text-center cursor-pointer" />
		</motion.div>
	);
}

export default TopBar;