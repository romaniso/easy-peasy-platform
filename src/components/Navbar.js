import { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { HiMenu, HiX } from "react-icons/hi";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import ThemeToggler from "./ThemeToggler";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const icon = isCollapsed ? (
    <CiCircleChevUp className="text-2xl" />
  ) : (
    <CiCircleChevDown className="text-2xl" />
  );

  const links = [
    { label: "Home", path: "/" },
    {
      label: "Exercises",
      path: "/exercises",
      submenu: true,
      subpaths: [
        { label: "Grammar", path: "/exercises/grammar" },
        { label: "Reading", path: "/exercises/reading" },
        { label: "Vocabulary", path: "/exercises/vocabulary" },
        { label: "Listening", path: "/exercises/listening" },
      ],
    },
    {
      label: "Resources",
      path: "/resources",
      submenu: true,
      subpaths: [
        { label: "Articles", path: "/exercises/articles" },
        { label: "Podcasts", path: "/exercises/podcast" },
        { label: "Books", path: "/exercises/books" },
        { label: "Exercises", path: "/exercises/exercises" },
      ],
    },
    { label: "Log in", path: "/auth", button: true, secondary: true },
    // { label: "Sign up", path: "/auth", button: true, primary: true },
  ];

  const renderedItems = links.map((link) => {
    return (
      <li
        key={link.label}
        className={`${
          link.button ? "my-4" : "my-7 border-b md:border-none"
        } md:ml-6 md:my-0 hover:text-orange-500 text-indigo-900 dark:text-indigo-200 font-semibold group`}
      >
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            isActive
              ? "text-orange-500 flex justify-between items-center"
              : "font-semibold md:inline-block flex justify-between items-center"
          }
        >
          {link.button ? (
            <Button
              primary={link.primary}
              secondary={link.secondary}
              outline
              rounded
              //@todo: restyle Button component so there will be only cosmetic styles
              className="py-1.5 px-4 text-sm w-full dark:text-indigo-200 text-indigo-900 border-indigo-900 dark:border-indigo-200"
            >
              {link.label}
            </Button>
          ) : (
            link.label
          )}
          {link.submenu && (
            <div
              className="p-2 cursor-pointer md:hidden"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {icon}
            </div>
          )}
        </NavLink>
        {link.submenu && (
          <div
            className={`md:absolute top-12 md:hidden group-hover:text-indigo-900 group-hover:dark:text-indigo-200 group-hover:md:block hover:md:block ${
              isCollapsed ? "block" : "hidden"
            }`}
          >
            <ul className="border bg-white dark:bg-[#323232] dark:border-gray-500 py-3 px-6 shadow-md rounded-md">
              {link.subpaths.map((subpath) => {
                return (
                  <li
                    key={subpath.label}
                    className="text-sm md:my-4 my-6 ml-2 md:ml-0 border-b dark:border-gray-500 opacity-90"
                  >
                    <NavLink
                      to={subpath.path}
                      className="hover:text-orange-500"
                    >
                      {subpath.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </li>
    );
  });

  return (
    <header className="md:bg-transparent bg-indigo-50 dark:bg-stone-800 md:backdrop-blur-xl shadow-lg border-b-indigo-100 w-full fixed top-0 left-0 z-50">
      <nav className="md:flex justify-between items-center py-2 md:px-10 px-7">
        {/* LOGO */}
        <NavLink to="/">
          <div className="w-24 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 101 55"
            >
              <path
                stroke="#1E1E1E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.942 13.098c0 4.582-.14 9.169-.14 13.755v7.065c0 1.837-.423 3.633-.423 5.486M13.66 39.404c2.761.884 5.98 1.013 8.504 2.595 1.73 1.085 3.861 1.768 5.767 2.517.909.356 1.948.372 2.892.625 1.114.299 2.169.77 3.306 1 2.126.432 4.117 1.13 6.19 1.782.838.264 1.537.817 2.376 1.11.937.327 1.814.837 2.758 1.125 1.318.403 2.552.932 3.783 1.548.343.171 1.42.636 1.563.922M52.628 53.472c1.646-.588 2.995-1.646 4.455-2.563.866-.545 1.823-.889 2.735-1.345.562-.28 1.083-.739 1.672-.953 1.632-.593 3.376-.983 4.94-1.75 1.207-.593 2.348-1.348 3.65-1.743 1.663-.506 3.094-1.12 4.642-1.93 1.361-.714 2.733-1.381 4.22-1.806.883-.253 1.774-.326 2.65-.641.67-.241 1.308-.596 2.032-.625 1.154-.047 2.315-.149 3.47-.149M86.53 7.049v16.068c0 2.156-.044 4.316 0 6.471.03 1.37.282 2.705.282 4.096 0 .886-.12 1.863.032 2.735.094.542.25 1.022.25 1.579M13.802 10.003c2.793 2.095 6.086 3.374 9.425 4.22 1.217.31 2.448.472 3.657.774.797.2 1.797.144 2.532.493.752.356 1.442.632 2.26.836.953.238 1.892.557 2.844.774 1.14.258 2.366.29 3.478.64 1.27.4 2.729.139 3.939.634 1.469.6 2.875 1.24 4.33 1.867.796.344 1.478.996 2.266 1.282.281.102.45.183.578.438M51.221 22.101c.828-.236 1.625-.672 2.47-.922.88-.26 1.75-.559 2.626-.828.95-.293 1.799-.804 2.774-1.047.735-.184 1.466-.35 2.196-.548 1.425-.385 2.745-1.104 4.142-1.578.977-.332 1.75-.86 2.642-1.337 1.421-.76 3.043-1.134 4.548-1.68 1.597-.579 3.092-1.54 4.627-2.266 1.566-.74 2.886-1.326 4.556-1.751.988-.251 2.102-.506 2.978-1.063.415-.264 1.227-.542 1.47-.907"
              ></path>
              <path
                stroke="#1E1E1E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.505 10.285c.58 0 1.202-.275 1.438-.876.283-.721.523-1.954 1.016-.687.552 1.418 3.057 1.422 4.298 1.422.87 0 1.68-.26 2.564-.281 1.047-.025 2.17-.178 3.212-.352 2.128-.355 4.794-.815 6.87-.008.678.264 1.44.495 2.133.711.824.258 1.666 1.106 2.524 1.196.95.1 1.72 1.37 2.595 1.688.303.11.57.412.86.57.444.243.989.636 1.407.946a29.967 29.967 0 014.001 3.548c.293.31.42.913.813 1.095.31.143.707.617.852.93.268.58.53 1.04.727 1.633M50.096 22.101c.269-1.045.75-2.05 1.196-3.032.442-.973.67-1.99 1.188-2.938.166-.305.455-.487.703-.72.55-.514.972-1.2 1.493-1.75.698-.738 1.479-1.132 2.313-1.688 3.276-2.185 7.641-2.11 11.434-2.11 1.532 0 3.051-.282 4.603-.282 1.677 0 3.467-.418 5.056-.914a15.968 15.968 0 004.26-2.04c.452-.301.949-.246 1.414-.492.461-.244.68-.397.774.289.088.638.03 1.185.313 1.75M49.111 23.79c0 1.45-.103 2.884.25 4.298.221.884.316 1.765.532 2.657.51 2.112.343 4.321.343 6.487 0 2.345.141 4.696.141 7.026 0 1.25.33 3.114-.14 4.29M52.628 24.07c0 2.118.703 4.227.703 6.347v11.668c0 1.276.247 2.526.282 3.79.026.956.562 1.717.562 2.673M15.63 17.6c0 4.202.738 8.366.977 12.559.007.125-.09.845.07.914.54.231 1.453.01 2.032.04.74.036 1.352.372 1.954.773.183.122.36.39.032.063M16.334 25.478c.53.106 2.148 1.06 2.391 1.547"
              ></path>
              <path
                stroke="#1E1E1E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.49 19.147c.441.17.702.42 1.016.766.505.56 1.113.786 1.797 1.063.695.28 1.287.536 2.048.563.423.014.758-.008 1.047.28M21.257 27.447c.948.597 3.095.63 3.095-.985 0-.839-1.58.53-1.72.985-.447 1.465-.709 2.023.313 3.345.934 1.209 3.118.536 3.658-.813M29.135 28.15c0-.43-.07-.444-.531-.421-.59.027-.866.948-1.016 1.406-.178.543-.26 1.294-.032 1.829.32.747 1.166.977 1.571.117.3-.637.43-1.579.43-2.29v2.087c0 .524.215 1.796.704 2.11.562.361 1.592-1.006 1.969-1.32M35.184 29.416c-.712-1.34-1.284.529-1.266 1.298.022.916.954 1.529 1.72 1.766.577.18 1.483.577 1.062 1.376-.34.646-1.5.51-2.079.625"
              ></path>
              <path
                stroke="#1E1E1E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M39.545 30.542c0 1.378-.678 3.665.14 4.892.683 1.024 1.79-1.009 1.892-1.508.099-.479.205-1.004.219-1.493.007-.232 0 1.307 0 1.587 0 1.158.14 2.295.14 3.446 0 1.682-.102 3.392-2.14 3.494-.647.032-1.445.296-2.048-.04-.645-.357-1.181-.675-1.915-.875-1.228-.335-2.463-.774-3.603-1.344M56.426 24.07c0 2.7-.022 5.399 0 8.097.01 1.248.414 2.398.563 3.627.103.849.167.654-.094-.141-.419-1.276-.786-2.499-.953-3.837-.165-1.318-.588-3.786.61-4.713 1.078-.835 2.496-2.188 3.954-2.188 1.027 0 1.287 1.288 1.477 2.126.603 2.65-2.094 3.66-4.15 4.345M60.646 34.762c.734-.348 1.493-.642 2.228-.985.536-.25.365-.516.586-.984.108-.228.535-.984.164-1.18-.469-.249-1.797-.247-2.055.343-.265.606-.243 1.56-.36 2.212-.132.736-.247 1.304.156 1.954.321.517.69 1.385 1.282 1.672.813.395 2.422-1.639 3.064-2.047M70.212 31.808c0-.344.112-.858-.156-1.125-.81-.81-2.13.06-2.587.812-.69 1.137-1.387 3.155-.742 4.47.42.86 1.838-.268 2.329-.562.984-.59 1.156-1.607 1.156-2.673 0-.235.238-1.551.274-1.156.105 1.152.238 2.153.54 3.266.222.824 1.747-1.82 2-2.188M75.277 28.572c0-.87-1.123.332-1.235.657-.148.428-.89 2.003-.5 2.407.317.33 1.064.594 1.508.594.514 0 .88.79.922 1.227.049.51-.098 1.314-.563 1.633-.177.122-.534.335-.414.094"
              ></path>
              <path
                stroke="#1E1E1E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M76.965 28.15c.039 1.093.5 3.365 1.516 4.017.406.262 1.587-1.264 1.829-1.516.703-.729 1.394-1.739 1.438-2.782.005-.117 0-1.308 0-.64v2.61c0 .926.104 1.781.352 2.672.419 1.508.103 3.889-.5 5.323-.755 1.79-1.934 2.414-3.643 3.118-1.663.685-3.63.09-5.337.711-1.494.543-2.941 1.23-4.432 1.79-.75.281-1.46.77-2.196 1.016M85.546 46.298c.69.275.922 1.806 1.61 2.297.401.287.548.43 1.063.516M90.329 44.469c1.707.64 3.247 1.597 4.885 2.383 1.052.506 2.144.924 3.188 1.446.632.316.536.11.649-.453M93.002 40.108c1.22.081 2.423.266 3.65.266.329 0 1.235.092 1.414-.266M5.361 13.239h2.673M1 2.407c.902.544 1.686 1.214 2.548 1.813 1.005.698 2.146 1.172 3.204 1.782 1.564.901 3.058 1.897 4.658 2.735M10.425 1c.64 0 .806 1.492.922 2 .136.597.485 1.332.485 1.939"
              ></path>
            </svg>
          </div>
        </NavLink>
        {/* BURGER */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-8 top-6 cursor-pointer md:hidden text-3xl text-sky-700 hover:text-orange-500"
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
