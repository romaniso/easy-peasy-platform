import { NavLink } from "react-router-dom";
import classNames from "classnames";

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
    <aside className="bg-stone-800 h-screen sticky top-0 overflow-y-auto flex flex-col items-center">
      {/*{renderedLinks}*/}
      <div className="py-4">
        <h1 className="font-bold text-white text-center text-lg">Your panel</h1>
      </div>
    </aside>
  );
}

export default Sidebar;
