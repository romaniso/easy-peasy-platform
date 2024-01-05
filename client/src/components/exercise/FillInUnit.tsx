import React from "react";

interface FillInUnitProps {
    unit: string;
    index: number;
    onChange: (index: number, value: string) => void;
}
const FillInUnit: React.FC<FillInUnitProps> = ({unit, index, onChange}) => {

    return (
        <span className='-mt-0.5'>
            {unit.split("***").map((part, partIndex) => {
                let renderedPart: React.ReactElement = <span key={'renderedPart-' + index}>{part}</span>;
                const HINT_DIVIDER = '(';
                if(part.includes(HINT_DIVIDER)){
                    const partArr: string[] = part.split(HINT_DIVIDER);
                    renderedPart = <span key={'renderedPart-' + index}>{partArr[0]}<span className='italic ml-1 text-orange-500 font-thin leading-8'>{HINT_DIVIDER}{partArr[1]}</span></span>
                }
                //Conditional Render
                const inputPart = (
                    <span key={`${'input-' + partIndex} ${index}`}>
                    <input
                        className="text-xl p-1 border dark:border-gray-500 dark:bg-stone-800 rounded-md shadow-inner text-indigo-800 dark:text-indigo-200 outline-none"
                        key={index}
                        name="selection"
                        type="text"
                        autoComplete="off"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(index, e.target.value)}
                    />
                        {" "}
                        {renderedPart}
                </span>
                );
                return partIndex === 1 ? (
                    inputPart
                ) : (
                    renderedPart
                );
            })}
        </span>
    )
}

export default FillInUnit;