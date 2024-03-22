import LogoImage from "../../assets/images/small-logo.png";

export const Logo = () => {
  return (
    <span className="flex items-center group">
      <img
        src={LogoImage}
        alt="logo"
        className="w-8 group-hover:scale-110 transition-transform duration-500"
      />
      <span className="text-lg font-semibold dark:text-indigo-300 text-indigo-800 group-hover:drop-shadow-purpleGlow transition-all duration-500 whitespace-nowrap relative">
        EASY-PEASY
        <small className="absolute right-0 -bottom-1.5 dark:text-orange-300 text-orange-700 rounded-md px-1 leading-none font-thin text-xs">
          beta
        </small>
      </span>
    </span>
  );
};
