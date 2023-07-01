import { useState, forwardRef } from "react";
import className from "classnames";

const Input = forwardRef(function Input(props, ref) {
  const {
    children,
    name,
    type,
    onChange,
    primary,
    secondary,
    rounded,
    outline,
    ...rest
  } = props;
  const inputClasses = className(
    rest.className,
    "p-2 focus:outline-none transition-colors peer border w-full",
    {
      "focus:border-orange-400 text-sky-700": primary,
      "bg-stone-400 focus:border-sky-300 text-white": secondary,
      "rounded-md": rounded,
      "bg-transparent": outline,
      "border-orange-400 bg-transparent text-orange-400 hover:text-orange-500":
        outline && primary,
      "border-stone-500 bg-transparent text-stone-500 hover:text-orange-500":
        outline && secondary,
    }
  );
  const labelClasses = className(
    rest.className,
    "absolute left-3 top-1/2 -translate-y-1/2 cursor-text peer-focus:text-xs peer-focus:-top-3 peer-focus:left-0 peer-valid:text-xs peer-valid:-top-3 peer-valid:left-0 transition-all duration-500",
    {
      "text-sky-700  peer-focus:text-orange-500 peer-valid:text-orange-500":
        primary,
      "text-orange-500  peer-focus:text-sky-500 peer-valid:text-sky-500":
        secondary,
    }
  );

  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(value);
  };
  return (
    <div className="mt-4 relative">
      <input
        className={inputClasses}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        {...rest}
        ref={ref}
      />
      <label className={labelClasses} htmlFor={name}>
        {children}
      </label>
      {null || rest.icon}
    </div>
  );
});

export default Input;
