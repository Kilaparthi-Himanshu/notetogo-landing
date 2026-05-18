// 'use client';
import { themeAtom } from "@/app/atoms";
import { useAtom } from "jotai";
import { Lock, Pin, Repeat, Sparkles } from "lucide-react";
import { PiExport } from "react-icons/pi";
import { IoMdCloudOutline } from "react-icons/io";

type NoteOptionsType = {
	theme?: string,
	setTheme?: (theme: string) => void, 
	handleThemeChange?: (newTheme: string) => void,
	customColor?: string,
	setCustomColor?: (color: string) => void,
	glassEffect?: boolean;
	setGlassEffect?: (glass: boolean) => void;
	disabledOptions?: string[],
}

const NoteOptions = ({
	theme = "light",
	setTheme,
	handleThemeChange,
	customColor,
	setCustomColor,
	glassEffect = true,
	setGlassEffect,
	disabledOptions = [],
}: NoteOptionsType) => {
	const isDisabled = (name: string) => {
		return disabledOptions.includes(name);
	}

	return (
		<div className={`z-20 absolute top-[26px] left-[15px] w-[200px] h-max ${theme === "dark" ? "bg-[#262626]" : "bg-white"} rounded-[15px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] p-[10px] flex flex-col gap-[11px]`}>
				<div className={`dropdownCard ${theme} ${isDisabled("Theme") && "blur-sm pointer-events-none"}`}>
						<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
								Theme
						</div>

						<div>
								<div className="themeToggle">
										<button 
											onClick={() => handleThemeChange && handleThemeChange("light")} 
											// className={`themeButton ${theme === "light" && 'active'}`}
											className={`themeButton ${theme === 'light' && 'active'}`}
										>
												🌞
										</button>
										<button 
											onClick={() => handleThemeChange && handleThemeChange("dark")} 
											// className={`themeButton ${theme === "dark" && 'active'}`}
											className={`themeButton ${theme === 'dark' && 'active'}`}
										>
												🌙
										</button>
								</div>
						</div>
				</div>

				<div className={`dropdownCard ${theme} ${isDisabled("Color") && "blur-sm pointer-events-none"}`}>
						<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
								Color
						</div>

						<div>
								<div>
										<input className="colorSelector" type="color" value={customColor} onChange={(e) => setCustomColor && setCustomColor(e.target.value)}/>
								</div>
						</div>
				</div>

				<div className={`dropdownCard ${theme} ${isDisabled("Pin") && "blur-sm pointer-events-none"}`}>
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

				<div className={`dropdownCard ${theme} ${isDisabled("Persist") && "blur-sm pointer-events-none"}`}>
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

				<div className={`dropdownCard ${theme} ${isDisabled("Password") && "blur-sm pointer-events-none"}`}>
						<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
								Password
						</div>

						<div>
								<div title="Password" className="pinsContainer">
										<Lock style={{color: "#00C2FF"}}/>
								</div>
						</div>
				</div>

				<div className={`dropdownCard ${theme} ${isDisabled("Glass") && "blur-sm pointer-events-none"}`} onClick={() => setGlassEffect && setGlassEffect(!glassEffect)}>
						<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
								Glass
						</div>

						<div>
								<div title="Glass" className="pinsContainer">
										<Sparkles style={{color: glassEffect ? "#9B5EFF" : theme === "light" ? "black" : "white"}}/>
								</div>
						</div>
				</div>

				<div className={`dropdownCard ${theme} ${isDisabled("Sync") && "blur-sm pointer-events-none"}`}>
						<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
								Sync
						</div>

						<div>
								<div title="Sync Note" className="pinsContainer">
										<IoMdCloudOutline size={24} style={{color: "#32D74B"}}/>
								</div>
						</div>
				</div>

				<div className={`dropdownCard ${theme} ${isDisabled("Export") && "blur-sm pointer-events-none"}`}>
						<div className={`${theme === "light" ? "text-black" : "text-white"}`}>
								Export
						</div>

						<div>
								<div title="Export" className="pinsContainer">
										<PiExport size={26} style={{color: theme === "light" ? "black" : "white"}}/>
								</div>
						</div>
				</div>
		</div>
	);
}

export default NoteOptions;
