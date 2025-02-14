import { useEffect, useState } from "react";
import Logo from "../../assets/images/small-logo.png";

export const Loader = (): JSX.Element => {
  const [isDarkTheme] = useState<boolean>(() => {
    return (
      window.matchMedia("(prefers-color-scheme: dark)").matches ||
      localStorage.getItem("themeMode") !== "dark"
    );
  });

  useEffect(() => {
    if (isDarkTheme) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [isDarkTheme]);

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#F5F3FF] dark:from-[#202020] via-[#FAE8FF] dark:via-[#3b4058] to-[#C7D2FE] dark:to-[#202020] flex justify-center items-center">
      <img src={Logo} alt="" className="w-[100px] animate-bounce" />
    </div>
  );
};
