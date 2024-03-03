import React, { FormEvent, useState } from "react";
import { PiMusicNotesFill } from "react-icons/pi";
import { MdCheck, MdEdit } from "react-icons/md";
import { FaRegTrashCan, FaStar } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { playAudio } from "../../utils/playAudio";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useUser from "../../hooks/useUser";

interface GlossaryItemProps {
  id: string;
  word: string;
  definition: string;
  audio?: string;
  marked: boolean;
  updateData: () => void;
}
const GLOSSARY_URL = "glossary/";
export const GlossaryItem: React.FC<GlossaryItemProps> = ({
  id,
  word,
  definition,
  audio,
  marked,
  updateData,
}) => {
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
  const [editedValue, setEditedValue] = useState(definition);

  const axiosPrivate = useAxiosPrivate();
  const { user } = useUser();

  const handlePlay = async () => {
    if (audio) {
      await playAudio(audio);
    }
  };
  const handleEdit = async (event: FormEvent) => {
    event.preventDefault();
    (async () => {
      const url = `${GLOSSARY_URL}/edit/${user.username}/${id}`;
      try {
        const response = await axiosPrivate.patch(
          url,
          {
            definition: editedValue,
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          updateData();
          console.log(`Word with ID ${id} has been successfully edited.`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsBeingEdited(false);
      }
    })();
  };
  const handleRemove = async () => {
    (async () => {
      const url = `${GLOSSARY_URL}/remove/${user.username}/${id}`;
      try {
        const response = await axiosPrivate.delete(url, {
          withCredentials: true,
        });
        if (response.status === 200) {
          updateData();
          console.log(`Word with ID ${id} was removed.`);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };
  const handleMark = async () => {
    (async () => {
      const url = `${GLOSSARY_URL}/mark/${user.username}/${id}`;
      try {
        const response = await axiosPrivate.patch(url, {
          withCredentials: true,
        });
        if (response.status === 200) {
          updateData();
          console.log(
            `Mark of word with ID ${id} has been successfully toggled.`
          );
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const editionArea: React.ReactElement = (
    <form className="basis-full relative" onSubmit={handleEdit}>
      <textarea
        id={id}
        name="editedDefinition"
        autoFocus
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
    <div className="flex-1 flex flex-wrap gap-2 border boder-indigo-50 dark:bg-stone-900 dark:border-indigo-500/50 rounded-md py-2 px-3 shadow-sm">
      <div className="basis-full md:basis-1/6 flex flex-col relative">
        <div className="text-lg text-orange-600 drop-shadow-sm flex gap-1">
          {marked && (
            <FaStar className="text-orange-300 flex-shrink-0 mt-1.5" />
          )}
          <span className="">{word}</span>
        </div>
        {/*<span className="text-sm text-indigo-900 dark:text-indigo-300">
          /ˈpleɪsˌhoʊl.dɚ/
        </span>*/}
        {audio && (
          <div className="flex gap-2 text-sm">
            <span
              className="flex items-center gap-0.5 font-semibold text-indigo-900 dark:text-indigo-300 cursor-pointer hover:scale-110 transition-transform"
              onClick={handlePlay}
            >
              UK <PiMusicNotesFill />
            </span>
            <span
              className="flex items-center gap-0.5 font-semibold text-indigo-900 dark:text-indigo-300 cursor-pointer hover:scale-110 transition-transform"
              onClick={handlePlay}
            >
              US <PiMusicNotesFill />
            </span>
          </div>
        )}
        <button className="absolute right-0 top-0 translate-y-1/2 text-lg md:hidden text-orange-500">
          <HiOutlineDotsVertical />
        </button>
      </div>
      <div className="flex-1">
        {isBeingEdited ? (
          editionArea
        ) : (
          <span className="text-indigo-900 dark:text-indigo-300">
            {definition}
          </span>
        )}

        {/*<ol className="list-decimal pl-5 text-indigo-900 dark:text-indigo-300">
          <li className="mb-2">
            <span className="inline-block font-thin bg-indigo-50 dark:bg-indigo-500 dark:text-white px-1 py-0.5 rounded-md shadow-sm">
              MATHEMATICS
            </span>
            <span className="block">
              a significant zero in the decimal representation of a number.
            </span>
            <span className="italic">
              A placeholder variable p represents the result of a computation in
              progress.
            </span>
          </li>
          <li>
            <span className="inline-block font-thin bg-indigo-50 px-1 py-0.5 rounded-md">
              LINGUISTICS
            </span>
            <span className="block">
              an element of a sentence that is required by syntactic constraints
              but carries little or no semantic information, for example the
              word it as a subject in it is a pity that she left, where the true
              subject is that she left.
            </span>
            <span className="italic">
              Currently we are using a stock image we found as a placeholder.
            </span>
          </li>
        </ol>*/}
      </div>
      <div className="flex-shrink basis-1/6 hidden md:flex justify-between items-start gap-1">
        <button
          className="flex items-center bg-red-500 hover:opacity-80 text-white text-sm p-1 rounded-md shadow-sm gap-1"
          onClick={handleRemove}
        >
          Remove <FaRegTrashCan />
        </button>
        <button
          className="flex items-center bg-indigo-500 hover:opacity-80 text-white text-sm p-1 rounded-md shadow-sm gap-1"
          onClick={() => setIsBeingEdited(!isBeingEdited)}
        >
          Edit <MdEdit />
        </button>
        <button
          className="flex items-center bg-orange-500 hover:opacity-80 text-white text-sm p-1 rounded-md shadow-sm gap-1"
          onClick={handleMark}
        >
          Star <FaStar />
        </button>
      </div>
    </div>
  );
};
