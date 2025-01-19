import { useEffect, useState } from "react";
import { Article } from "../interfaces/article";

type Heading3 = {
  title: string;
  id: string;
};

type Heading2 = {
  title: string;
  id: string;
  items: Heading3[];
};

export const useHeadingsData = (data: Article) => {
  const [nestedHeadings, setNestedHeadings] = useState<Heading2[]>([]);

  useEffect(() => {
    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll(".markdown-content h2, .markdown-content h3")
    );

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);

    return () => setNestedHeadings([]);
  }, [data]);

  const getNestedHeadings = (headingElements: HTMLHeadingElement[]) => {
    const nestedHeadings: Heading2[] = [];

    headingElements.forEach((heading) => {
      const { innerText: title, id } = heading;

      if (heading.nodeName === "H2") {
        nestedHeadings.push({ id, title, items: [] });
      } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title,
        });
      }
    });

    return nestedHeadings;
  };

  return { nestedHeadings };
};
