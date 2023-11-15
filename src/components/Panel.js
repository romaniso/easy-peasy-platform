import classNames from "classnames";

function Panel({ children, className, ...rest }) {
  const panelClasses = classNames(
    "p-3 border border-white backdrop-blur-xl shadow-lg dark:bg-black dark:text-white rounded-md w-full",
    className
  );

  return (
    <div {...rest} className={panelClasses}>
      {children}
    </div>
  );
}

export default Panel;
