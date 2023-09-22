//import { NavLink } from "react-router-dom";
//import classNames from "classnames";
//import {
//  RiDashboardFill,
//  RiMarkPenFill,
//  RiArrowDropRightLine,
//} from "react-icons/ri";

import { useState } from "react";

import {
  BsArrowLeftShort,
  BsBook,
  BsSearch,
  BsChevronDown,
} from "react-icons/bs";
import { MdDashboard } from "react-icons/md";

function Sidebar() {
  const [opennedSidebar, setOpennedSidebar] = useState(true);
  const [opennedSubmenu, setOpennedSubmenu] = useState(false);

  const menu = [
    {
      title: "Exercises",
      links: [
        { label: "Grammar", path: "exercises/grammar" },
        { label: "Reading", path: "exercises/reading" },
        { label: "Vocabulary", path: "exercises/vocabulary" },
        { label: "Listening", path: "exercises/listening" },
      ],
    },
    {
      title: "Example",
      link: "/example",
    },
    {
      title: "Resources",
      spacing: true,
      links: [
        { label: "Articles", path: "resources/articles" },
        { label: "Podcasts", path: "resources/podcasts" },
        { label: "Books", path: "resources/books" },
        { label: "Exercises", path: "resources/exercises" },
      ],
    },

    {
      title: "Tutoring",
      links: [
        { label: "Find a tutor", path: "tutors" },
        { label: "Order a class", path: "online-class" },
        { label: "How it works", path: "docs/classes" },
        { label: "Pricing", path: "docs/pricing" },
      ],
    },
    {
      title: "Student",
      links: [
        { label: "Dashboard", path: "dashboard" },
        { label: "Your progress", path: "progress" },
        { label: "Buy learning hours", path: "learning-hours" },
        { label: "FAQ", path: "docs/faq" },
      ],
    },
    {
      title: "Example",
      spacing: true,
      link: "/example",
    },
    {
      title: "Example",
      link: "/example",
    },
    {
      title: "Example",
      link: "/example",
    },
    {
      title: "Example",
      link: "/example",
    },
    {
      title: "Example",
      link: "/example",
    },
  ];

  //  const links = [
  //    { label: "Login", path: "/login" },
  //    { label: "Register", path: "/register" },
  //    { label: "Dropdown", path: "/dropdown" },
  //    { label: "Accordion", path: "/accordion" },
  //    { label: "Buttons", path: "/buttons" },
  //  ];
  //  const linkClasses = classNames("text-blue-500 mb-4");
  //  const renderedLinks = links.map(({ label, path }) => {
  //    return (
  //      <NavLink
  //        to={path}
  //        className={({ isActive }) =>
  //          isActive
  //            ? `font-bold border-l-4 border-blue-500 pl-2 ${linkClasses}`
  //            : linkClasses
  //        }
  //      >
  //        {label}
  //      </NavLink>
  //    );
  //  });
  return (
    // <aside className="bg-stone-800 h-screen px-6">
    //   {/*{renderedLinks}*/}
    //   <div className="px-4 py-7 flex items-center justify-center border-b border-indigo-500/40">
    //     <h1 className="font-bold text-indigo-200 leading-6 text-xl cursor-pointer">
    //       Your panel
    //     </h1>
    //   </div>
    //   <div className="flex items-center gap-4 p-5 border-b border-indigo-500/40">
    //     <RiDashboardFill className="text-indigo-400 text-lg" />
    //     <p className="text-sm text-indigo-400 leading-5 font-bold">Dashboard</p>
    //   </div>
    //   <div>
    //     <p className="text-xs font-extrabold leading-4 text-indigo-200">
    //       INTERFACE
    //     </p>
    //     <div className="flex items-center justify-between gap-3 cursor-pointer">
    //       <div className="flex items-center gap-2">
    //         <RiMarkPenFill className="text-indigo-400 text-lg" />
    //         <p className="text-sm text-indigo-400 leading-5 font-bold">
    //           Exercises
    //         </p>
    //       </div>
    //       <RiArrowDropRightLine className="text-indigo-400 text-lg" />
    //     </div>
    //   </div>
    //  </aside>

    <aside
      className={`bg-stone-800 h-screen p-5 pt-8 ${
        opennedSidebar ? "w-72" : "w-20"
      } relative duration-300`}
    >
      <BsArrowLeftShort
        className={`bg-indigo-100 text-stone-800 text-3xl rounded-full absolute -right-3 top-9 border border-indigo-200 cursor-pointer ${
          !opennedSidebar && "rotate-180"
        }`}
        onClick={() => setOpennedSidebar(!opennedSidebar)}
      />
      <div className="inline-flex">
        <BsBook
          className={`bg-indigo-100 text-4xl rounded p-1 cursor-pointer block float-left mr-2 duration-1000 ${
            opennedSidebar && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-indigo-100 origin-left font-medium text-2xl duration-300 ${
            !opennedSidebar && "scale-0"
          }`}
        >
          Easy-Peasy
        </h1>
      </div>

      <div
        className={`flex tems-center rounded-md bg-indigo-900 mt-6 px-4 ${
          !opennedSidebar ? "px-2.5" : "px-4"
        } p-2`}
      >
        <BsSearch
          className={`text-indigo-100 text-lg block float-left cursor-pointer ${
            opennedSidebar && "mr-2"
          }`}
        />
        <input
          type={"search"}
          className={`text-base bg-transparent w-full text-white focus:outline-none ${
            !opennedSidebar && "hidden"
          }`}
        />
      </div>

      <ul className="pt-2">
        {menu.map((item, index) => (
          <>
            <li
              key={index}
              className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-indigo-900 rounded-md mt-2 duration-300 ${
                item.spacing ? "mt-9" : "mt-2"
              }`}
            >
              <span className="text-2xl block float-left">
                {item.icon ? item.icon : <MdDashboard />}
              </span>
              <span
                className={`text-base font-medium flex-1 ${
                  !opennedSidebar && "hidden"
                }`}
              >
                {item.title}
              </span>
              {item.links && opennedSidebar && (
                <BsChevronDown
                  className={`${opennedSubmenu && "rotate-180"}`}
                  onClick={() => setOpennedSubmenu(!opennedSubmenu)}
                />
              )}
            </li>
            {item.links && opennedSubmenu && opennedSidebar && (
              <ul>
                {item.links.map((item, index) => (
                  <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-indigo-900 rounded-md mt-2 duration-300">
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
