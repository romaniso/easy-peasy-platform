import React from "react";
import DictionaryUnit from "./DictionaryUnit";
import { MdOutlineEditNote } from "react-icons/md";
import {IDictionaryUnit} from "../interfaces/dictionaryUnit";

interface DictionarySectionProps {
    units: IDictionaryUnit[];
}
const DictionarySection: React.FC<DictionarySectionProps> = ({units}) => {
    return <aside className='basis-full md:basis-1/4 px-3 lg:px-4 py-4 lg:py-4'>
        <header className='flex items-center justify-center gap-2'>
            <h3 className='text-xl md:text-2xl font-bold mb-1 text-indigo-500 drop-shadow'>Dictionary List </h3>
            <MdOutlineEditNote className='text-indigo-500 text-2xl md:text-3xl drop-shadow'/>
        </header>
        <ul className='mt-2 md:mt-6'>
            {!!units && units. map(({word, definition}, index) =>  <DictionaryUnit word={word} definition={definition} key={index}/>)}
        </ul>
    </aside>
}

export default DictionarySection;