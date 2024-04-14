import { ReactElement, useEffect, useRef, useState } from "react";
import { PiCaretUpDownLight } from "react-icons/pi";
import className from "classnames";

interface SelectItem<T> {
  label: string | number;
  value: T;
  icon?: ReactElement;
}
interface SelectProps<T> {
  options: SelectItem<T>[];
  onChange?: (option: T) => void;
  defaultOption?: SelectItem<T>;
  defaultText: string | ReactElement;
  noBorders?: true;
  noArrows?: true;
}
const Select = <T,>({
  options,
  onChange,
  defaultOption,
  defaultText,
  noBorders,
  noArrows,
}: SelectProps<T>) => {
  const [selectedOption, setSelectedOption] = useState<SelectItem<T> | null>(
    defaultOption || null
  );
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelectOption = (option: SelectItem<T>) => {
    setIsOpen(false);
    setSelectedOption(option);
    if (onChange) {
      onChange(option.value);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!selectRef.current) return;
      if (!selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick, true);

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  const classes = className(
    "dark:bg-transparent  rounded px-2 md:px-4 py-2 flex items-center justify-between cursor-pointer text-indigo-800 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/50",
    { "border-none rounded-full": noBorders }
  );

  return (
    <div className="relative w-full" ref={selectRef}>
      <div className={classes} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? (
          <>
            <span className={`${noArrows ? "" : "mr-4"}`}>{defaultText}</span>
            {selectedOption.icon && selectedOption.icon}
          </>
        ) : (
          <>
            {noArrows ? (
              <span>{defaultText}</span>
            ) : (
              <>
                <span className="mr-4">{defaultText}</span>
                <PiCaretUpDownLight />
              </>
            )}
          </>
        )}
      </div>
      {isOpen && (
        <div className="block md:absolute top-full w-full left-0 mt-2 border border-indigo-100 dark:border-indigo-500/50 rounded-md overflow-hidden shadow-sm z-10">
          {options.map((option) => (
            <div
              key={option.label}
              className="px-2 md:px-4 py-2 cursor-pointer flex w-full justify-between items-center text-indigo-800 dark:text-indigo-400 bg-white dark:bg-stone-900 hover:bg-indigo-50 dark:hover:bg-stone-800"
              onClick={() => handleSelectOption(option)}
            >
              <span>{option.label}</span>
              {option.icon && (
                <span className="flex-shrink-0">{option.icon}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
