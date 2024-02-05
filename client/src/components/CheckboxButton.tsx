import React, {ChangeEvent, ReactElement} from "react";

type RadioButtonItem = {
    text: string;
    icon?: ReactElement;
}
interface RadioButtonProps {
    item: RadioButtonItem;
    small?: true;
    checked: boolean;
    onChange?: (checked: boolean) => void;
}
const CheckboxButton: React.FC<RadioButtonProps> = ({item, small, checked,  onChange}) => {
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.checked);
        }
    };
    return (
        <label
            key={item.text}
            htmlFor={item.text}
            className={`relative inline-block ${!small && 'w-full h-full'} rounded-xl shadow-md cursor-pointer group overflow-hidden`}
        >
            <input
                type="checkbox"
                id={item.text}
                name={item.text}
                value={item.text}
                className='absolute inset-0 w-full h-full inline-block appearance-none rounded-xl outline-0 transition-colors cursor-pointer peer'
                onChange={handleCheckboxChange}
                checked={checked}
            />
            <div className={`flex justify-start items-center h-full relative z-10 ${small ? 'gap-1 py-1.5 px-2 lg:py-2 lg:px-3' : 'gap-3 py-2 px-4 lg:py-4 lg:px-4'} text-indigo-800 dark:text-indigo-200 bg-indigo-50 dark:bg-stone-800 group-hover:bg-indigo-100 dark:group-hover:bg-stone-900 peer-checked:bg-indigo-100 dark:peer-checked:bg-black/30 peer-checked:text-orange-500`}>
                {item.icon &&  <span className={`${small ? 'text-lg' : 'text-xl lg:text-2xl'}`}>{item.icon}</span>}
                <span className={`${!small && 'font-semibold lg:text-lg'}`}>{item.text}</span>
            </div>
        </label>
    )
}

export default CheckboxButton;