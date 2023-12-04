import classNames from "classnames";

function Panel({ children, className, ...rest }) {
  const panelClasses = classNames(
    "p-3 border border-white dark:border-gray-500 backdrop-blur-xl shadow-lg dark:bg-stone-800 rounded-md w-full",
    className
  );

  return (
    <div {...rest} className={panelClasses}>
      {children}
    </div>
  );
}

export default Panel;