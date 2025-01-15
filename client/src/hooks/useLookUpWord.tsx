import { useCallback, useState } from "react";
import axios from "axios";
import { TranslationContentData } from "../interfaces/translationContentData";

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

export const useLookUpWord = () => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [fetchedData, setFetchedData] = useState<TranslationContentData>();
  const handleSelectedWords = (newSelectedWord: string): void => {
    if (selectedWords.includes(newSelectedWord)) return;
    const updatedSelectedWords = [...selectedWords, newSelectedWord];
    setSelectedWords(updatedSelectedWords);
  };
  const getDictionaryData = useCallback(
    async (selectedUnit: string): Promise<ParsedDictionaryData | null> => {
      const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
      try {
        const res = await axios.get<WordData[]>(`${url}${selectedUnit}`);
        const { data } = res;
        const { meanings, phonetics } = data[0];
        const allDefinitions: Array<string[]> = meanings.map((meaning) =>
          meaning.definitions.map(({ definition }) => definition)
        );
        const { text, audio } = (phonetics as Phonetic[])[0];
        setFetchedData({
          audio,
          transcription: text,
          definitions: allDefinitions,
        });

        return {
          audio,
          transcription: text,
          definitions: allDefinitions,
        };
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    [fetchedData]
  );

  return {
    selectedWords,
    handleSelectedWords,
    getDictionaryData,
    fetchedData,
  };
};
