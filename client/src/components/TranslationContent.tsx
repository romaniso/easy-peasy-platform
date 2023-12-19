import {BsFillVolumeDownFill} from "react-icons/bs";
import React from "react";

interface TranslationContentProps {
    audio: string;
    transcription: string;
    definitions: string[][];
}
const TranslationContent: React.FC<TranslationContentProps> = ({audio, transcription, definitions}) => {
    return <article>
        <header className='flex justify-between mb-1'>
            <h5>Translation</h5>
            <button className='cursor-pointer'><BsFillVolumeDownFill className='text-lg'/></button>
        </header>
        <main className='flex flex-col justify-between items-start'>
            <p className='opacity-60'><span>part of speech</span> <span>{transcription}</span></p>
            <ul className=''>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
            </ul>
        </main>
    </article>
}

export default TranslationContent;