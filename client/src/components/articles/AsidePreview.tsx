import { Link } from "react-router-dom";

interface Props {
  title: string;
  introduction: string;
  link: string;
  imgSrc: string;
}

export const AsidePreview = ({ title, introduction, link, imgSrc }: Props) => {
  return (
    <article className="group transition-transform duration-200 hover:scale-95">
      <Link to={link} className="flex gap-2">
        <div className="basis-3/5 flex-1 h-28 rounded-md shadow-sm overflow-hidden">
          <img src={imgSrc} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="basis-2/5 flex-1">
          <h3 className="text-lg text-indigo-700 dark:text-indigo-400 font-semibold mb-0.5">
            {title}
          </h3>
          <p className="text-sm text-indigo-900 dark:text-indigo-200 mb-2 group-hover:underline leading-tight">
            {introduction}
          </p>
        </div>
      </Link>
    </article>
  );
};
