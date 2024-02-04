import React from "react";
import useUser from "../hooks/useUser";

const MiniAvatar: React.FC = () => {
    const {user} = useUser();
    return (
        <div className='-top-1.5 md:top-0 mr-2 md:mr-0 flex-shrink-0 bg-indigo-200 dark:bg-transparent rounded-full w-10 h-10 relative after:[content: ""] after:absolute after:bottom-1 after:right-0 after:w-2.5 after:h-2.5 after:bg-green-500 after:rounded-full'>
            {/*Check if there is an avatar*/}
            <img src={user.avatar || 'https://avatar.iran.liara.run/public/boy'} alt="avatar" className='object-cover rounded-full w-10 h-10'/>
        </div>
    )
}
export default MiniAvatar;