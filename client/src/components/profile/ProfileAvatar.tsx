import ToolTip from "../ToolTip";
import {SlPicture} from "react-icons/sl";
import React from "react";
const ProfileAvatar: React.FC = () => {
    return (
        <div className='w-[250px] h-[250px] overflow-hidden rounded-full flex-shrink-0 relative shadow-md border border-indigo-200 dark:border-indigo-800 group'>
            <img src="https://avatar.iran.liara.run/public/boy" alt="" className='w-full h-full object-cover group-hover:brightness-50 transition-all duration-300'/>
            <button className='absolute bottom-0 inset-x-0 h-1/4 bg-black/50 flex justify-center items-center group-hover:h-[80px] transition-all duration-300 group-hover:bg-black/70'>
                <ToolTip tooltip='Upload your photo'>
                    <SlPicture className='text-2xl text-indigo-200'/>
                </ToolTip>
            </button>
        </div>
    )
}

export default ProfileAvatar;