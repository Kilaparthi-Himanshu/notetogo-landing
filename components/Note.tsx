import { Check, Minimize, X } from "lucide-react";
import { RiMenu2Line } from "react-icons/ri";
import TrafficLights from "./TrafficLights";
import { hexToRgba } from "@/app/utils/colorFormatChange";

type NoteType = {
	id?: string,
	width?: number,
	height?: number,
	menuOpen?: boolean,
	className?: string
	children?: React.ReactNode,
	theme?: string,
	customColor?: string,
	glassEffect?: boolean
}

export const Note = ({ 
	id = "note",
	width = 710,
  height = 480, 
	menuOpen = false,
	className,
	children,
	theme = "light",
	customColor,
	glassEffect,
}: NoteType) => {
	const glassBackgroundStyle = glassEffect ? {
			backgroundColor: hexToRgba(customColor!, 0.35),
			backdropFilter: 'blur(16px) saturate(180%)', // frosted + vibrant 
			WebkitBackdropFilter: 'blur(16px) saturate(180%)', // Safari support 
			boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // soft shadow glow
    } : {
			backgroundColor: customColor ? customColor : theme === "light" ? "white" : "#262626",
    }

    const glassEffectBorderStyle = glassEffect && {
			border: '1px solid rgba(255, 255, 255, 0.25)',
			borderBottomLeftRadius: '16px',
			borderBottomRightRadius: '16px',
			borderTop: '0px'
    }

  return (
    <div 
			className={`rounded-[15px] flex overflow-clip shadow-[0px_0px_6px_hsla(0,0%,0%,0.527)] relative ${className}`}
			id={id} 
			style={{
				width: width,
				height: height,
				...glassBackgroundStyle,
				...glassEffectBorderStyle,
			}}
		>
      {children}

      <div className={`w-full h-[35px] ${theme === "light" ? 'bg-[#D9D9D9]' : 'bg-[#454545]'} relative`}>
        <div className='absolute left-[6px] top-[5px] size-[24px]'>
          <RiMenu2Line className={`w-full h-full ${menuOpen ? 'text-red-500' : theme === "light" ? 'text-black' : 'text-white'}`} />
        </div>

        <div className={`${theme === "light" ? "text-black" : "text-white"} absolute left-[60px] top-[2px] text-[20px]`}>
          <span>NoteToGo</span>
        </div>

        <TrafficLights bgColor={glassEffect ? theme === "light" ? "#D9D9D9" : "#454545" : customColor ? customColor : theme === "light" ? "white" : "#262626"} fill={`${theme === "light" ? "#D9D9D9" : "#454545"}`} />
      </div>
    </div>
  );
}
