import { useEffect, useState } from "react";
import { RxChevronUp } from "react-icons/rx";

export const ScrollToTop = (): JSX.Element => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const onScroll = (): void => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    // return window.removeEventListener("scroll", onScroll);
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative">
      {showTopBtn && (
        <RxChevronUp
          className="fixed bottom-10 right-6 z-50 icon-style rounded-md bg-indigo-500 text-indigo-50 cursor-pointer transition-transform ease-in-out duration-500 h-10 w-10 shadow-md"
          onClick={goToTop}
        />
      )}
    </div>
  );
};
