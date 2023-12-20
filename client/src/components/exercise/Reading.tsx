import React, {ReactNode} from "react";
import ReactMarkdown, { Components } from 'react-markdown';
import {hasPunctuation} from "../../utils/hasPunctuationSign";
import useLookUpWord from "../../hooks/useLookUpWord";
import ToolTip from "../ToolTip";

interface ReadingProps {
    text: string;
    title: string;
    image: string;
    level: string;
}

const Reading: React.FC<ReadingProps> = ({ text, title, image, level }) => {
    const {selectedWords, handleSelectedWords, getDictionaryData} = useLookUpWord();

    const renderWord = (word: string, index: number): ReactNode => {
        if (hasPunctuation(word)) {
            const punctuationSign = word.slice(-1);
            const partWithoutPunctuationSign = word.slice(0, -1);
            return (
                <ToolTip tooltip={partWithoutPunctuationSign as string} translation key={index}>
                    <span key={index}>
                      <span
                          className='hover:text-xl hover:text-indigo-500 hover:font-bold transition-all duration-200 cursor-pointer hover:-m-1.5 hover:bg-orange-300 dark:hover:bg-white z-10'
                      >
                        {partWithoutPunctuationSign}
                      </span>
                      <span>{punctuationSign}&nbsp;</span>
                    </span>

                </ToolTip>
            );
        } else {
            return (
                <ToolTip tooltip={word as string} translation key={index}>
                    <>
                        <span
                            key={index}
                            className='hover:text-xl hover:text-indigo-500 hover:font-bold transition-all duration-200 cursor-pointer hover:-m-1.5 hover:bg-orange-300 dark:hover:bg-white z-10'
                        >
                        {word}
                        </span>
                        <span>&nbsp;</span>
                    </>
                </ToolTip>
            );
        }
    };
    const renderWords = (wordsArr: string[]): ReactNode[] => wordsArr.map((word, index) => renderWord(word, index));

    const renderChildren = (children: ReactNode | ReactNode[]) =>
        Array.isArray(children) ? children.map((el) => (typeof el === 'string' ? renderWords(el.split(' ')) : el)) : renderWords((children as string).split(' '));

    const components: Partial<Components> = {
        p: ({ children }) => <p>{renderChildren(children)}</p>,
        strong: ({ children }) => (
            <ToolTip tooltip={children as string} translation>
                <strong
                    className='hover:text-xl hover:text-indigo-500 hover:font-bold transition-all duration-200 cursor-pointer hover:-m-1.5 hover:bg-orange-300 dark:hover:bg-white z-10'
                >
                    {children}
                </strong>
            </ToolTip>
        ),
    };

    return (
        <div className='flex flex-col'>
            <header className='bg-cover bg-center bg-no-repeat min-h-[10px] overflow-hidden rounded-t-md' style={{ backgroundImage: `url(${image})` }}>
                <div className='w-full h-full py-2 px-6 backdrop-brightness-[40%] flex flex-col justify-center gap-2'>
                    <h1 className='text-5xl font-bold text-orange-500 drop-shadow text-center tracking-widest'>{title}</h1>
                    <section>
                        <span className='border border-indigo-300 rounded-md text-indigo-300 text-2xl inline-block w-10 h-10 text-center'>{level}</span>
                    </section>
                </div>
            </header>
            <ReactMarkdown className='markdown-reading' components={components}>
                {text}
            </ReactMarkdown>
        </div>
    );
};

export default Reading;
