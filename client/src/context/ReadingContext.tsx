import React, {useState, createContext, ReactNode} from "react";
import {IDictionaryUnit} from "../interfaces/dictionaryUnit";

interface IDictionaryContext {
    selectedWords: IDictionaryUnit[];
    addWordToDictionary: (newSelectedWord: IDictionaryUnit) => void;
}
const useDictionary = (): IDictionaryContext => {
    const [selectedWords, setSelectedWords] = useState<IDictionaryUnit[]>([])

    return {
        selectedWords,
        addWordToDictionary: (newSelectedWord: IDictionaryUnit) => setSelectedWords([...selectedWords, newSelectedWord])
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