import { RadioButton, RadioButtonItem } from "./RadioButton";
import React from "react";

interface RadioGroupProps {
  name: string;
  value: string | null;
  items: RadioButtonItem[];
  onChange: React.Dispatch<React.SetStateAction<string | "more" | null>>;
}
export const RadioGroup = ({
  name,
  items,
  value,
  onChange,
}: RadioGroupProps): JSX.Element => {
  return (
    <>
      {items.map((item) => (
        <RadioButton
          name={name}
          item={item}
          key={`${name}-${item.value}`}
          checked={value == item.value}
          onChange={onChange}
        />
      ))}
    </>
  );
};
