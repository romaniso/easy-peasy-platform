import React, { useState } from "react";
import { ToolTip } from "./common/ToolTip";
import { IDictionaryUnit } from "../interfaces/dictionaryUnit";
import { RiDeleteBinFill } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import { MdCheck } from "react-icons/md";
import { playAudio } from "../utils/playAudio";
import {
  useEditWordInDictionary,
  useRemoveWordFromDictionary,
} from "../context/ReadingContext";

export const DictionaryUnit = ({
  word,
  definition,
  audio,
  id,
}: IDictionaryUnit): JSX.Element => {
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
  const [editedValue, setEditedValue] = useState(definition);
  const removeWord = useRemoveWordFromDictionary();
  const editWord = useEditWordInDictionary();
  const handlePlay = async () => {
    if (audio) {
      await playAudio(audio);
    }
  };
  const handleEdit = (e: React.FormEvent, wordId: string, newValue: string) => {
    e.preventDefault();
    setIsBeingEdited(!isBeingEdited);
    editWord(wordId, newValue);
  };

  const editionArea: React.ReactElement = (
    <form
      className="basis-full relative"
      onSubmit={(e: React.FormEvent) => handleEdit(e, id, editedValue)}
    >
      <textarea
        id={id}
        name="editedDefinition"
        autoFocus
        defaultValue={definition}
        value={editedValue}
        className="resize-none w-full min-h-[80px] leading-5 border outline-0 focus:border-orange-500 focus:dark:border-orange-500 text-sm text-indigo-600 dark:text-indigo-200 dark:border-gray-500 px-2 py-0.5 dark:bg-stone-900 rounded-md scrollbar scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-400"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setEditedValue(e.target.value)
        }
      />
      <button
        className="absolute bottom-3 right-2.5 bg-indigo-400 p-0.5 w-6 h-6 rounded-full shadow hover:bg-orange-400 transition-colors"
        type="submit"
      >
        <MdCheck className="text-lg text-indigo-50" />
      </button>
    </form>
  );

  return (
    <div className="flex justify-between items-start gap-2 [&:not(:last-of-type)]:border-b dark:border-gray-500 py-3">
      <div className={`${isBeingEdited && "flex basis-full"}`}>
        <ToolTip tooltip="Listen to the pronunciation">
          <p
            className="mr-2 md:text-sm font-bold text-orange-500 p-0.5 px-1 border dark:border-gray-500 rounded-md shadow cursor-pointer hover:opacity-75 hover:scale-105 transition-all duration-300"
            onClick={handlePlay}
          >
            {word}
          </p>
        </ToolTip>
        {isBeingEdited ? (
          editionArea
        ) : (
          <p className="inline text-indigo-900 dark:text-indigo-200 md:text-sm transition-all">
            {definition}
          </p>
        )}
      </div>
      <div className="translate-y-0.5 flex border-l border-indigo-200 pl-2">
        <ToolTip tooltip="Edit">
          <button onClick={() => setIsBeingEdited(!isBeingEdited)}>
            <RiEditFill className="text-xl text-indigo-900 dark:text-indigo-200 hover:scale-125 transition-transform" />
          </button>
        </ToolTip>
        <ToolTip tooltip="Remove">
          <button onClick={() => removeWord(id)}>
            <RiDeleteBinFill className="text-xl text-red-600 dark:text-red-400 hover:scale-125 transition-transform" />
          </button>
        </ToolTip>
      </div>
    </div>
  );
};
