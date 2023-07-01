import classNames from "classnames";

function Panel({ children, className, ...rest }) {
  const panelClasses = classNames(
    "p-3 border bg-white shadow rounded-md w-full",
    className
  );

  return (
    <div {...rest} className={panelClasses}>
      {children}
    </div>
  );
}

export default Panel;
