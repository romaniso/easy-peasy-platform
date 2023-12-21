import React from "react";
import ToolTip from "./ToolTip";
import {IDictionaryUnit} from "../interfaces/dictionaryUnit";

const DictionaryUnit: React.FC<IDictionaryUnit> = ({word, definition}) => {
    return <div className='inline-flex items-start gap-2 [&:not(:last-of-type)]:border-b dark:border-gray-500 py-2'>
        <ToolTip tooltip='Listen to the pronunciation'>
            <p className='text-sm font-bold text-orange-500 p-0.5 px-1 border dark:border-gray-500 rounded-md shadow cursor-pointer hover:opacity-75 hover:scale-105 transition-all duration-300'>{word}</p>
        </ToolTip>
        <p className='text-indigo-900 dark:text-indigo-200 text-sm'>{definition}</p>
    </div>
}

export default DictionaryUnit;