import React, {ReactElement} from "react";
import Dropdown from "./Dropdown";
import {CiLogout, CiSettings, CiUser} from "react-icons/ci";
import {useNavigate} from "react-router-dom";
import useLogout from "../hooks/useLogout";
import MiniAvatar from "./MiniAvatar";
import {useToast} from "../context/ToastContext";
import {ToastType} from "../enums/toast";


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
    dropdown?: true;
}
const ProfilePreview: React.FC<DropdownAvatarProps>  = ({username, userAvatar, dropdown}) => {
    const navigate = useNavigate();
    const logout = useLogout();
    const toast = useToast();

    const handleLogout = async () => {
        await logout();
        navigate('/')
        toast?.open('You has been logged out', ToastType.Success);
    }
    return (
        <div className='flex items-center gap-1 ml-4 border rounded-full border-indigo-300 shadow pr-2 cursor-pointer hover:bg-white/40 dark:hover:bg-black/40 transition-colors duration-200 dark:text-indigo-200 text-indigo-900 font-semibold'>
            <MiniAvatar userAvatar={userAvatar}/>
            {dropdown
                ? <Dropdown avatar label={username} content={[
                { icon: <CiUser className='text-xl'/>, label: "Profile", path: "/profile" },
                { icon: <CiSettings className='text-xl'/>, label: "Settings", path: "/settings" },
                { icon: <CiLogout className='text-xl'/>, label: "Log out", eventHandler: handleLogout, isLogoutBtn: true },]}
                />
                : <span className='px-1'>{username}</span>
            }

        </div>
    )
}

export default ProfilePreview;