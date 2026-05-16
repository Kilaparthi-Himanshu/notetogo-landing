// 'use client';
import { themeAtom } from "@/app/atoms";
import { useAtom } from "jotai";
import { Lock, Pin, Repeat } from "lucide-react";
import { IoMdCloudOutline } from "react-icons/io";

const NoteOptions = ({
	theme="light",
	setTheme
}: {
	theme?: string,
	setTheme?: (theme: string) => void,
}) => {
		return (
			<div className={`z-20 absolute top-[26px] left-[15px] w-[200px] h-max ${theme === "dark" ? "bg-[#262626]" : "bg-white"} rounded-[15px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] p-[10px] flex flex-col gap-[11px]`}>
					<div className={`dropdownCard ${theme}`}>
							<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
									Theme
							</div>

							<div>
									<div className="themeToggle">
											<button 
												onClick={() => setTheme && setTheme("light")} 
												// className={`themeButton ${theme === "light" && 'active'}`}
												className={`themeButton ${theme === 'light' && 'active'}`}
											>
													🌞
											</button>
											<button 
												onClick={() => setTheme && setTheme("dark")} 
												// className={`themeButton ${theme === "dark" && 'active'}`}
												className={`themeButton ${theme === 'dark' && 'active'}`}
											>
													🌙
											</button>
									</div>
							</div>
					</div>

					<div className={`dropdownCard ${theme}`}>
							<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
									Color
							</div>

							<div>
									<div>
											<input className="colorSelector" type="color" defaultValue="#262626"/>
									</div>
							</div>
					</div>

					<div className={`dropdownCard ${theme}`}>
							<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
									Pin
							</div>

							<div>
									<div title="Pin Note" className="pinsContainer">
											<Pin
													style={{
															marginTop: "3.3px",
															color: "#FFB02E"
													}}
													size={24}
											/>
									</div>
							</div>
					</div>

					<div className={`dropdownCard ${theme}`}>
							<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
									Persist
							</div>

							<div>
									<div title="Pin Note" className="pinsContainer">
											<Repeat
													style={{
															marginTop: "2px",
															color: "red"
													}}
													size={20}
											/>
									</div>
							</div>
					</div>

					{/* <div className={`dropdownCard ${theme}`}>
							<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
									Font
							</div>

							<div>
									<div title="Pin Note" className="pinsContainer">
											<ChevronUp
													style={{color: 
															"black"
													}}
											/>
									</div>
							</div>
					</div> */}

					<div className={`dropdownCard ${theme}`}>
							<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
									Password
							</div>

							<div>
									<div title="Password" className="pinsContainer">
											<Lock style={{color: "#00C2FF"}}/>
									</div>
							</div>
					</div>

					<div className={`dropdownCard ${theme}`}>
							<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
									Sync
							</div>

							<div>
									<div title="Sync Note" className="pinsContainer">
											<IoMdCloudOutline size={24} style={{color: "#32D74B"}}/>
									</div>
							</div>
					</div>
			</div>
    );
}

export default NoteOptions;
