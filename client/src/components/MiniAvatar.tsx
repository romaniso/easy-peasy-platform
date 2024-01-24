import React from "react";

const MiniAvatar: React.FC<{userAvatar?: string}> = ({userAvatar}) => {
    return (
        <div className='flex-shrink-0 bg-indigo-200 dark:bg-transparent rounded-full w-10 h-10 relative after:[content: ""] after:absolute after:bottom-1 after:right-0 after:w-2.5 after:h-2.5 after:bg-green-500 after:rounded-full'>
            {/*Check if there is an avatar*/}
            <img src={userAvatar || 'https://avatar.iran.liara.run/public/boy'} alt="avatar" className='object-cover rounded-full'/>
        </div>
    )
}
export default MiniAvatar;