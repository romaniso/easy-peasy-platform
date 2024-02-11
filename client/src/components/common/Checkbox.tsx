import className from "classnames";
import React, {InputHTMLAttributes, ReactNode} from "react";

type CheckboxRestProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'name' | 'onChange' | 'disabled' | 'checked'>;
interface CheckboxProps extends CheckboxRestProps{
    children: ReactNode;
    checked: boolean;
    disabled?: true;
    name: string;
    onChange(): void;
}
const Checkbox: React.FC<CheckboxProps> = ({ children, checked, onChange, disabled, name, ...rest }) => {
    const wrapperClasses = className(rest.className, "flex items-center");
    const inputClasses = className(
        "mr-2 bg-white dark:bg-stone-800 border border-indigo-300 focus:ring-3 focus:ring-orange-500 h-4 w-4 rounded cursor-pointer outline-none appearance-none", {
            '!bg-orange-500' : checked
    }
    );
    const labelClasses = className("cursor-pointer select-none text-indigo-700 dark:text-indigo-300");

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