import React from "react";
import DictionaryUnit from "./DictionaryUnit";
import { MdOutlineEditNote } from "react-icons/md";

interface DictionaryUnit {
    word: string;
    definition: string;
}
interface DictionarySectionProps {
    units: DictionaryUnit[];
}
const DictionarySection: React.FC<DictionarySectionProps> = ({units}) => {
    return <aside className='basis-full md:basis-1/4 px-3 lg:px-4 py-4 lg:py-4'>
        <header className='flex items-center gap-2'>
            <h3 className='text-xl md:text-2xl font-bold mb-1 text-indigo-500 drop-shadow'>Dictionary List </h3>
            <MdOutlineEditNote className='text-indigo-500 text-2xl md:text-3xl'/>
        </header>
        <ul className='mt-2 md:mt-6'>
            {units && units. map(({word, definition}, index) =>  <DictionaryUnit word={word} definition={definition}/>)}
        </ul>
    </aside>
}

export default DictionarySection;