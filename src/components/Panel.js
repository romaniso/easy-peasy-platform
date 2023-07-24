import classNames from "classnames";

function Panel({ children, className, ...rest }) {
  const panelClasses = classNames(
    "p-3 border border-white backdrop-blur-xl shadow-lg rounded-md w-full",
    className
  );

  return (
    <div {...rest} className={panelClasses}>
      {children}
    </div>
  );
}

export default Panel;
