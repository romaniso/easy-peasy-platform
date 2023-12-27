import React from "react";
import ToolTip from "./ToolTip";
import {IDictionaryUnit} from "../interfaces/dictionaryUnit";
import { RiDeleteBinFill } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import {playAudio} from "../utils/playAudio";
import {useRemoveWordFromDictionary} from "../context/ReadingContext";


const DictionaryUnit: React.FC<IDictionaryUnit> = ({word, definition, audio, id}) => {
    const handlePlay = async () => {
        console.log(audio);
        if (audio) {
            await playAudio(audio);
        }
    };

    const removeWord = useRemoveWordFromDictionary();

    return <div className='flex justify-between items-start gap-2 [&:not(:last-of-type)]:border-b dark:border-gray-500 py-2'>
        <div className=''>
            <ToolTip tooltip='Listen to the pronunciation'>
                <p className='mr-2 text-sm font-bold text-orange-500 p-0.5 px-1 border dark:border-gray-500 rounded-md shadow cursor-pointer hover:opacity-75 hover:scale-105 transition-all duration-300' onClick={handlePlay}>{word}</p>
            </ToolTip>
            <p className='inline text-indigo-900 dark:text-indigo-200 text-sm'>{definition}</p>
        </div>
        <div className='translate-y-0.5 flex border-l border-indigo-200 pl-2'>
            <ToolTip tooltip='Edit'>
                <button ><RiEditFill  className='text-xl text-indigo-900 dark:text-indigo-200 hover:scale-125 transition-transform'/></button>
            </ToolTip>
            <ToolTip tooltip='Remove'>
                <button onClick={() => removeWord(id)}><RiDeleteBinFill  className='text-xl text-indigo-900 dark:text-indigo-200 hover:scale-125 transition-transform'/></button>
            </ToolTip>
        </div>

    </div>
}

export default DictionaryUnit;