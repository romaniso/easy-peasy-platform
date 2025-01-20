import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(dataId: string) {
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeId, setActiveId] = useState("");
  const [elementsReady, setElementsReady] = useState(false); // Track when elements are ready

  useEffect(() => {
    console.log(dataId);

    if (!dataId) return;

    // Clean up previous observer
    if (observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }

    const handleObserver: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Active entry:", entry);
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "40% 0% -20% 0px",
    });

    // Retry observing if elements are not ready yet
    const tryObserving = () => {
      const elements = document.querySelectorAll(
        ".markdown-content h2, .markdown-content h3"
      );

      if (elements.length > 0) {
        console.log("Observing elements:", elements);
        elements.forEach((elem) => observer.current?.observe(elem));
        setElementsReady(true); // Mark elements as ready
      } else {
        console.warn("No headings found to observe. Retrying...");
      }
    };

    // Defer observation to ensure DOM updates are complete
    const timeoutId = setTimeout(tryObserving, 50);

    return () => {
      clearTimeout(timeoutId);
      observer.current?.disconnect();
    };
  }, [dataId]); // Effect runs when `data` changes

  useEffect(() => {
    // Log when elements become ready
    if (elementsReady) {
      console.log("Elements are ready for observation.");
    }
  }, [elementsReady]);

  return { activeId };
}
