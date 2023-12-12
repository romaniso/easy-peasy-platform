import React, {SyntheticEvent, useEffect, useState} from "react";
import {BsFillVolumeDownFill} from "react-icons/bs";
import {LuCopyPlus} from "react-icons/lu";
import ToolTip from "./ToolTip";
import { useSpeechSynthesis, SpeechSynthesisVoice } from "react-speech-kit";

interface FlashcardProps {
    question: string;
    isCorrect: string;
    cardImage: string;
    example: string;
}
const Flashcard: React.FC<FlashcardProps> = ({question, isCorrect, cardImage, example}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [generalAmericanVoice, setGeneralAmericanVoice] = useState<SpeechSynthesisVoice | null>(null);
    const { voices, speak } = useSpeechSynthesis();

    useEffect(() => {
        if (voices && voices.length > 0) {
            const voice: SpeechSynthesisVoice = voices.find((v: SpeechSynthesisVoice) => v.name === "Google US English");
            setGeneralAmericanVoice(voice || null);
        }
    }, [voices]);
    const playAudio = (e: SyntheticEvent) => {
        e.stopPropagation();
        if (generalAmericanVoice) {
            speak({text: isCorrect, generalAmericanVoice});
        }
    };

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const saveCard = (e: SyntheticEvent) => {
        e.stopPropagation();
        setIsSaved(!isSaved);
    }

    const cardClasses = `flex-grow flip-card ${
        isFlipped ? "flipped" : ""
    } min-w-[250px] min-h-[280px] xl:max-w-[310px] cursor-pointer hover:scale-105 transition-all duration-700`;
    const saveBtnClasses = `absolute text-2xl right-2 top-2 w-8 h-8 flex justify-center items-center rounded-md shadow-md transition-colors ${
        isSaved ? "bg-orange-600 hover:bg-orange-500" : "bg-black/30 hover:bg-black"
    }`

    return (
        <div className={cardClasses} onClick={flipCard}>
            <div className="flip-card-inner shadow-md rounded-md border dark:border-gray-500">
                <div className="flip-card-front text-center flex flex-col justify-between items-center">
                    <div className="h-1/2 flex justify-center items-center">
                        <p className="px-2 py-4 text-indigo-800 dark:text-indigo-200 font-bold">{question}</p>
                    </div>
                    <div className="w-full bg-stone-700 dark:bg-[#202020] h-1/2 flex justify-center items-center rounded-b-md">
                        <p className="px-2 py-4 text-white dark:text-orange-600">{example}</p>
                    </div>
                </div>
                <div className="flip-card-back flex flex-col items-center rounded-md relative">
                    <div className={saveBtnClasses} onClick={saveCard}>
                        <ToolTip tooltip={!isSaved && "Save the card to my Vocabulary"}>
                            <LuCopyPlus className='text-white'/>
                        </ToolTip>
                    </div>
                    <img src={cardImage} alt="" className="w-full h-24 md:h-28 object-cover rounded-t-md"/>
                    <div className="basis-2/3 p-2 w-full flex flex-col justify-around items-start text-left">
                        <ToolTip tooltip={"Listen to the pronunciation"}>
                            <div
                                className="flex items-center cursor-pointer hover:opacity-50 transition-all"
                                onClick={playAudio}
                            >
                                <p className="text-base md:text-lg text-indigo-700 dark:text-indigo-200 font-bold drop-shadow-md">
                                    {isCorrect}
                                </p>
                                <BsFillVolumeDownFill className="text-orange-500 ml-1 text-lg"/>
                            </div>
                        </ToolTip>
                        <div>
                            <p className="mb-2 text-indigo-900 dark:text-indigo-300">{question}</p>
                            <p className="text-sm italic text-indigo-500 dark:text-indigo-400">{example}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Flashcard;