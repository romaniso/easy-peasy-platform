import className from "classnames";

function Checkbox({ children, checked, onChange, disabled, name, ...rest }) {
  const wrapperClasses = className(rest.className, "flex items-center");
  const inputClasses = className(
    "mr-2 bg-stone-400 border-sky-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded cursor-pointer"
  );
  const labelClasses = className("cursor-pointer select-none text-sky-700");

  return (
    <div className={wrapperClasses}>
      <input
        className={inputClasses}
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label className={labelClasses} htmlFor={name}>
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
