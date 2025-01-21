import { useHeadingsData } from "../../../hooks/useHeadingsData";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import { Article } from "../../../interfaces/article";

interface TableOfContentsProps {
  title?: string;
  data: Article; //@FIXME: should be generic type: article, blog, everything
}

export const TableOfContents = ({
  title,
  data,
}: TableOfContentsProps): JSX.Element => {
  const { nestedHeadings } = useHeadingsData(data);
  const { activeId } = useIntersectionObserver(data);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    document.querySelector(`#${id}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="sticky top-20 overflow-auto">
      {title && (
        <h3 className="text-2xl font-bold text-indigo-500 drop-shadow mb-2">
          {title}
        </h3>
      )}
      <nav aria-label="Table of contents">
        <ul className="flex flex-col gap-2 border-l border-white dark:border-black/30">
          {nestedHeadings.map((heading, index) => (
            <li key={heading.id + index} className="pl-4">
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleSmoothScroll(e, heading.id)}
                className={`text-lg font-semibold transition-colors text-indigo-600 hover:text-indigo-800 dark:text-indigo-300
                     ${
                       heading.id === activeId
                         ? "text-orange-500 dark:text-orange-500"
                         : ""
                     }
                     `}
              >
                {heading.title}
              </a>
              {/* If there is a h3 element */}
              {heading.items.length > 0 && (
                <ul className="ml-4 flex flex-col gap-1">
                  {heading.items.map((child, index) => (
                    <li key={child.id + index}>
                      <a
                        href={`#${child.id}`}
                        onClick={(e) => handleSmoothScroll(e, child.id)}
                        className={`
                           text-md text-indigo-500 hover:text-indigo-700
                           ${
                             child.id === activeId
                               ? "text-orange-500 dark:text-orange-500"
                               : ""
                           }
                        `}
                      >
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};
