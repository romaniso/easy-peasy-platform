import React, {ReactElement, useEffect, useRef, useState} from "react";
import { PiCaretUpDownLight } from "react-icons/pi";

interface SelectItem<T> {
    label: string;
    value: T;
    icon: ReactElement;
}
interface SelectProps<T> {
    options: SelectItem<T>[];
    onChange?: (option: T) => void;
}
const Select = <T,>({ options, onChange }: SelectProps<T>) => {
    const [selectedOption, setSelectedOption] = useState<SelectItem<T> | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const selectRef = useRef<HTMLDivElement>(null);

    const handleSelectOption = (option: SelectItem<T>) => {
        setSelectedOption(option);
        setIsOpen(false);
        if(onChange) {
            onChange(option.value);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if(!selectRef.current) return;
            if(!selectRef.current.contains(event.target as Node)){
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleOutsideClick, true);

        return () => {
            document.removeEventListener("click", handleOutsideClick, true);
        };
    }, []);

    return (
        <div className="relative" ref={selectRef}>
            <div
                className="border border-indigo-100 dark:border-indigo-500/50 rounded px-4 py-2 flex items-center justify-between cursor-pointer text-indigo-800 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption ? (
                    <>
                        {selectedOption.label}
                        {selectedOption.icon && selectedOption.icon}
                    </>
                ) : (
                    <>
                        <span>
                            Select an option
                        </span>
                        <PiCaretUpDownLight/>
                    </>
                )}
            </div>
            {isOpen && (
                <div className="block md:absolute top-full w-full left-0 mt-2 border border-indigo-100 dark:border-indigo-500/50 rounded shadow-sm">
                    {options.map((option) => (
                        <div
                            key={option.label}
                            className="px-4 py-2 cursor-pointer flex w-full justify-between items-center text-indigo-800 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                            onClick={() => handleSelectOption(option)}
                        >
                            {option.label}
                            {option.icon && option.icon}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;
