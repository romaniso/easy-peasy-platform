import className from "classnames";
function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  ...rest
}) {
  const classes = className(
    rest.className,
    "flex items-center justify-center py-2 px-5 cursor-pointer transition-colors border shadow",
    {
      "bg-orange-400 text-white hover:bg-orange-500": primary,
      "bg-stone-600 text-indigo-800 hover:bg-stone-700": secondary,
      "bg-green-500 text-fuchsia-900 hover:bg-green-600": success,
      "bg-yellow-500 text-fuchsia-900 hover:bg-yellow-600": warning,
      "bg-red-500 text-white hover:bg-red-600": danger,
      "bg-transparent font-semibold": outline,
      "rounded-md": rounded,
      "border-orange-400 text-orange-600 hover:text-stone-800 hover:bg-indigo-300 hover:border-indigo-300":
        outline && primary,
      "border-stone-500 text-stone-700 hover:text-indigo-300":
        outline && secondary,
      "border-green-500 text-green-500 hover:text-white": outline && success,
      "border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500":
        outline && warning,
      "border-red-500 text-red-500 hover:text-white": outline && danger,
    }
  );
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

export default Button;
