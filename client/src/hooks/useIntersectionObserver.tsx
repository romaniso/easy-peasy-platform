import { useEffect, useState, useRef } from "react";

export function useIntersectionObserver() {
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const initialActiveId = document.querySelector<HTMLHeadElement>(
      ".markdown-content h2"
    );
    if (initialActiveId) {
      setActiveId(initialActiveId.id);
    }

    const handleObserver: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          console.log("Active entry:", entry);
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
      rootMargin: "-30% 0px -60% 0px",
    });

    const elements = document.querySelectorAll<HTMLHeadElement>(
      ".markdown-content h2, .markdown-content h3"
    );

    if (elements.length > 0) {
      console.log("Observing elements:", elements);
      elements.forEach((elem) => observerRef.current?.observe(elem));
    } else {
      console.warn("No headings found to observe. Retrying...");
    }

    return () => {
      observerRef.current?.disconnect();
      console.log("Observer disconnected.");
    };
  }, [activeId]);

  return { activeId };
}
