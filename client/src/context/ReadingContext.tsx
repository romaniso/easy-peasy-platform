import React, {createContext, ReactNode, useContext, useState} from "react";
import {IDictionaryUnit} from "../interfaces/dictionaryUnit";
import {ToastType} from "../enums/toast";

interface IDictionaryContext {
    selectedWords: IDictionaryUnit[];
    addWordToDictionary: (newSelectedWord: IDictionaryUnit) => ToastType;
    removeWordFromDictionary: (wordId: string) => void;
}
const useDictionary = (): IDictionaryContext => {
    const [selectedWords, setSelectedWords] = useState<IDictionaryUnit[]>([])
    const addWordToDictionary = (newSelectedWord: IDictionaryUnit): ToastType => {
        const isWordAlreadyAdded = selectedWords.some(word =>
            word.word === newSelectedWord.word && word.definition === newSelectedWord.definition
        );
        if (isWordAlreadyAdded) {
            console.error('You have already added this word');
            return ToastType.Warning;
        } else {
            setSelectedWords([...selectedWords, newSelectedWord]);
            console.log(selectedWords);
            return ToastType.Success;
        }
    };

    const removeWordFromDictionary = (wordId: string): void => {
        const updatedSelectedWords: IDictionaryUnit[] = selectedWords.filter((word) => word.id !== wordId);
        setSelectedWords(updatedSelectedWords);
    }

    return {
        selectedWords,
        addWordToDictionary,
        removeWordFromDictionary,
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
export const useRemoveWordFromDictionary = () => useContext(ReadingContext as React.Context<IDictionaryContext>).removeWordFromDictionary;