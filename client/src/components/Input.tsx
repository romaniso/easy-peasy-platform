import {
    forwardRef,
    ChangeEvent,
    ReactNode,
    InputHTMLAttributes,
    useState,
    useEffect, ChangeEventHandler,
} from "react";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    children: ReactNode;
    primary?: boolean;
    secondary?: boolean;
    rounded?: boolean;
    outline?: boolean;
    icon?: ReactNode;
    onChange?: ChangeEventHandler<HTMLInputElement>;
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
    const wrapperClasses = classNames(rest.className, "relative z-0");

    const inputClasses = classNames(
        "p-2 focus:outline-none transition-colors peer border w-full",
        {
            "focus:border-orange-400 text-sky-700": primary,
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
            "text-sky-700 peer-focus:text-orange-500 peer-valid:text-orange-500":
            primary,
            "text-orange-500 peer-focus:text-indigo-300 peer-valid:text-sky-500":
            secondary,
        }
    );

    const [value, setValue] = useState<string>("");
    const handleChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setValue(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };

    useEffect(() => {
        // If you want to execute something whenever the value changes.
        // For now, I'm leaving it empty as per your original implementation.
    }, [value]);

    return (
        <div className={wrapperClasses}>
            <input
                {...rest}
                className={inputClasses}
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
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
