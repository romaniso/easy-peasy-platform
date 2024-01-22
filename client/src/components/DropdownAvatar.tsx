import React, {ReactElement} from "react";
import Dropdown from "./Dropdown";
import { CiSettings, CiLogout, CiUser } from "react-icons/ci";
import {useNavigate} from "react-router-dom";
import useLogout from "../hooks/useLogout";



export interface AvatarItem {
    icon?: ReactElement;
    label: string;
    path?: string;
    isLogoutBtn?: true;
    eventHandler?: () => void;
}
interface DropdownAvatarProps {
    username: string
    userAvatar?: string;
}
const DropdownAvatar: React.FC<DropdownAvatarProps>  = ({username, userAvatar}) => {
    const navigate = useNavigate();
    const logout = useLogout();

    const logOut = async () => {
        await logout();
        navigate('/')
    };
    return (
        <div className='flex items-center gap-1 ml-4 border rounded-full border-indigo-300 shadow pr-2 cursor-pointer hover:bg-white/40 dark:hover:bg-black/40 transition-colors duration-200 dark:text-indigo-200 text-indigo-900 font-semibold'>
            <div className='flex-shrink-0 bg-indigo-200 dark:bg-transparent rounded-full w-10 h-10 relative after:[content: ""] after:absolute after:bottom-1 after:right-0 after:w-2.5 after:h-2.5 after:bg-green-500 after:rounded-full'>
                {/*Check if there is an avatar*/}
                <img src={userAvatar || 'https://avatar.iran.liara.run/public/boy'} alt="avatar" className='object-cover rounded-full'/>
            </div>
            <Dropdown avatar label={username} content={[
                { icon: <CiUser className='text-xl'/>, label: "Profile", path: "/profile" },
                { icon: <CiSettings className='text-xl'/>, label: "Settings", path: "/settings" },
                { icon: <CiLogout className='text-xl'/>, label: "Log out", eventHandler: logOut, isLogoutBtn: true },
            ]}/>
        </div>
    )
}

export default DropdownAvatar;