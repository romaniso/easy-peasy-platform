import React, {ButtonHTMLAttributes, ReactElement, ReactEventHandler} from "react";
import className from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactElement | string;
    primary?: true;
    secondary?: true;
    success?: true;
    warning?: true;
    danger?: true;
    small?: true;
    outline?: true;
    rounded?: true;
    onClick?: ReactEventHandler;
}
const Button: React.FC<ButtonProps> = ({
                    children,
                    primary,
                    secondary,
                    success,
                    warning,
                    danger,
                    small,
                    outline,
                    rounded,
                    onClick,
                    ...rest
                }) => {
    const classes = className(
        rest.className,
        "flex items-center justify-center py-2 px-5 cursor-pointer transition-colors border shadow",
        {
            "bg-orange-400 dark:bg-orange-500 text-white hover:bg-orange-500 hover:dark:bg-orange-600": primary,
            "bg-transparent border-indigo-800 text-indigo-800 dark:text-indigo-200 dark:border-indigo-200 hover:bg-indigo-700 hover:text-white hover:dark:bg-indigo-600": secondary,
            "bg-green-500 text-fuchsia-900 hover:bg-green-600": success,
            "bg-yellow-500 text-fuchsia-900 hover:bg-yellow-600": warning,
            "bg-red-500 text-white hover:bg-red-600": danger,
            "bg-transparent font-semibold": outline,
            "rounded-md": rounded,
            "border-orange-400 text-orange-600 hover:text-stone-800 hover:bg-indigo-300 hover:border-indigo-300":
                outline && primary,
            "hover:text-indigo-300":
                outline && secondary,
            "border-green-500 text-green-500 hover:text-white": outline && success,
            "border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500":
                outline && warning,
            "border-red-500 text-red-500 hover:text-white": outline && danger,
            "py-0.5 px-1 !text-sm capitalize !text-white !border-white":  small,
        }
    );
    return (
        <button {...rest} className={classes} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;