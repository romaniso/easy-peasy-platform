import React, { useEffect, useState } from "react";
import { GlossaryList } from "./GlossaryList";
import { GlossaryCount } from "./GlossaryCount";
import { Pagination } from "../common/Pagination";
//import { usePagination } from "../../hooks/usePagination";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useUser from "../../hooks/useUser";
import { Glossaryitem } from "../../enums/glossaryItem";

const GLOSSARY_URL = "users/words";
export const GlossaryBody: React.FC = () => {
  const [data, setData] = useState<Glossaryitem[]>([]);
  //Pagination
  const [currentData, setCurrentData] = useState<Glossaryitem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const pageSize = 10;

  //Sort by
  //@TODO: turn strings into enums
  const [sorted, setSorted] = useState<null | "abc" | "marked" | "recent">(
    null
  );

  //Search
  const [searchPhrase, setSearchPhrase] = useState("");
  //  const { start, end } = usePagination({ totalCount, pageSize, currentPage });

  const axiosPrivate = useAxiosPrivate();
  const { user } = useUser();

  const sortByAlphabet = (): void => {
    const words = [...data];
    words.sort((wordA, wordB) => {
      if (wordA.word.toLowerCase() < wordB.word.toLowerCase()) return -1;
      if (wordA.word.toLowerCase() > wordB.word.toLowerCase()) return 1;
      return 0;
    });

    setCurrentData(words);
  };

  const sortByMarked = (): void => {
    const words = [...data];

    setCurrentData(words.filter((word) => word.marked));
  };

  useEffect(() => {
    const url = `${GLOSSARY_URL}/${user.username}`;

    (async () => {
      try {
        const response = await axiosPrivate.get(url, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setData(response.data);
          setTotalCount(response.data.length);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrentData(data.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, data]);

  return (
    <div className="!overflow-y-auto flex-grow flex flex-col gap-4 items-stretch">
      <div className="flex justify-between">
        <button onClick={sortByAlphabet}>SORT ABC</button>
        <button onClick={sortByMarked}>SORT MARKED</button>
        <GlossaryCount />
        <Pagination
          totalCount={totalCount as number}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
      <GlossaryList data={currentData} />
    </div>
  );
};
