import React from "react";
import classNames from "classnames";

interface PanelProps {
  children: React.ReactNode;
  className: string;
}
export const Panel = ({
  children,
  className,
  ...rest
}: PanelProps): JSX.Element => {
  const panelClasses = classNames(
    "dark:bg-gradient-to-r dark:from-stone-800 dark:to-stone-900 p-3 border border-white dark:border-gray-700 backdrop-blur-xl shadow-lg dark:bg-stone-800 rounded-md w-full",
    className
  );

  return (
    <div {...rest} className={panelClasses}>
      {children}
    </div>
  );
};
