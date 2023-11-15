import DOMPurify from "dompurify";
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import {useState} from "react";
import ToolTip from "./ToolTip";

function Cheatsheet({ topic, level, content }) {
    const [isExpanded, setIsExpanded] = useState(true);
  const sanitizedHTML = DOMPurify.sanitize(content);

  return (
    <section className={`border-l transition-all duration-700 ${isExpanded ? 'lg:min-w-[750px] lg:max-w-[750px]' : 'lg:max-w-[400px]'}  relative`}>
        {/*<ToolTip tooltip={isExpanded ? 'Collapse' : 'Extend'}>*/}
            <button onClick={() => setIsExpanded(!isExpanded)} className='invisible lg:visible text-lg border rounded shadow-md text-indigo-900 p-4 absolute -top-2 left-0 bg-white hover:bg-indigo-50 transition-colors -translate-x-1/2 z-10'>
                {isExpanded ? <BsChevronCompactRight/> : <BsChevronCompactLeft/>}
            </button>
        {/*</ToolTip>*/}

        <div className={`gradient-blur px-3 lg:px-12 py-4 lg:py-10 lg:h-[1000px] transition-all overflow-y-auto ${!isExpanded && 'lg:blur-sm hover:blur-none'} scrollbar scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-indigo-50 w-full`}>
            <header>
                <h3 className="text-2xl md:text-xl font-bold text-indigo-800 mb-3">Cheatsheet</h3>
                <p className="text-2xl md:text-3xl font-bold text-indigo-400 mb-3">{topic}</p>
            </header>
            <div
                className="text-indigo-900 text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
        </div>

    </section>
  );
}

export default Cheatsheet;
