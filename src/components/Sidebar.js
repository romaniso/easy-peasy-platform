import Dropdown from "./Dropdown";
import { useState, useRef } from "react";

import {
  BsArrowLeftShort,
  BsBook,
  BsSearch,
  BsChevronDown,
  BsListTask,
  BsBoxArrowRight,
  BsReverseLayoutTextWindowReverse,
  BsCollectionPlay,
  BsCalendar3,
  BsGear,
  BsPersonFill,
  BsEnvelopeFill,
} from "react-icons/bs";
import { MdDashboard } from "react-icons/md";

function Sidebar() {
  const [isSidebarOpenned, setIsSidebarOpenned] = useState(true);
  const [isSubmenuOpenned, setIsSubmenuOpenned] = useState(false);

  const liEl = useRef();

  const menu = [
    {
      title: "Dashboard",
      icon: <BsReverseLayoutTextWindowReverse />,
      path: "/dashboard",
    },
    {
      title: "Exercises",
      icon: <BsListTask />,
      links: [
        { label: "Grammar", path: "exercises/grammar" },
        { label: "Reading", path: "exercises/reading" },
        { label: "Vocabulary", path: "exercises/vocabulary" },
        { label: "Listening", path: "exercises/listening" },
      ],
      spacing: true,
    },
    {
      title: "Resources",
      icon: <BsCollectionPlay />,
      links: [
        { label: "Articles", path: "resources/articles" },
        { label: "Podcasts", path: "resources/podcasts" },
        { label: "Books", path: "resources/books" },
        { label: "Videos", path: "resources/videos" },
      ],
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
      link: "/settings",
    },
    {
      title: "Log out",
      icon: <BsBoxArrowRight />,
      link: "/",
    },
  ];
  const renderedMenu = menu.map((item, index) => (
    <>
      <li
        ref={liEl}
        key={index}
        onClick={() => setIsSubmenuOpenned(!isSubmenuOpenned)}
        className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-indigo-900 rounded-md mt-2 duration-300 ${
          item.spacing ? "mt-9" : "mt-2"
        }`}
      >
        <span className="text-2xl block float-left">
          {item.icon ? item.icon : <MdDashboard />}
        </span>
        <span
          className={`text-base font-medium flex-1 ${
            !isSidebarOpenned && "hidden"
          }`}
        >
          {item.title}
        </span>
        {item.links && isSidebarOpenned && (
          <BsChevronDown className={`${isSubmenuOpenned && "rotate-180"}`} />
        )}
      </li>
      {item.links && isSubmenuOpenned && isSidebarOpenned && (
        <ul>
          {item.links.map((item, index) => (
            <li
              key={index}
              className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-indigo-900 rounded-md mt-2 duration-300"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </>
  ));

  return (
    <aside
      className={`bg-stone-800 h-screen p-5 pt-8 ${
        isSidebarOpenned ? "w-72" : "w-20"
      } relative duration-300`}
    >
      <BsArrowLeftShort
        className={`bg-indigo-100 text-stone-800 text-3xl rounded-full absolute -right-3 top-9 border border-indigo-200 cursor-pointer ${
          !isSidebarOpenned && "rotate-180"
        }`}
        onClick={() => setIsSidebarOpenned(!isSidebarOpenned)}
      />
      <div className="inline-flex">
        <BsBook
          className={`bg-indigo-100 text-4xl rounded p-1 cursor-pointer block float-left mr-2 duration-1000 ${
            isSidebarOpenned && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-indigo-100 origin-left font-medium text-2xl duration-300 ${
            !isSidebarOpenned && "scale-0"
          }`}
        >
          Easy-Peasy
        </h1>
      </div>

      <div
        className={`flex tems-center rounded-md bg-indigo-900 mt-6 px-4 ${
          !isSidebarOpenned ? "px-2.5" : "px-4"
        } p-2`}
      >
        <BsSearch
          className={`text-indigo-100 text-lg block float-left cursor-pointer ${
            isSidebarOpenned && "mr-2"
          }`}
        />
        <input
          type={"search"}
          className={`text-base bg-transparent w-full text-white focus:outline-none ${
            !isSidebarOpenned && "hidden"
          }`}
        />
      </div>
      <ul className="pt-2">{renderedMenu}</ul>
    </aside>
  );
}

export default Sidebar;
