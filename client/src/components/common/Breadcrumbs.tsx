import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { Level } from "../../enums/level";

interface Props {
  withoutLevels?: true;
}

const Breadcrumbs = ({ withoutLevels }: Props) => {
  const { pathname } = useLocation();
  let currentLink: string = "";

  const excludedPaths: string[] = Object.values(Level).map((item) =>
    item.toLowerCase()
  );

  const crumbs: JSX.Element[] = pathname
    .split("/")
    .filter((crumb) => {
      if (withoutLevels) {
        return crumb !== "" && !excludedPaths.includes(crumb.toLowerCase());
      } else return crumb !== "";
    })
    .map((crumb, index, arr) => {
      //const decodedCrumb: string = decodeURIComponent(crumb);
      const decodedCrumb: string = decodeURIComponent(crumb).replaceAll(
        "-",
        " "
      );
      currentLink += `/${crumb}`;

      return (
        <div
          className={`inline-flex items-center gap-1 mr-2 md:mr-4 text-indigo-800/75 dark:text-indigo-300/90 text-base md:text-lg hover:text-orange-500 hover:dark:text-orange-500 transition-opacity ${
            index === arr.length - 1
              ? "font-bold text-indigo-900 hover:text-orange-500 dark:text-indigo-200"
              : ""
          }`}
          key={decodedCrumb}
        >
          <Link to={currentLink}>{decodedCrumb}</Link>
          {index !== arr.length - 1 && <BsChevronRight />}
        </div>
      );
    });

  return (
    <div className="mb-2 md:mb-6 mt-4 container mx-auto">
      <section className="bg-white dark:bg-stone-800 inline-block px-2 py-1 md:px-3 md:py-2 rounded-md shadow">
        {crumbs}
      </section>
    </div>
  );
};

export default Breadcrumbs;
