import { useState } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from './Dropdown';
import Button from "./Button";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeToggler from "./ThemeToggler";
import LogoImage from '../assets/images/logo.png';

export interface SubmenuItem {
    label: string;
    path: string;
}
interface NavbarItem {
    label: string;
    path?: string;
    isButton?: true;
    subPaths?: SubmenuItem[];
    primary?: true;
    secondary?: true;

}
function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const links: NavbarItem[] = [
        { label: "Home", path: "/" },
        {
            label: "Exercises",
            subPaths: [
                { label: "Grammar", path: "/grammar" },
                { label: "Reading", path: "/reading" },
                { label: "Vocabulary", path: "/vocabulary" },
                { label: "Listening", path: "/listening" },
            ],
        },
        {
            label: "Resources",
            subPaths: [
                { label: "Articles", path: "/articles" },
                { label: "Podcasts", path: "/podcast" },
                { label: "Books", path: "/books" },
                { label: "Exercises", path: "/exercises" },
            ],
        },
        { label: "Log in", path: "/auth", isButton: true, secondary: true },
        // { label: "Sign up", path: "/auth", button: true, primary: true },
    ];

    const renderedItems = links.map((link: NavbarItem) => {
        return (
            <li
                key={link.label}
                className={`${
                    link.isButton ? "my-4" : "my-7 border-b md:border-none"
                } md:ml-6 md:my-0 hover:text-orange-500 text-indigo-900 dark:text-indigo-200 font-semibold group`}
            >
                {link.path &&
                    <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                            isActive
                                ? "text-orange-500 flex justify-between items-center"
                                : "font-semibold md:inline-block flex justify-between items-center"
                        }
                    >
                        {link.isButton
                            ? (<Button
                                    primary={link.primary}
                                    secondary={link.secondary}
                                    outline
                                    rounded
                                    //@todo: restyle Button component so there will be only cosmetic styles
                                    className="py-1.5 px-4 text-sm w-full"
                                >
                                    {link.label}
                                </Button>
                            )
                            : link.label}
                    </NavLink>
                }
                {link.subPaths && <Dropdown label={link.label} content={link.subPaths}/>}
            </li>
        );
    });

    return (
        <header className="md:bg-transparent bg-indigo-50 dark:bg-stone-800 md:backdrop-blur-xl shadow-lg border-b-indigo-100 w-full fixed top-0 left-0 z-50">
            <nav className="min-h-16 flex justify-between items-center py-2 md:px-10 px-7">
                {/* LOGO */}
                <NavLink to="/">
                    <img src={LogoImage} alt="logo" className='w-32 hover:scale-105 transition-transform duration-500'/>
                </NavLink>
                {/* BURGER */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute right-8 top-3 cursor-pointer md:hidden text-3xl text-indigo-800 dark:text-indigo-200 hover:text-orange-500"
                >
                    {isOpen ? <HiX /> : <HiMenu />}
                </div>
                {/* MENU */}
                <ul
                    className={`dark:bg-stone-800 md:bg-transparent bg-indigo-50 md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 px-9 transition-all duration-500 ease-in shadow-md md:shadow-none ${
                        isOpen ? "top-12" : "top-[-490px]"
                    }`}
                >
                    {renderedItems}
                    <ThemeToggler className='ml-5'/>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;


// {link.hasSubmenu && (
//     <div
//         className={`md:absolute top-12 md:p-3 md:-ml-5 md:top-10 md:hidden group-hover:text-indigo-900 group-hover:dark:text-indigo-200 group-hover:md:block hover:md:block ${
//             isCollapsed ? "block" : "hidden"
//         }`}
//     >
//         <ul className="border bg-white dark:bg-stone-800 dark:border-gray-500 py-3 px-6 shadow-md rounded-md">
//             {link.subpaths?.map((subpath: SubmenuItem) => {
//                 return (
//                     <li
//                         key={subpath.label}
//                         className="text-sm md:my-4 my-6 ml-2 md:ml-0 border-b dark:border-gray-500 opacity-90"
//                     >
//                         <NavLink
//                             to={subpath.path}
//                             className="hover:text-orange-500"
//                         >
//                             {subpath.label}
//                         </NavLink>
//                     </li>
//                 );
//             })}
//         </ul>
//     </div>
// )}