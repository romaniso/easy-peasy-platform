import React, { useState } from "react";
import DictionaryUnit from "./DictionaryUnit";
import { MdOutlineEditNote } from "react-icons/md";
import { useSelectedWords } from "../context/ReadingContext";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Button } from "./common/Button";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUser from "../hooks/useUser";
import { useToast } from "../context/ToastContext";
import { ToastType } from "../enums/toast";
//import { useTranslation } from "react-i18next";

const ADD_MULTIPLE_WORDS_URL = "glossary/add-multiple";

const DictionarySection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedWords = useSelectedWords();

  const axiosPrivate = useAxiosPrivate();
  const { user } = useUser();
  const toast = useToast();
  //  const { t } = useTranslation("profile");

  const handleSave = async () => {
    if (user.username) {
      console.log(selectedWords);
      try {
        const response = await axiosPrivate.post(
          ADD_MULTIPLE_WORDS_URL,
          { words: selectedWords, username: user.username },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          toast?.open("Words have been successfully saved", ToastType.Success);
        }
      } catch (err) {
        console.error(err);
        toast?.open(
          "Oops, something went wrong. Try again.",
          ToastType.Failure
        );
      }
    } else {
      toast?.open(
        "You need to be logged in to be able to save words.",
        ToastType.Failure
      );
    }
  };

  return (
    <aside
      className={`basis-full md:basis-1/4 px-3 lg:px-4 py-4 lg:py-4 relative transition-all duration-700 ${
        isExpanded ? "lg:min-w-[600px] lg:w-1/2" : "lg:max-w-[400px]"
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="invisible lg:visible text-lg border dark:border-gray-500 rounded shadow-md text-indigo-900 dark:text-indigo-200 p-4 absolute -top-2 left-0 bg-white dark:bg-stone-800 hover:bg-indigo-50 hover:dark:bg-[#202020] transition-colors -translate-x-1/2 z-10"
      >
        {isExpanded ? <BsChevronCompactRight /> : <BsChevronCompactLeft />}
      </button>
      <header className="flex items-center justify-center gap-2">
        <h3 className="text-xl md:text-2xl font-bold mb-1 text-indigo-500 drop-shadow">
          Dictionary List{" "}
        </h3>
        <MdOutlineEditNote className="text-indigo-500 text-2xl md:text-3xl drop-shadow" />
      </header>
      <ul className="mt-2 md:mt-6">
        {!!selectedWords &&
          selectedWords.map(({ id, word, definition, audio }) => (
            <DictionaryUnit
              word={word}
              definition={definition}
              audio={audio}
              key={id}
              id={id}
            />
          ))}
      </ul>
      {selectedWords.length ? null : (
        <p className="text-base text-orange-500 bg-stone-50 dark:bg-[#484848] shadow-inner p-3 mb-5 rounded-lg">
          Add a word to Dictionary list by hovering on it and pressing "add"
          button. Then you will be able to save new words to Your Dictionary
        </p>
      )}
      {selectedWords.length ? (
        <div className="flex justify-end mt-5">
          <Button
            primary
            rounded
            small
            className="w-full md:w-auto"
            onClick={handleSave}
          >
            Save to Your Dictionary
          </Button>
        </div>
      ) : null}
    </aside>
  );
};

export default DictionarySection;
