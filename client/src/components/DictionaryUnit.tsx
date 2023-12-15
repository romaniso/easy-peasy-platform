import React from "react";
import ToolTip from "./ToolTip";

interface DictionaryUnit {
    word: string;
    definition: string;
}
const DictionaryUnit: React.FC<DictionaryUnit> = ({word, definition}) => {
    return <div className='inline-flex items-start gap-2 [&:not(:last-of-type)]:border-b dark:border-gray-500 py-2'>
        <ToolTip tooltip='Listen to the pronunciation'>
            <p className='text-sm font-bold text-orange-500 py-0.5 px-1 border dark:border-gray-500 hover:opacity-60 rounded-md shadow cursor-pointer'>{word}</p>

        </ToolTip>
        <p className='text-indigo-900 text-sm'>{definition}</p>
    </div>
}

export default DictionaryUnit;