import React, {useState} from "react";
import DictionaryUnit from "./DictionaryUnit";
import { MdOutlineEditNote } from "react-icons/md";
import {useSelectedWords} from "../context/ReadingContext";
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";
import Button from "./Button";

const DictionarySection: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const selectedWord = useSelectedWords();

    return <aside className={`basis-full md:basis-1/4 px-3 lg:px-4 py-4 lg:py-4 relative transition-all duration-700 ${isExpanded ? 'lg:min-w-[600px] lg:w-1/2' : 'lg:max-w-[400px]'}`}>
        <button onClick={() => setIsExpanded(!isExpanded)} className='invisible lg:visible text-lg border dark:border-gray-500 rounded shadow-md text-indigo-900 dark:text-indigo-200 p-4 absolute -top-2 left-0 bg-white dark:bg-stone-800 hover:bg-indigo-50 hover:dark:bg-[#202020] transition-colors -translate-x-1/2 z-10'>
            {isExpanded ? <BsChevronCompactRight/> : <BsChevronCompactLeft/>}
        </button>
        <header className='flex items-center justify-center gap-2'>
            <h3 className='text-xl md:text-2xl font-bold mb-1 text-indigo-500 drop-shadow'>Dictionary List </h3>
            <MdOutlineEditNote className='text-indigo-500 text-2xl md:text-3xl drop-shadow'/>
        </header>
        <ul className='mt-2 md:mt-6'>
            {!!selectedWord && selectedWord. map(({id, word, definition, audio}) =>  <DictionaryUnit word={word} definition={definition} audio={audio} key={id} id={id}/>)}
        </ul>
        {selectedWord.length ? <div className='flex justify-end mt-5'>
            <Button primary rounded small >Save to Your Dictionary</Button>
        </div> : null}
    </aside>
}

export default DictionarySection;