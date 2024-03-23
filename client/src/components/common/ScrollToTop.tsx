import { useEffect, useState } from "react";
import { RxChevronUp } from "react-icons/rx";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative">
      {" "}
      {showTopBtn && (
        <RxChevronUp
          className="fixed bottom-10 right-6 z-50 icon-style rounded-md bg-indigo-500 text-indigo-50 cursor-pointer transition-transform ease-in-out duration-500 h-10 w-10 shadow-md"
          onClick={goToTop}
        />
      )}{" "}
    </div>
  );
};
export default ScrollToTop;
