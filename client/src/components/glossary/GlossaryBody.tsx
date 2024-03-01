import React, { useEffect, useState } from "react";
import { GlossaryList } from "./GlossaryList";
import { GlossaryCount } from "./GlossaryCount";
import { Pagination } from "../common/Pagination";
//import { usePagination } from "../../hooks/usePagination";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useUser from "../../hooks/useUser";
import { Glossaryitem } from "../../enums/glossaryItem";

interface GlossaryBodyProps {
  sorted?: null | string;
}

const GLOSSARY_URL = "users/words";
export const GlossaryBody: React.FC<GlossaryBodyProps> = ({ sorted }) => {
  const [data, setData] = useState<Glossaryitem[]>([]);
  //Pagination
  const [currentData, setCurrentData] = useState<Glossaryitem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const pageSize = 10;

  //  const { start, end } = usePagination({ totalCount, pageSize, currentPage });

  const axiosPrivate = useAxiosPrivate();
  const { user } = useUser();

  const sortByAlphabet = (): void => {
    const newData = [...data];
    newData.sort((wordA, wordB) => {
      if (wordA.word.toLowerCase() < wordB.word.toLowerCase()) return -1;
      if (wordA.word.toLowerCase() > wordB.word.toLowerCase()) return 1;
      return 0;
    });

    setCurrentData(newData);
  };

  const sortByMarked = (): void => {
    const newData = [...data];

    setCurrentData(newData.filter((word) => word.marked));
  };

  const sortByRecent = (): void => {
    const newData = [...data];

    setCurrentData(newData.reverse());
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

  useEffect(() => {
    if (sorted) {
      switch (sorted) {
        case "abc":
          sortByAlphabet();
          break;
        case "recent":
          sortByRecent();
          break;
        case "marked":
          sortByMarked();
          break;
      }
    }
  }, [sorted]);

  return (
    <div className="!overflow-y-auto flex-grow flex flex-col gap-4 items-stretch">
      <div className="flex justify-between">
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
