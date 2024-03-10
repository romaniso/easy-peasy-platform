import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  introduction: string;
  link: string;
  imgSrc: string;
}

export const ArticlePreview = ({
  title,
  introduction,
  link,
  imgSrc,
}: Props) => {
  return (
    <article className="w-full group transition-transform duration-200 text-center">
      <Link to={link}>
        <div className="w-full h-40 rounded-md shadow-sm overflow-hidden">
          <img src={imgSrc} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="px-2">
          <h3 className="text-lg text-indigo-700 dark:text-indigo-400 font-semibold mb-1">
            {title}
          </h3>
          <p className="text-sm text-indigo-900 dark:text-indigo-200 mb-2 group-hover:underline">
            {introduction}
          </p>
          <p className="text-orange-500 text-lg underline">Read</p>
        </div>
      </Link>
    </article>
  );
};
