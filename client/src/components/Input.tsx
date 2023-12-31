import {
    forwardRef,
    ReactNode,
    InputHTMLAttributes,
    useState,
} from "react";
import classNames from "classnames";


type InputRestProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'name' | 'type' | 'onChange' | 'primary' | 'secondary' | 'rounded' | 'outline'>;

interface InputProps extends InputRestProps {
    children: ReactNode;
    name: string;
    type: string;
    primary?: boolean;
    secondary?: boolean;
    rounded?: boolean;
    outline?: boolean;
    icon?: ReactNode;
    onChange: ((value: string) => void);
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        children,
        name,
        type,
        onChange,
        primary,
        secondary,
        rounded,
        outline,
        icon,
        ...rest
    },
    ref
) {
    const [value, setValue] = useState<string>("");
    const handleChange = (
        value: string
    ) => {
        setValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    const wrapperClasses = classNames(rest.className, "relative z-0");

    const inputClasses = classNames(
        "p-2 focus:outline-none transition-colors peer border w-full dark:border-indigo-300",
        {
            "focus:border-orange-500 text-indigo-700 dark:text-indigo-300 dark:bg-transparent ": primary,
            "bg-stone-400 focus:border-indigo-300 text-indigo-300": secondary,
            "rounded-md": rounded,
            "bg-transparent": outline,
            "border-orange-400 bg-transparent text-orange-400 hover:text-orange-500":
                outline && primary,
            "border-orange-400 bg-transparent text-indigo-300 hover:text-orange-500":
                outline && secondary,
        }
    );
    const labelClasses = classNames(
        "absolute left-3 top-1/2 -translate-y-1/2 cursor-text peer-focus:text-xs peer-focus:-top-3 peer-focus:left-0 peer-valid:text-xs peer-valid:-top-3 peer-valid:left-0 transition-all duration-500",
        {
            "text-indigo-700 dark:text-indigo-300 peer-focus:text-orange-500 peer-valid:text-orange-500":
            primary,
            "text-orange-500 peer-focus:text-indigo-300 peer-valid:text-indigo-500":
            secondary,
            "text-xs -top-3 -left-0 !text-orange-500": value.length > 0,
        }
    );

    return (
        <div className={wrapperClasses}>
            <input
                {...rest}
                className={inputClasses}
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                ref={ref}
            />
            <label className={labelClasses} htmlFor={name}>
                {children}
            </label>
            {icon}
        </div>
    );
});

export default Input;

