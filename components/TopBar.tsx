'use client';

import { navAtom } from "@/app/atoms";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { RiArrowRightUpLongFill } from "react-icons/ri";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

function TopBar() {
	const [nav, setNav] = useAtom(navAtom);
	const [visible, setVisible] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const router = useRouter();

	const menuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target as Node)
			) {
				setMenuOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		}
	}, []);

	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// Ignore micro movements
			if (Math.abs(currentScrollY - lastScrollY.current) < 4) return;

			// scrolling down
			if (currentScrollY > lastScrollY.current) {
				setVisible(false);
				setMenuOpen(false);
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
					onClick={() => {
						document
							.getElementById("home")
							?.scrollIntoView({ behavior: "smooth" });

						setNav("home");
					}}
				>
					Home
				</button>

				<button 
					className={`bg-neutral-100 rounded-4xl corner-squircle px-2 min-w-max w-full text-center text-black text-md cursor-pointer transition-all ${nav === "features" && "bg-neutral-300"}`}
					onClick={() => {
						document
							.getElementById("features")
							?.scrollIntoView({ behavior: "smooth" });

						setNav("features");
					}}
				>
					Features
				</button>

				<button 
					className={`bg-neutral-100 rounded-4xl corner-squircle px-2 min-w-max w-full text-center text-black text-md cursor-pointer transition-all ${nav === "pricing" && "bg-neutral-300"}`}
					onClick={() => {
						document
							.getElementById("pricing")
							?.scrollIntoView({ behavior: "smooth" });

						setNav("pricing");
					}}
				>
					Pricing
				</button>

				<button 
					className={`bg-neutral-100 rounded-4xl corner-squircle px-2 min-w-max w-full text-center text-black text-md cursor-pointer transition-all ${nav === "contact" && "bg-neutral-300"}`}
					onClick={() => {
						document
							.getElementById("footer")
							?.scrollIntoView({ behavior: "smooth" });

						setNav("contact");
					}}
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

			<div ref={menuRef} className="absolute right-5 ">
				<button>
					<MdAccountCircle 
						className="size-12 text-neutral-500 bg-white rounded-4xl text-center cursor-pointer select-none" 
						onClick={() => setMenuOpen(!menuOpen)} 
						type="button"
					/>
				</button>

				<AnimatePresence>
					{menuOpen && 
						<motion.div 
							initial={{
								opacity: 0,
								y: -10,
								scale: 0.95
							}}
							animate={{
								opacity: 1,
								y: 0,
								scale: 1
							}}
							exit={{
								opacity: 0,
								y: -10,
								scale: 0.95
							}}
							transition={{
								duration: 0.2,
								ease: [0.22, 1, 0.36, 1]
							}}
							className="absolute right-10 top-14 w-[170px] h-max rounded-3xl corner-squircle shadow-lg overflow-hidden bg-white p-1 font-semibold flex flex-col items-center justify-center gap-1"
						>
							<button className="w-full h-[50px] flex items-center justify-center cursor-pointer hover:bg-neutral-300 transition-all rounded-2xl corner-squircle" onClick={() => router.push('/account-settings')}>
								Account Settings
							</button>

							<button className="w-full h-[50px] flex items-center justify-center cursor-pointer hover:bg-neutral-300 transition-all rounded-2xl corner-squircle" onClick={() => router.push('/auth')}>
								Sign Out
							</button>
						</motion.div>
					}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}

export default TopBar;
