import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
//TODO: Handle single collapse issue (maybe by using a separate Dropdown component), consider how to change content (NavLink, or state)

import {
    BsArrowLeftShort,
    BsSearch,
    BsChevronDown,
    BsListTask,
    BsBoxArrowRight,
    BsReverseLayoutTextWindowReverse,
    BsCollectionPlay,
    BsCalendar3,
    BsGear,
    BsBook,
    BsPersonFill,
    BsEnvelopeFill,
} from "react-icons/bs";
import LogoImage from "../assets/images/small-logo.png";
import ThemeToggle from "./ThemeToggle";
import useLogout from "../hooks/useLogout";

type SidemenuSubitem = {
    label: string;
    path: string;
};
interface SidemenuItem {
    title: string;
    icon: React.ReactElement;
    path?: string;
    links?: SidemenuSubitem[];
    spacing?: true;
    event?(): void;
}

const Sidebar: React.FC = () => {
    const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(true);
    const [expandedSubmenuItem, setExpandedSubmenuItem] = useState<number | null>(
        null
    );
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate("/");
    };

    const menu: SidemenuItem[] = [
        {
            title: "Dashboard",
            icon: <BsReverseLayoutTextWindowReverse />,
            path: "/dashboard",
        },
        {
            title: "Exercises",
            icon: <BsListTask />,
            links: [
                { label: "Grammar", path: "/grammar" },
                { label: "Reading", path: "/reading" },
                { label: "Vocabulary", path: "/vocabulary" },
                { label: "Listening", path: "/listening" },
            ],
            spacing: true,
        },
        {
            title: "Resources",
            icon: <BsCollectionPlay />,
            links: [
                { label: "Articles", path: "/articles" },
                { label: "Podcasts", path: "/podcasts" },
            ],
        },
        {
            title: "Your Vocabulary",
            icon: <BsBook />,
        },

        {
            title: "Tutoring",
            icon: <BsCalendar3 />,
            links: [
                { label: "Find a tutor", path: "tutors" },
                { label: "Order a class", path: "online-class" },
                { label: "How it works", path: "docs/classes" },
                { label: "Pricing", path: "docs/pricing" },
            ],
        },
        {
            title: "Inbox",
            icon: <BsEnvelopeFill />,
            path: "/inbox",
        },
        {
            title: "Profile",
            icon: <BsPersonFill />,
            path: "/profile",
            spacing: true,
        },
        {
            title: "Settings",
            icon: <BsGear />,
            path: "/settings",
        },
        {
            title: "Log out",
            icon: <BsBoxArrowRight />,
            path: "/",
            event: signOut,
        },
    ];

    const handleExpand = (index: number): void => {
        if (index === expandedSubmenuItem) setExpandedSubmenuItem(null);
        else {
            setExpandedSubmenuItem(index);
        }
    };
    const renderedMenu = menu.map((item, index) => {
        const isExpanded = expandedSubmenuItem === index;
        return (
            <React.Fragment key={index}>
                <li
                    key={index}
                    onClick={item.event || (() => handleExpand(index))}
                    className={`group dark:text-indigo-300 text-indigo-900 text-sm cursor-pointer p-2 hover:bg-orange-500 hover:text-white dark:hover:text-white rounded-md mt-2 duration-300 ${
                        item.spacing ? "mt-9" : "mt-2"
                    }`}
                >
                    <Link to={item.path as string} className='flex items-center gap-x-4'>
                        <span className="text-2xl group-hover:text-white dark:text-indigo-300 text-indigo-900 block float-left">
                            {item.icon}
                        </span>
                        <span className={`text-base font-medium flex-1 ${!isSidebarOpened && "hidden"}`}>
                            {item.title}
                        </span>
                        {item.links && isSidebarOpened && (<BsChevronDown className={`${isExpanded && "rotate-180"}`}/>)}
                    </Link>
                </li>
                {item.links && isExpanded && isSidebarOpened && (
                    <ul>
                        {item.links.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className="dark:text-indigo-200 text-indigo-900 hover:text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-indigo-900 rounded-md mt-2 duration-300"
                                    to={item.path}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </React.Fragment>
        );
    });

    return (
        <aside
            className={`dark:bg-gradient-to-r dark:from-stone-800 dark:to-stone-900 bg-indigo-100 h-screen p-5 pt-8 ${
                isSidebarOpened ? "w-72" : "w-20"
            } relative duration-300 flex flex-col items-start shadow`}
        >
            <BsArrowLeftShort
                className={`bg-indigo-100 text-stone-800 text-3xl rounded-full absolute -right-3 top-9 border border-indigo-200 cursor-pointer ${
                    !isSidebarOpened && "rotate-180"
                }`}
                onClick={() => setIsSidebarOpened(!isSidebarOpened)}
            />
            <div className="inline-flex items-center">
                <img
                    src={LogoImage}
                    alt="easy-peasy logo"
                    className={`w-10 cursor-pointer block float-left mr-1 duration-1000 ${
                        isSidebarOpened && "rotate-[360deg]"
                    }`}
                />
                <span
                    className={`font-mono dark:text-indigo-300 text-indigo-900 drop-shadow origin-left font-medium text-2xl duration-300 ${
                        !isSidebarOpened && "scale-0"
                    }`}
                >
          EASY-PEASY
        </span>
            </div>
            <div
                className={`flex w-full items-center rounded-md bg-transparent border dark:border-indigo-300 border-indigo-400 mt-6 px-4 p-2 ${
                    !isSidebarOpened ? "!px-3" : "px-4"
                }`}
            >
                <BsSearch
                    className={`dark:text-indigo-300 text-indigo-800 text-lg block float-left cursor-pointer ${
                        isSidebarOpened && "mr-2"
                    }`}
                />
                <input
                    type={"search"}
                    className={`text-base bg-transparent w-full text-indigo-900 dark:text-white focus:outline-none ${
                        !isSidebarOpened && "hidden"
                    }`}
                />
            </div>
            <ul className="pt-2 w-full">{renderedMenu}</ul>
            <span className={`mt-10 ml-2 ${!isSidebarOpened && "hidden"}`}>
        <ThemeToggle />
      </span>
        </aside>
    );
};

export default Sidebar;
