import { useEffect, useRef, useState } from "react";
import { Article } from "../interfaces/article";

export function useIntersectionObserver(data: Article) {
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObserver: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Active entry:", entry);
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      threshold: 1,
      rootMargin: "-30% 0px -40% 0px",
    });

    const elements: NodeListOf<HTMLHeadElement> = document.querySelectorAll(
      ".markdown-content h2, .markdown-content h3"
    );

    if (elements.length > 0) {
      console.log("Observing elements:", elements);
      elements.forEach((elem) => observer.current?.observe(elem));
    } else {
      console.warn("No headings found to observe. Retrying...");
    }
    return () => {
      observer.current?.disconnect();
      console.log("Observer disconnected.");
    };
  }, [data]);

  return { activeId };
}
