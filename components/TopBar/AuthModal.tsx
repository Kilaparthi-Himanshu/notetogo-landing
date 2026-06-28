'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from '../misc/SmoothScroll';
import { X } from 'lucide-react';
import TrafficLights from '../TrafficLights';
import { supabase } from '@/lib/supabase/client';
import { useAtomValue } from 'jotai';
import { userAtom, userDetailsAtom } from '@/lib/atoms';
import ModalRenderer from '../misc/ModalRenderer';
import AccountInfo from './AccountInfo';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function AuthModal({
	onClose
}: {
	onClose: () => void;
}) {
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				(document.activeElement as HTMLElement)?.blur();
				onClose();
			}
		}

		window.addEventListener("keydown", handleKey);

		return () => {
			window.removeEventListener("keydown", handleKey);
		}
	}, []);

	const user = useAtomValue(userAtom);
	const userDetails = useAtomValue(userDetailsAtom);
	const [actionType, setActionType] = useState<'signup' | 'signin'>('signup');

	const signUp = async (formData: FormData) => {
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirmPassword") as string;

		if (!email || !password || !confirmPassword) {
			alert("All Fields Must Be Filled!");
			return;
		}

		if (password != confirmPassword) {
			alert("The Passwords Must Match!");
			return;
		}

		const { data, error } = await supabase
			.auth
			.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${window.location.origin}/auth/confirm`,
					// process.env.NODE_ENV === 'development'
					// 	? 'http://localhost:3000/auth/confirm'
					// 	: 'https://notetogo.vercel.app/auth/confirm',
				}
			});

		if (!data || error) {
			console.error(error);
			alert("Error Signing up!");
			return;
		}

		alert("Confirmation Mail Has Been Sent To The Provided Email!, Open The Mail From This Device Only!");
	}

	const signIn = async (formData: FormData) => {
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const { data, error } = await supabase
			.auth
			.signInWithPassword({
				email,
				password
			});

		if (!data.user || error) {
			alert("Unable to signin, please make sure the credentials are correct or the account exists");
			return;
		}

		alert("Signed In Successfully!");
	}

	const signInWithGoogle = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback?next=/?modal=account`
			}
		});

		if (error) {
			console.error(error);
			alert("Google sign in failed");
		}
	}

	const signInWithGithub = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`
			}
		});

		if (error) {
			console.error(error);
			alert("GitHub sign in failed");
		}
	}

	const signOut = async () => {
		const { error } = await supabase
			.auth
			.signOut();

		if (error) {
			alert(`Error Signing Out, Please Try Again!, ${error.message}`);
			return;
		}
	}

	const inputClasses = "w-full rounded-3xl corner-squircle h-[45px] text-black text-xl px-2 outline-none border-2 border-transparent focus:border-purple-400 bg-linear-to-br from-white to-neutral-500 transition-all bg-origin-border";

	return (
		<motion.div 
			className='fixed inset-0 bg-black/40 flex items-center justify-center p-8 max-sm:p-3 z-99999'
			onWheel={(e) => e.stopPropagation()}
			initial={{
				opacity: 0
			}}
			animate={{
				opacity: 1
			}}
			exit={{
				opacity: 0
			}}
			transition={{
				duration: 0.2,
			}}
			onClick={(e) => {
				e.preventDefault();
				onClose();
			}}
			data-lenis-prevent
		>
			<motion.div
				className='w-full h-full rounded-4xl corner-squircle bg-neutral-900 relative flex items-center justify-center px-2 max-w-[1200px]'
				onClick={(e) => e.stopPropagation()}
			>
				{/* <button 
					className='absolute top-2 right-2 size-[40px] cursor-pointer bg-red-500 hover:bg-red-800 active:scale-95 transition-all rounded-4xl corner-squircle flex items-center justify-center'
					onClick={() => {
						setIsOpen(false);
					}}
				>
					<X className='text-white' />
				</button> */}

				<div className='absolute top-2 right-2'>
					<TrafficLights bgColor='transparent' fill='transparent' onClickClose={onClose} />
				</div>

				{!userDetails ? (<motion.form
					// layout
					className='w-[400px] h-max rounded-4xl corner-squircle p-4 flex flex-col items-center justify-center gap-10 text-white'
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						if (actionType === 'signin') {
							signIn(formData);
						} else {
							signUp(formData);
						}
					}}
				>
					{/* <span className='text-4xl font-semibold'>{actionType === 'signin' ? 'Sign In' : 'Sign Up'}</span> */}
					{!user &&  <span className='w-max text-4xl max-sm:text-3xl font-semibold'>Welcome to NoteToGo</span>}
						<>
							{/* <div className='flex flex-col items-center justify-center w-full gap-6'>
								<div className="w-full h-max flex flex-col gap-3">
									<span className="text-2xl">Email</span>

									<input className={inputClasses} name="email" />
								</div>

								<div className="w-full h-max flex flex-col gap-3">
									<span className="text-2xl">Password</span>

									<input className={inputClasses} type="password" name="password" />
								</div>

								<AnimatePresence initial={false}>
									{actionType === 'signup' && (
										<motion.div
											layout
											initial={{
												opacity: 0,
												height: 0,
												y: -10
											}}
											animate={{
												opacity: 1,
												height: "auto",
												y: 0
											}}
											exit={{
												opacity: 0,
												height: 0,
												y: -10
											}}
											transition={{
												duration: 0.3,
											}}
											className="w-full overflow-hidden"
										>
											<div className="w-full h-max flex flex-col gap-3">
												<span className="text-2xl">
													Confirm Password
												</span>

												<input
													className={inputClasses}
													type="password"
													name="confirmPassword"
												/>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							<div className="w-full flex justify-between items-center h-max mt-4">
								<button className="border px-10 py-2 text-xl rounded-3xl bg-violet-700 active:scale-95 transition-all text-white corner-squircle cursor-pointer" type="submit">
										Submit
								</button>

								<div className="h-full flex items-center">
									{actionType === 'signup' ? (
										<div className="flex flex-col items-center justify-center text-lg text-center">
											<span className="text-[13px]">
													Already have an account?
											</span>

											<button className="underline cursor-pointer" type="button" onClick={() => setActionType('signin')}>
													Sign In
											</button>
										</div>
									) : (
										<div className="flex flex-col items-center justify-center text-lg text-center">
											<span className="text-[13px]">
													Don't have an account?
											</span>

											<button className="underline cursor-pointer" type="button" onClick={() => setActionType('signup')}>
													Sign Up
											</button>
										</div>
									)}
								</div>
							</div> */}

							<button 
								className="cursor-pointer w-full max-sm:w-max rounded-xl h-[60px] text-violet-300 text-xl px-2 outline-none border-2 border-transparent hover:border-2 hover:border-purple-400 bg-neutral-800 transition-all duration-[100ms] active:scale-95 flex items-center justify-center gap-4"
								type="button"
								onClick={signInWithGoogle}
							>
								<div className="w-8 flex justify-center">
									<img 
										src='/google_logo.png'
										alt="Google logo"
										className="w-7 h-7" 
									/>
								</div>

									<span>Continue with Google</span>
							</button>

							{/* <button 
								className="cursor-pointer w-full rounded-xl h-[60px] text-violet-300 text-xl px-2 outline-none border-2 border-transparent hover:border-2 hover:border-purple-400 bg-neutral-800 transition-all duration-[100ms] active:scale-95 flex items-center justify-center gap-4"
								type="button"
								onClick={signInWithGithub}
							>
								<div className="w-8 flex justify-center">
									<img 
										src='/github_logo.png'
										alt="GitHub logo"
										className="w-8 h-8" 
									/>
								</div>

									<span>Continue with GitHub</span>
							</button> */}
						</>
				</motion.form>
				) : (
					<AccountInfo userDetails={userDetails} signOut={signOut} />
				)}
			</motion.div>
		</motion.div>
	);
}

export function AuthModalRenderer() {
	const router = useRouter();
	const pathname = usePathname();

	const searchParams = useSearchParams();
	const authModalOpen = searchParams.get("modal") === "account";
	const lenis = useLenis();

	// Delay rendering until after the component mounts.
	// This component depends on client-only state (useSearchParams, Supabase auth,
	// browser URL) which can differ between the server render and the initial
	// client render, leading to hydration mismatches.
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (authModalOpen) {
			lenis?.stop();
			document.body.style.overflow = "hidden";
		} else {
			lenis?.start();
			document.body.style.overflow = "";
		}

		return () => {
			lenis?.start();
			document.body.style.overflow = "";
		};
	}, [authModalOpen, lenis]);

	if (!mounted) return null;

	return (
		<ModalRenderer isOpen={authModalOpen}>
			<AuthModal onClose={() => {console.log(pathname); console.log(window.location.href); router.replace(pathname, { scroll: false })}} />
		</ModalRenderer>
	);
}
