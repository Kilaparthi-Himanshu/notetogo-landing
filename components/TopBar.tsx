'use client';

import { navAtom } from "@/app/atoms";
import { useAtom } from "jotai";

function TopBar() {
	const [nav, setNav] = useAtom(navAtom);

	return (
		<div className="fixed left-1/2 -translate-x-1/2 z-9999 top-3 w-[600px] h-[50px] bg-white shadow-[0px_0px_6px_hsla(0,0%,0%,0.2)] rounded-4xl corner-squircle flex p-2 gap-2">
			<button 
				className={`bg-neutral-100 rounded-4xl corner-squircle w-[100px] text-center text-black text-md cursor-pointer transition-all ${nav === "home" && "bg-neutral-300"}`}
				onClick={() => setNav("home")}
			>
				Home
			</button>

			<button 
				className={`bg-neutral-100 rounded-4xl corner-squircle w-[100px] text-center text-black text-md cursor-pointer transition-all ${nav === "features" && "bg-neutral-300"}`}
				onClick={() => setNav("features")}
			>
				Features
			</button>

			<button 
				className={`bg-neutral-100 rounded-4xl corner-squircle w-[100px] text-center text-black text-md cursor-pointer transition-all ${nav === "pricing" && "bg-neutral-300"}`}
				onClick={() => setNav("pricing")}
			>
				Pricing
			</button>

			<img src="icon.png" alt="NoteToGo" className="ml-auto" />
		</div>
	);
}

export default TopBar;