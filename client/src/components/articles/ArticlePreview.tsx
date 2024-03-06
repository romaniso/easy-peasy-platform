import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  introduction: string;
  link: string;
  imgSrc: string;
}

export default function ArticlePreview({
  title,
  introduction,
  link,
  imgSrc,
}: Props) {
  return (
    <article className="basis-1/4 flex-shrink group hover:scale-95 transition-transform duration-200">
      <Link to={link}>
        <img src={imgSrc} alt="" className="w-full rounded-md shadow-sm" />
        <h3 className="text-lg text-indigo-700 dark:text-indigo-400 font-semibold mb-1">
          {title}
        </h3>
        <p className="text-sm text-indigo-900 dark:text-indigo-200 mb-2 group-hover:underline">
          {introduction}
        </p>
        <p className="text-orange-500 text-lg underline">Read</p>
      </Link>
    </article>
  );
}
