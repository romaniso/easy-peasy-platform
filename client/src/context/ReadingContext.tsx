import React, {createContext, ReactNode, useContext, useState} from "react";
import {IDictionaryUnit} from "../interfaces/dictionaryUnit";
import {ToastType} from "../enums/toast";

interface IDictionaryContext {
    isHeadingsOpened: boolean;
    selectedWords: IDictionaryUnit[];
    addWordToDictionary: (newSelectedWord: IDictionaryUnit) => ToastType;
    removeWordFromDictionary: (wordId: string) => void;
    editWordInDictionary: (wordId: string, newValue: string) => void;
    openHeadings: () => void;
}
const useDictionary = (): IDictionaryContext => {
    const [isHeadingsOpened, setIsHeadingsOpened] = useState(false);
    const [selectedWords, setSelectedWords] = useState<IDictionaryUnit[]>([])
    const addWordToDictionary = (newSelectedWord: IDictionaryUnit): ToastType => {
        const isWordAlreadyAdded = selectedWords.some(word =>
            word.word === newSelectedWord.word
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

    const editWordInDictionary = (wordId: string, newValue: string): void => {
        const {word, id, audio} = selectedWords.find((word) => word.id === wordId) as IDictionaryUnit;
        const updatedSelectedWords: IDictionaryUnit[] = selectedWords.map((selectedWord) => {
            if(selectedWord.id === wordId) return {word, id, audio, definition: newValue};
            else return selectedWord;
        })
        setSelectedWords(updatedSelectedWords);
    }
    const openHeadings = (): void => {
        setIsHeadingsOpened(true);
    }

    return {
        isHeadingsOpened,
        selectedWords,
        addWordToDictionary,
        removeWordFromDictionary,
        editWordInDictionary,
        openHeadings
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
export const useIsHeadingsOpened = () => useContext(ReadingContext as React.Context<IDictionaryContext>).isHeadingsOpened;
export const useAddWordToDictionary = () => useContext(ReadingContext as React.Context<IDictionaryContext>).addWordToDictionary;
export const useRemoveWordFromDictionary = () => useContext(ReadingContext as React.Context<IDictionaryContext>).removeWordFromDictionary;
export const useEditWordInDictionary = () => useContext(ReadingContext as React.Context<IDictionaryContext>).editWordInDictionary;
export const useOpenHeadings = () => useContext(ReadingContext as React.Context<IDictionaryContext>).openHeadings;