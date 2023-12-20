import {BsFillVolumeDownFill} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import {TranslationContentData} from "../interfaces/TranslationContentData";

interface TranslationContentProps {
    word: string;
    fetchedData?: TranslationContentData
}
const TranslationContent: React.FC<TranslationContentProps> = ({word, fetchedData}) => {
    // const [tooltipData, setTooltipData] = useState<TranslationContentData | null>(null);

    // useEffect(() => {
    //     setTooltipData(fetchedData as TranslationContentData);
    // },[tooltipData])
    return <article>
        <header className='flex justify-between'>
            <h5>{word}</h5>
            <button className='cursor-pointer'><BsFillVolumeDownFill className='text-lg'/></button>
        </header>
        {fetchedData && <main className=''>
            <p className='opacity-60'><span>{fetchedData.transcription}</span></p>
            {fetchedData.definitions.map((definitionsArr, arrIndex) => {
                return <ul className='border-b py-2' key={arrIndex}>{definitionsArr
                    .map((definition, defIndex) => <li className='mb-2' key={defIndex}>{definition}</li>)
                }</ul>
            })}
        </main>}
    </article>
}

export default TranslationContent;