import {useState} from "react";
import axios from "axios";

type Phonetic = {
    text: string;
    audio?: string;
};

type Definition = {
    definition: string;
    example: string;
    synonyms: string[];
    antonyms: string[];
};

type Meaning = {
    partOfSpeech: string;
    definitions: Definition[];
};

type WordData = {
    word: string;
    phonetic: string;
    phonetics?: Phonetic[];
    origin?: string;
    meanings: Meaning[];
};

interface ParsedDictionaryData {
    audio?: string;
    transcription: string;
    definitions: string[][];

}

const useLookUpWord = () => {
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const handleSelectedWords = (newSelectedWord: string): void => {
        if(selectedWords.includes(newSelectedWord)) return;
        const updatedSelectedWords = [...selectedWords, newSelectedWord]
        setSelectedWords(updatedSelectedWords);
    };
    const getDictionaryData = async (selectedUnit: string): Promise<ParsedDictionaryData> => {
        const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
        const res = await axios.get<WordData[]>(`${url}${selectedUnit}`)
        const {data} = res
        const {meanings, phonetics} = data[0];
        const allDefinitions: Array<string[]> = meanings.map((meaning) => meaning.definitions.map(({definition}) => definition));
        const {text, audio} = (phonetics as Phonetic[])[0];

        return {
            audio,
            transcription: text,
            definitions: allDefinitions,
        };
    }

    return {
        selectedWords,
        handleSelectedWords,
        getDictionaryData,
    };
}

export default useLookUpWord;