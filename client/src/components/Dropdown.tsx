import React, {ReactElement, useEffect, useRef, useState} from "react";
import {SubmenuItem} from "./Navbar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import {NavLink} from "react-router-dom";
import {AvatarItem} from "./ProfilePreview";

interface Dropdown {
    label: string;
    content: SubmenuItem[] | AvatarItem[];
    avatar?: true;
    block?: true;
}
const Dropdown: React.FC<Dropdown> = ({label, content, avatar, block}) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if(!dropdownRef.current) return;
            if(!dropdownRef.current.contains(event.target as Node)){
                setIsCollapsed(false);
            }
        }
        document.addEventListener('click', handleOutsideClick, true)

        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    const icon: ReactElement = isCollapsed ? (
        <FaChevronUp className="text-lg relative top-0.5" />
    ) : (
        <FaChevronDown className="text-lg relative top-0.5" />
    );
    return (
        <div ref={dropdownRef} className='relative'>
            <div className={
                `cursor-pointer flex justify-between items-center 
                ${block && 'p-2'} 
                gap-2 relative 
                ${avatar && 'w-[25vw] md:w-auto gap-0.5'}
                `}
                 onClick={() => setIsCollapsed(!isCollapsed)
            }>
                <span>{label}</span>
                <span>{icon}</span>
            </div>
            {isCollapsed && (
                <div className={`
                    block md:absolute top-full 
                    ${block ? 'md:w-full p-2' : 'md:w-32 md:-ml-3'} 
                    mt-2.5 dark:md:bg-stone-900/80 md:bg-white rounded-md md:shadow-md overflow-hidden 
                    ${avatar && '-ml-14 md:!-ml-10'}`
                }>
                    <ul>
                        {content.map((subItem) =>
                            (subItem as AvatarItem).eventHandler
                                ? (
                                    <li className={`
                                        text-indigo-600 dark:text-indigo-300 md:px-4 py-3 md:py-2 border-indigo-50/20 border-b hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors duration-300 flex items-center gap-1 
                                        ${(subItem as AvatarItem).isLogoutBtn && 'text-red-700 md:bg-red-500/20 hover:bg-red-500/40'}
                                        `}
                                        onClick={(subItem as AvatarItem).eventHandler}
                                        key={subItem.label}
                                    >
                                        {subItem.icon}{subItem.label}
                                    </li>
                                )
                            : (
                                <NavLink key={subItem.label} to={(subItem as SubmenuItem).path} onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <li className={`
                                        text-indigo-600 dark:text-indigo-300 md:px-4 py-3 md:py-2 border-indigo-50/20 border-b hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors duration-300 flex items-center gap-1 
                                        ${(subItem as AvatarItem).isLogoutBtn && 'bg-red-500/20 hover:bg-red-500/40'} 
                                        ${block && 'flex justify-between flex-row-reverse'}`
                                    }>
                                        {subItem.icon}{subItem.label}
                                    </li>
                                </NavLink>
                            )
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Dropdown;