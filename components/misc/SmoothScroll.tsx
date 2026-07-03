'use client';

import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';

export const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
	return useContext(LenisContext);
}

export default function SmoothScroll({
	children,
}: {
	children: React.ReactNode;
}) {
	const [lenis, setLenis] = useState<Lenis | null>(null);

	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			smoothWheel: true,
		});

		setLenis(lenis);

		const params = new URLSearchParams(window.location.search);
		const target = params.get("scroll");

		if (target) {
			requestAnimationFrame(() => {
				const el = document.getElementById(target);

				if (el) {
					lenis.scrollTo(el, {
						immediate: true,
					});
				}
			});
  }

		let rafId: number;

		const raf = (time: number) => {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		};

		rafId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	}, []);

	return (
		<LenisContext.Provider value={lenis}>
			{children}
		</LenisContext.Provider>
	);
}
