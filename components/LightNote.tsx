import { Check, Minimize, X } from "lucide-react";
import { RiMenu2Line } from "react-icons/ri";
import TrafficLights from "./TrafficLights";

export const LightNote = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='w-[710px] h-[480px] bg-white rounded-[15px] flex overflow-clip shadow-[0px_0px_6px_hsla(0,0%,0%,0.527)] relative' id='light-note'>
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