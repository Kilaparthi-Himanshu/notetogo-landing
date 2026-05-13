import { Check, Minimize, X } from "lucide-react";
import { RiMenu2Line } from "react-icons/ri";
import TrafficLights from "./TrafficLights";

export const LightNote = ({ 
	width=710,
  height=480, 
	children 
}: { 
		width?: number,
		height?: number,
		children?: React.ReactNode 
	}) => {
  return (
    <div 
			className='bg-white rounded-[15px] flex overflow-clip shadow-[0px_0px_6px_hsla(0,0%,0%,0.527)] relative' id='light-note' 
			style={{
				width: width,
				height: height
			}}
		>
      {children}

      <div className='w-full h-[35px] bg-[#D9D9D9] relative'>
        <div className='absolute left-[6px] top-[5px] size-[24px]'>
          <RiMenu2Line className='w-full h-full' />
        </div>

        <div className='absolute left-[60px] top-[2px] text-[20px]'>
          <span>NoteToGo</span>
        </div>

        <TrafficLights bgColor="bg-white" fill="#D9D9D9" />
      </div>
    </div>
  );
}