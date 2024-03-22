import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "./common/Dropdown";
import Button from "./common/Button";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";

import useAuth from "../hooks/useAuth";
import ProfilePreview from "./ProfilePreview";
import { useTranslation } from "react-i18next";
import { Logo } from "./common/Logo";

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
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const { auth } = useAuth();

  const navbarRef = useRef<HTMLElement>(null);
  const { t } = useTranslation("common");

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // console.log('outside click')
      if (!navbarRef.current) return;
      if (!navbarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick, true);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (auth?.user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [JSON.stringify(auth)]);

  const links: NavbarItem[] = [
    { label: t("navbar.home.text"), path: "/" },
    {
      label: t("navbar.exercises.text"),
      subPaths: [
        { label: t("navbar.exercises.links.grammar"), path: "/grammar" },
        { label: t("navbar.exercises.links.reading"), path: "/reading" },
        { label: t("navbar.exercises.links.vocabulary"), path: "/vocabulary" },
        { label: t("navbar.exercises.links.listening"), path: "/listening" },
      ],
    },
    {
      label: t("navbar.resources.text"),
      subPaths: [
        { label: t("navbar.resources.links.articles"), path: "/articles" },
        { label: t("navbar.resources.links.podcasts"), path: "/podcast" },
        // { label: "Books", path: "/books" },
        // { label: "Exercises", path: "/exercises" },
      ],
    },
  ];

  const renderedItems = links.map((link: NavbarItem) => (
    <li
      key={link.label}
      className="my-7 border-b border-indigo-200 md:border-none md:ml-6 md:my-0 hover:text-orange-500 text-indigo-800 dark:text-indigo-200 font-semibold group py-2 md:py-0"
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
    <header
      className="md:bg-transparent bg-indigo-50 dark:bg-stone-800 md:backdrop-blur-xl shadow-md border-b-indigo-100 w-full fixed top-0 left-0 z-50"
      ref={navbarRef}
    >
      <nav className="min-h-16 flex justify-between items-center py-2 md:px-10 px-7">
        {/* LOGO */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <NavLink to="/">
            <Logo />
          </NavLink>
          <p className="text-indigo-800/70 dark:text-orange-500/80 text-sm invisible absolute lg:visible md:static selection:bg-orange-500">
            {t("navbar.moto")}
          </p>
          <ThemeToggle className="hidden md:inline-flex" icons />
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
          className={`dark:bg-stone-800 md:bg-transparent bg-indigo-50 md:flex md:items-center pb-2 md:pb-0 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 md:pr-0 px-9 shadow-md md:shadow-none ${
            isOpen ? "top-12" : "top-[-490px]"
          }`}
        >
          {renderedItems}

          {isLogged ? (
            <div className="flex justify-between items-start">
              <ProfilePreview dropdown />
              <ThemeToggle className="inline-flex md:hidden" />
            </div>
          ) : (
            <Link to="/auth" className="ml-4">
              <Button
                secondary
                outline
                rounded
                className="py-1.5 px-4 text-sm w-full !rounded-full whitespace-nowrap"
              >
                {t("navbar.cta.login")}
              </Button>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
