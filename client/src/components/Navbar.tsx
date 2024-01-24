import {ReactElement, useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import Dropdown from './Dropdown';
import Button from "./Button";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";
import LogoImage from '../assets/images/small-logo.png';
import useAuth from "../hooks/useAuth";
import DropdownAvatar from "./DropdownAvatar";

export interface SubmenuItem {
    label: string;
    path: string;
    icon?: ReactElement;
}

interface NavbarItem {
    label: string;
    path?: string;
    subPaths?: SubmenuItem[];
}

function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const { auth } = useAuth();

    useEffect(() => {
        console.log('Auth changed: ', auth);
        if(auth?.user) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }

    }, [JSON.stringify(auth)]);

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
    ];

    const renderedItems = links.map((link: NavbarItem) => (
        <li
            key={link.label}
            className="my-7 border-b md:border-none md:ml-6 md:my-0 hover:text-orange-500 text-indigo-900 dark:text-indigo-200 font-semibold group"
        >
            {link.path && (
                <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                        isActive
                            ? "text-orange-500 flex justify-between items-center"
                            : "font-semibold md:inline-block flex justify-between items-center"
                    }
                >
                    {link.label}
                </NavLink>
            )}
            {link.subPaths && <Dropdown label={link.label} content={link.subPaths} />}
        </li>
    ));

    return (
        <header className="md:bg-transparent bg-indigo-50 dark:bg-stone-800 md:backdrop-blur-xl shadow-lg border-b-indigo-100 w-full fixed top-0 left-0 z-50">
            <nav className="min-h-16 flex justify-between items-center py-2 md:px-10 px-7">
                {/* LOGO */}
                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <NavLink to="/" className='flex items-center group'>
                        <img src={LogoImage} alt="logo" className='w-8 group-hover:scale-110 transition-transform duration-500'/>
                        <span className='text-lg font-semibold dark:text-indigo-300 text-indigo-800 group-hover:drop-shadow-purpleGlow transition-all duration-500'>EASY&nbsp;-&nbsp;PEASY</span>
                    </NavLink>
                    <p className='text-indigo-800/70 dark:text-orange-500/80 text-sm invisible absolute md:visible md:static selection:bg-orange-500'>#1 English learning platform</p>
                    <ThemeToggle />
                </div>

                {/* BURGER */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute right-8 top-3 cursor-pointer md:hidden text-3xl text-indigo-800 dark:text-indigo-200 hover:text-orange-500"
                >
                    {isOpen ? <HiX /> : <HiMenu />}
                </div>
                {/* MENU */}
                <ul
                    className={`dark:bg-stone-800 md:bg-transparent bg-indigo-50 md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 md:pr-0 px-9 shadow-md md:shadow-none ${
                        isOpen ? "top-12" : "top-[-490px]"
                    }`}
                >
                    {renderedItems}

                    {
                        isLogged
                            ? <DropdownAvatar username={auth.user as string} />
                            : <Link to='/auth' className="ml-4">
                                <Button
                                    secondary
                                    outline
                                    rounded
                                    className="py-1.5 px-4 text-sm w-full !rounded-full whitespace-nowrap"
                                >
                                    Log in
                                </Button>
                            </Link>
                    }
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
