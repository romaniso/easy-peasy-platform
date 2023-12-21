import React, {useState, createContext, useContext, ReactNode} from "react";
import {IDictionaryUnit} from "../interfaces/dictionaryUnit";

interface IDictionaryContext {
    selectedWords: IDictionaryUnit[];
    addWordToDictionary: (newSelectedWord: IDictionaryUnit) => void;
}
const useDictionary = (): IDictionaryContext => {
    const [selectedWords, setSelectedWords] = useState<IDictionaryUnit[]>([])
    const addWordToDictionary = (newSelectedWord: IDictionaryUnit): void => {
        const isWordAlreadyAdded = selectedWords.some(word =>
            word.word === newSelectedWord.word && word.definition === newSelectedWord.definition
        );

        if (isWordAlreadyAdded) {
            console.error('You have already added this word');
        } else {
            setSelectedWords([...selectedWords, newSelectedWord]);
        }
    };

    return {
        selectedWords,
        addWordToDictionary,
    }
}

const ReadingContext = createContext<IDictionaryContext | undefined>(undefined);

interface ReadingContextProviderProps {
    children: ReactNode;
}
export const ReadingContextProvider: React.FC<ReadingContextProviderProps>  = ({children}) => (
    <ReadingContext.Provider value={useDictionary()}>
        {children}
    </ReadingContext.Provider>
)

export const useSelectedWords = () => useContext(ReadingContext as React.Context<IDictionaryContext>).selectedWords;
export const useAddWordToDictionary = () => useContext(ReadingContext as React.Context<IDictionaryContext>).addWordToDictionary;