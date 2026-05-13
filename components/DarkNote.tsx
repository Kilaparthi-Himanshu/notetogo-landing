import { Check, Minimize, X } from "lucide-react";
import { RiMenu2Line } from "react-icons/ri";
import TrafficLights from "./TrafficLights";

export const DarkNote = ({ 
  width=710,
  height=480,
  menuOpen=false,
  children 
}: { 
  width?: number;
  height?: number;
  menuOpen?: boolean;
  children?: React.ReactNode 
}) => {
  return (
    <div 
      className='bg-[#262626] rounded-[15px] flex overflow-clip shadow-[0px_0px_6px_hsla(0,0%,0%,0.527)] relative' 
      id='dark-note'
      style={{
        width: width,
        height: height
      }}
    >
      {children}

      <div className='w-full h-[35px] bg-[#454545] relative'>
        <div className='absolute left-[6px] top-[5px] size-[24px] z-10'>
          <RiMenu2Line className={`w-full h-full ${menuOpen ? 'text-red-500' : 'text-white'}`} />
        </div>

        <div className='absolute left-[60px] top-[2px] text-[20px] text-white'>
          <span>NoteToGo</span>
        </div>

        <TrafficLights bgColor="bg-[#262626]" fill="#454545" />
      </div>
    </div>
  );
}