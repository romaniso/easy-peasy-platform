import React from "react";

export interface RadioButtonItem {
  name: string;
  value: string | number;
}
interface RadioButtonProps {
  name: string;
  item: RadioButtonItem;
  checked: boolean;
  onChange: React.Dispatch<React.SetStateAction<string | "more" | null>>;
}
export const RadioButton = ({
  name,
  item,
  checked,
  onChange,
}: RadioButtonProps): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <label
      htmlFor={item.name}
      className={`flex items-center w-full shadow-md md:shadow-none rounded-md border md:border-none border-indigo-200 md:bg-transparent dark:border-indigo-500/50 md:dark:bg-transparent px-2 md:px-0 py-1 md:py-0 text-indigo-900 dark:text-indigo-300 cursor-pointer
                ${
                  checked
                    ? "text-orange-500 font-semibold bg-indigo-500/10"
                    : "bg-transparent"
                }
            `}
    >
      <input
        type="radio"
        id={item.name}
        name={name}
        value={item.value}
        className={`mr-1 align-middle cursor-pointer appearance-none border-indigo-500 dark:border-orange-500 w-3 h-3 rounded-full relative 
                ${checked ? "border-4" : "border-2"}`}
        onChange={handleChange}
      />
      {item.name}
    </label>
  );
};
