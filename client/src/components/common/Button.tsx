import { ButtonHTMLAttributes, ReactElement, ReactEventHandler } from "react";
import className from "classnames";
import { useTranslation } from "react-i18next";
import { Icon, IconType } from "./icon/Icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactElement | string;
  primary?: true;
  secondary?: true;
  success?: true;
  warning?: true;
  danger?: true;
  small?: true;
  outline?: true;
  rounded?: true;
  onClick?: ReactEventHandler;
  submit?: true;
  save?: true;
}
export const Button = ({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  small,
  outline,
  rounded,
  submit,
  save,
  onClick,
  ...rest
}: ButtonProps): JSX.Element => {
  const { t } = useTranslation("common");
  const classes = className(
    rest.className,
    "flex items-center justify-center cursor-pointer transition-colors border shadow",
    {
      "py-2 px-5 bg-orange-400 dark:bg-orange-500 text-white hover:bg-orange-500 hover:dark:bg-orange-600":
        primary,
      "py-2 px-5 bg-indigo-500 text-white hover:bg-indigo-800": secondary,
      "py-2 px-5 bg-green-500 text-white hover:bg-green-600": success,
      "py-2 px-5 bg-yellow-500 text-fuchsia-900 hover:bg-yellow-600": warning,
      "py-2 px-5 bg-red-500 text-white hover:bg-red-600": danger,
      "py-2 px-5 bg-transparent font-semibold": outline,
      "rounded-md": rounded,
      "border-orange-400 text-orange-600 hover:text-stone-800 hover:bg-indigo-300 hover:border-indigo-300":
        outline && primary,
      "hover:!text-white !bg-transparent !border-indigo-500 !text-indigo-500 dark:text-indigo-200 dark:border-indigo-200 hover:!bg-indigo-700 hover:!text-white hover:dark:!bg-indigo-600":
        outline && secondary,
      "border-green-500 text-green-500 hover:text-white": outline && success,
      "border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500":
        outline && warning,
      "border-red-500 text-red-500 hover:text-white": outline && danger,
      "py-0 px-1.5 md:py-1 md:px-1 !text-sm capitalize": small,
      "hover:bg-indigo-700 hover:!text-white hover:!dark:bg-indigo-600":
        small && secondary,
    }
  );
  return (
    <button
      {...rest}
      className={classes}
      onClick={onClick}
      type={submit ? "submit" : rest.type}
    >
      {save ? (
        <span>
          {t("buttons.save")}
          <Icon className="inline ml-1.5" type={IconType.Save} />
        </span>
      ) : (
        children
      )}
    </button>
  );
};
