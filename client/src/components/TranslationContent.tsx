import {BsFillVolumeDownFill} from "react-icons/bs";
import React from "react";
import {TranslationContentData} from "../interfaces/translationContentData";
import Button from "./Button";
import {LuCopyPlus} from "react-icons/lu";
import ToolTip from "./ToolTip";
import {useAddWordToDictionary} from "../context/ReadingContext";
import {useToast} from "../context/ToastContext";
import {ToastType} from "../enums/toast";
import {v4 as uuid} from 'uuid';
import {playAudio} from "../utils/playAudio";

interface TranslationContentProps {
    word: string;
    fetchedData: TranslationContentData
}
const TranslationContent: React.FC<TranslationContentProps> = ({word, fetchedData}) => {
    const addWord = useAddWordToDictionary();
    const toast = useToast();
    const handleClick = (selectedWord: string) => {
        const addedWord = {
            id: uuid(),
            word: selectedWord,
            definition:  fetchedData.definitions[0][0],
            audio: fetchedData.audio,
        }
        const status: ToastType = addWord(addedWord);
        if(status === ToastType.Success){
            toast?.open('Your word has been successfully added!', status);
        } else if(status === ToastType.Failure) {
            toast?.open('You have already added this word!', status);
        }
    }
    const handlePlay = async () => {
        if (fetchedData && fetchedData.audio) {
            await playAudio(fetchedData.audio);
        }
    };
    return <span className='text-indigo-50'>
        <span className='flex justify-between flex-wrap'>
            <dt className='font-bold'>{word}{fetchedData &&<span className='opacity-80 ml-2 font-light'>{fetchedData.transcription}</span>}</dt>
            {fetchedData && fetchedData.audio && <button
                className='cursor-pointer'
                onClick={handlePlay}
            >
                <BsFillVolumeDownFill className='text-lg'/>
            </button>}
        </span>
        {fetchedData && <span>
            {fetchedData.definitions.map((definitionsArr, arrIndex) => {
                return <span className='block border-white/50 py-2' key={arrIndex}>{definitionsArr
                    .map((definition, defIndex) => <dd className='block mb-2' key={defIndex}>{definition}</dd>)
                }</span>
            })}
            <ToolTip secondary tooltip='Add to Dictionary List'>
                <Button secondary outline small
                        onClick={() => handleClick(word)}>
                    <span>add<LuCopyPlus className='text-sm ml-2 inline align-baseline'/></span>
                </Button>
            </ToolTip>
        </span>}
    </span>
}

export default TranslationContent;