import React, {ReactElement, useEffect, useRef, useState} from "react";
import {SubmenuItem} from "./Navbar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import {NavLink} from "react-router-dom";

interface Dropdown {
    label: string;
    content: SubmenuItem[];
}
const Dropdown: React.FC<Dropdown> = ({label, content}) => {
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
        <div ref={dropdownRef}>
            <div className="cursor-pointer flex justify-between items-center gap-2 relative" onClick={() => setIsCollapsed(!isCollapsed)}>
                <span>{label}</span>
                <span>{icon}</span>
            </div>
            {isCollapsed && (
                <div className='block md:absolute top-full w-full md:w-32 mt-4 md:-mt-2 md:-ml-3 dark:md:bg-stone-900/80 md:bg-white rounded-md md:shadow-md overflow-hidden'>
                    <ul>
                        {content.map((subItem) =>
                            <NavLink key={subItem.label} to={subItem.path}>
                                <li className='text-indigo-600 dark:text-indigo-300 md:px-4 py-3 md:py-2 border-indigo-50/20 border-b hover:bg-orange-100 dark:hover:bg-indigo-950 transition-colors duration-300'>{subItem.label}</li>
                            </NavLink>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Dropdown;