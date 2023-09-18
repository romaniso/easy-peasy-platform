import { NavLink } from "react-router-dom";
import classNames from "classnames";
import {
  RiDashboardFill,
  RiMarkPenFill,
  RiArrowDropRightLine,
} from "react-icons/ri";

function Sidebar() {
  const links = [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
    { label: "Dropdown", path: "/dropdown" },
    { label: "Accordion", path: "/accordion" },
    { label: "Buttons", path: "/buttons" },
  ];
  const linkClasses = classNames("text-blue-500 mb-4");
  const renderedLinks = links.map(({ label, path }) => {
    return (
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? `font-bold border-l-4 border-blue-500 pl-2 ${linkClasses}`
            : linkClasses
        }
      >
        {label}
      </NavLink>
    );
  });
  return (
    <aside className="bg-stone-800 h-screen px-6">
      {/*{renderedLinks}*/}
      <div className="px-4 py-7 flex items-center justify-center border-b border-indigo-500/40">
        <h1 className="font-bold text-indigo-200 leading-6 text-xl cursor-pointer">
          Your panel
        </h1>
      </div>
      <div className="flex items-center gap-4 p-5 border-b border-indigo-500/40">
        <RiDashboardFill className="text-indigo-400 text-lg" />
        <p className="text-sm text-indigo-400 leading-5 font-bold">Dashboard</p>
      </div>
      <div>
        <p className="text-xs font-extrabold leading-4 text-indigo-200">
          INTERFACE
        </p>
        <div className="flex items-center justify-between gap-3 cursor-pointer">
          <div className="flex items-center gap-2">
            <RiMarkPenFill className="text-indigo-400 text-lg" />
            <p className="text-sm text-indigo-400 leading-5 font-bold">
              Exercises
            </p>
          </div>
          <RiArrowDropRightLine className="text-indigo-400 text-lg" />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
