'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import ModalRenderer from '../misc/ModalRenderer';
import AuthModal from './AuthModal';

export default function AccountSettings() {
	const [authModalOpen, setAuthModalOpen] = useState(false);

	return (
		<>
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
				<button 
					className="w-full h-[50px] flex items-center justify-center cursor-pointer hover:bg-neutral-300 transition-all rounded-2xl corner-squircle"
				>
					Account Settings
				</button>

				<button 
					className="w-full h-[50px] flex items-center justify-center cursor-pointer hover:bg-neutral-300 transition-all rounded-2xl corner-squircle"
					onClick={() => {
						setAuthModalOpen(true)
					}}
				>
					Sign Out
				</button>
			</motion.div>

			<ModalRenderer isOpen={authModalOpen}>
				<AuthModal setIsOpen={setAuthModalOpen} />
			</ModalRenderer>
		</>
	);
}
