import React, { useEffect, useMemo, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const pageSize = 5;
  //  const { start, end } = usePagination({ totalCount, pageSize, currentPage });

  const axiosPrivate = useAxiosPrivate();
  const { user } = useUser();
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

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);
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
