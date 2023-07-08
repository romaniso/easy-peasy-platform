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
      "bg-orange-400 text-sky-800 hover:bg-orange-500": primary,
      "bg-stone-500 text-orange-200 hover:bg-stone-700": secondary,
      "bg-green-500 text-fuchsia-900 hover:bg-green-600": success,
      "bg-yellow-500 text-fuchsia-900 hover:bg-yellow-600": warning,
      "bg-red-500 text-white hover:bg-red-600": danger,
      "bg-transparent font-semibold": outline,
      "rounded-md": rounded,
      "border-orange-400 text-orange-400 hover:text-white": outline && primary,
      "border-stone-500 text-stone-500 hover:text-white": outline && secondary,
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
