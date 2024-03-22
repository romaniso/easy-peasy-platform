import { Link, useNavigate, NavLink } from "react-router-dom";
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
  //  BsCalendar3,
  BsGear,
  BsBook,
  BsPersonFill,
  //  BsEnvelopeFill,
} from "react-icons/bs";
import LogoImage from "../assets/images/small-logo.png";
import ThemeToggle from "./ThemeToggle";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import MiniAvatar from "./MiniAvatar";
import { useToast } from "../context/ToastContext";
import { ToastType } from "../enums/toast";
import { useTranslation } from "react-i18next";

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
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const toast = useToast();
  const { t } = useTranslation("common");
  const signOut = async () => {
    await logout();
    navigate("/");
    toast?.open(t("sidebar.toastMessage.success"), ToastType.Success);
  };

  const menu: SidemenuItem[] = [
    {
      title: t("sidebar.dashboard.text"),
      icon: <BsReverseLayoutTextWindowReverse />,
      path: "/dashboard",
    },
    {
      title: t("sidebar.exercises.text"),
      icon: <BsListTask />,
      links: [
        { label: t("sidebar.exercises.links.grammar"), path: "/grammar" },
        { label: t("sidebar.exercises.links.reading"), path: "/reading" },
        { label: t("sidebar.exercises.links.vocabulary"), path: "/vocabulary" },
        { label: t("sidebar.exercises.links.listening"), path: "/listening" },
      ],
      spacing: true,
    },
    {
      title: t("sidebar.resources.text"),
      icon: <BsCollectionPlay />,
      links: [
        { label: t("sidebar.resources.links.articles"), path: "/articles" },
        { label: t("sidebar.resources.links.podcasts"), path: "/podcasts" },
      ],
    },
    {
      title: t("sidebar.vocabulary.text"),
      icon: <BsBook />,
      path: "/glossary",
    },

    // {
    //   title: t("sidebar.tutoring.text"),
    //   icon: <BsCalendar3 />,
    //   links: [
    //     { label: t("sidebar.tutoring.links.tutors"), path: "tutors" },
    //     {
    //       label: t("sidebar.tutoring.links.online-class"),
    //       path: "online-class",
    //     },
    //     // { label: "How it works", path: "docs/classes" },
    //     // { label: "Pricing", path: "docs/pricing" },
    //   ],
    // },
    // {
    //   title: t("sidebar.inbox.text"),
    //   icon: <BsEnvelopeFill />,
    //   path: "/inbox",
    // },
    {
      title: t("sidebar.profile.text"),
      icon: <BsPersonFill />,
      path: "/profile",
      spacing: true,
    },
    {
      title: t("sidebar.settings.text"),
      icon: <BsGear />,
      path: "/settings",
    },
    {
      title: t("sidebar.logout.text"),
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
          className={`group dark:text-indigo-300 text-indigo-900 text-sm cursor-pointer p-2 hover:bg-indigo-100 dark:hover:bg-stone-900 rounded-md mt-2 duration-300 ${
            item.spacing ? "mt-7" : "mt-1"
          }
                    ${item.links && "bg-indigo-50 dark:bg-stone-800"}
                    ${
                      item.title === "Log out" &&
                      "bg-red-200 dark:bg-red-500/30 hover:bg-red-300 dark:hover:bg-red-500/50"
                    }
                    `}
        >
          {/* TODO: fix active navlinks */}
          <NavLink
            to={item.path as string}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-x-2 group-hover:dark:text-indigo-100"
                : "flex items-center gap-x-2 group-hover:dark:text-indigo-100"
            }
          >
            <span className="text-xl dark:text-indigo-300 text-indigo-900 block float-left group-hover:dark:text-indigo-100">
              {item.icon}
            </span>
            <span
              className={`text-base font-medium flex-1 ${
                !isSidebarOpened && "hidden"
              }`}
            >
              {item.title}
            </span>
            {item.links && isSidebarOpened && (
              <BsChevronDown className={`${isExpanded && "rotate-180"}`} />
            )}
          </NavLink>
        </li>
        {item.links && isExpanded && isSidebarOpened && (
          <ul>
            {item.links.map((item, index) => (
              <li key={index}>
                <Link
                  className="dark:text-indigo-200 text-indigo-900 hover:text-white flex items-center gap-x-3 cursor-pointer py-1 px-5 hover:bg-indigo-400 rounded-md duration-300"
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
      className={`flex-shrink-1 bg-gradient h-min-screen pt-2 pb-1 flex flex-col justify-between ${
        isSidebarOpened
          ? "max-w-72 px-3 -mr-[185px] md:mr-0 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-indigo-100 dark:scrollbar-thumb-stone-800 scrollbar-track-white dark:scrollbar-track-stone-900"
          : " max-w-20 justify-around px-5"
      } relative duration-300 shadow z-50 transition-all`}
    >
      <BsArrowLeftShort
        className={`dark:bg-gradient-to-r dark:from-stone-800 dark:to-stone-900 bg-gradient-to-r from-indigo-50 to-white transition hover:brightness-110 text-indigo-900 dark:text-indigo-300 text-3xl absolute top-9 border border-indigo-300 rounded-lg cursor-pointer ${
          isSidebarOpened ? "right-3" : "rotate-180 -right-3"
        }`}
        onClick={() => setIsSidebarOpened(!isSidebarOpened)}
      />
      <div className="flex flex-col gap-3">
        <NavLink to="/">
          <div className="inline-flex items-center mb-3">
            <img
              src={LogoImage}
              alt="easy-peasy logo"
              className={`w-8 cursor-pointer block float-left mr-1 duration-1000 ${
                isSidebarOpened && "rotate-[360deg]"
              }`}
            />
            <span
              className={`font-mono dark:text-indigo-300 text-indigo-900 drop-shadow origin-left font-medium text-xl duration-300 ${
                !isSidebarOpened && "scale-0"
              }`}
            >
              EASY-PEASY
            </span>
          </div>
        </NavLink>

        <div className="flex gap-2 items-center">
          <MiniAvatar />
          {isSidebarOpened && (
            <div>
              <p className="text-sm dark:text-indigo-200 text-indigo-900 font-semibold">
                {t("sidebar.greeting", { user: auth.user })}
              </p>
              <small className="text-indigo-700 dark:text-indigo-300">
                {t("sidebar.salutation")}
              </small>
            </div>
          )}
        </div>
        <div className="flex w-full items-center rounded-md bg-transparent border dark:border-indigo-300 border-indigo-300 py-1.5 px-3">
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
      </div>
      <ul className="w-full">{renderedMenu}</ul>
      <div
        className={`mt-5 bg-indigo-50 dark:bg-stone-800 w-full flex justify-between px-2 py-1 rounded-md ${
          !isSidebarOpened && "hidden"
        }`}
      >
        <span className="text-base text-indigo-900 dark:text-indigo-300 font-semibold">
          {t("mode")}
        </span>
        <ThemeToggle icons />
      </div>
    </aside>
  );
};

export default Sidebar;
