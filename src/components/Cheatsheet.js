import DOMPurify from "dompurify";
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import {useState} from "react";
import ToolTip from "./ToolTip";

function Cheatsheet({ topic, level, content }) {
    const [isExpanded, setIsExpanded] = useState(true);
  const sanitizedHTML = DOMPurify.sanitize(content);

  return (
    <section className={`border-l dark:border-l-gray-500 transition-all duration-700 ${isExpanded ? 'lg:min-w-[600px] lg:w-1/2' : 'lg:max-w-[400px]'}  relative`}>
        {/*<ToolTip tooltip={isExpanded ? 'Collapse' : 'Extend'}>*/}
            <button onClick={() => setIsExpanded(!isExpanded)} className='invisible lg:visible text-lg border dark:border-gray-500 rounded shadow-md text-indigo-900 dark:text-indigo-200 p-4 absolute -top-2 left-0 bg-white dark:bg-[#323232] hover:bg-indigo-50 hover:dark:bg-[#202020] transition-colors -translate-x-1/2 z-10'>
                {isExpanded ? <BsChevronCompactRight/> : <BsChevronCompactLeft/>}
            </button>
        {/*</ToolTip>*/}

        <div className={`lg:gradient-blur px-3 lg:px-12 py-4 lg:py-10 lg:h-[1200px] transition-all overflow-y-auto ${!isExpanded && 'lg:blur-sm hover:blur-none '} scrollbar scrollbar-thin scrollbar-thumb-orange-300 dark:scrollbar-thumb-orange-500 scrollbar-track-indigo-50 dark:scrollbar-track-[#323232] w-full`}>
            <header>
                <h3 className="text-2xl md:text-xl font-bold text-indigo-800 dark:text-indigo-100 mb-3">Cheatsheet</h3>
                <p className="text-2xl md:text-3xl font-bold text-indigo-400 dark:text-indigo-200 mb-3">{topic}</p>
            </header>
            <div
                className="text-indigo-900 dark:text-indigo-200 text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
        </div>

    </section>
  );
}

export default Cheatsheet;
