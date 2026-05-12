import { Check, Minimize, X } from "lucide-react";
import { RiMenu2Line } from "react-icons/ri";

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

        <div className='w-[160px] h-[35px] absolute right-0 flex justify-end items-center space-x-3 pr-2 bg-white'>
          <svg viewBox="0 0 50 35" width="100%" height="100%" preserveAspectRatio="none">
            <path
              d="M0,0 L31,0 C3,0 31,35 0,35"
              fill="#D9D9D9"
            />
          </svg>

          <div className='bg-green-400 group rounded-full min-w-[18px] min-h-[18px] flex items-center justify-center hover:scale-110 transition-[scale]'>
            <Check
              className="hidden group-hover:block transition-[display] relative text-[green] mx-[4px]"
              size={14}
            /> 
          </div>

          <div className='bg-[#FFBF48] group rounded-full min-w-[18px] min-h-[18px] flex items-center justify-center hover:scale-110 transition-[scale]'>
            <Minimize
              className="hidden group-hover:block transition-[display] relative text-[rgb(158,124,0)]"
              size={14}
            />
          </div>

          <div className='bg-[#FF4848] group rounded-full min-w-[18px] min-h-[18px] flex items-center justify-center hover:scale-110 transition-[scale] relative text-[darkred]'>
            <X
              className="hidden group-hover:block"
              size={14}
            />
          </div>
        </div>
      </div>
    </div>
  );
}