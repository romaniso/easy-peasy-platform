import { useEffect, useRef } from "react";
import { Article } from "../interfaces/article";

export const useIntersectionObserver = (
  data: Article,
  setActiveId: React.Dispatch<React.SetStateAction<string>>,
  activeId: string
) => {
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>(
    {}
  ); // Explicit type

  useEffect(() => {
    console.log("useEffect from IntersectionObserver");

    const callback: IntersectionObserverCallback = (entries) => {
      console.log("from callback");
      console.log(headingElementsRef);
      console.log(headingElements);
      headingElementsRef.current = entries.reduce((map, entry) => {
        map[entry.target.id] = entry; // Use `entry.target.id`
        return map;
      }, {} as Record<string, IntersectionObserverEntry>); // Ensure proper type

      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }

      if (visibleHeadings.length === 0) {
        const activeElement = headingElements.find((el) => el.id === activeId);
        const activeIndex = headingElements.findIndex(
          (el) => el.id === activeId
        );

        const activeIdYcoord = activeElement?.getBoundingClientRect().y;
        if (activeIdYcoord && activeIdYcoord > 150 && activeIndex !== 0) {
          setActiveId(headingElements[activeIndex - 1].id);
        }
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -40% 0px", // Adjust margins to fit your layout
    });

    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll(".markdown-content h2, .markdown-content h3")
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId, activeId, data]);
};
