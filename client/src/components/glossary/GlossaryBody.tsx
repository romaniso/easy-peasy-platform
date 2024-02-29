import React from "react";
import { GlossaryList } from "./GlossaryList";
import { GlossaryCount } from "./GlossaryCount";
import { Pagination } from "../common/Pagination";
import { usePagination } from "../../hooks/usePagination";

export const GlossaryBody: React.FC = () => {
  const totalCount = 20; // Example total count, replace with your actual total count
  const pageSize = 5; // Example page size, replace with your actual page size
  const currentPage = 1; // Example current page, replace with your actual current page
  const { start, end } = usePagination({ totalCount, pageSize, currentPage }); // Call the usePagination hook

  return (
    <div className="!overflow-y-auto flex-grow flex flex-col gap-4 items-stretch">
      <div className="flex justify-between">
        <GlossaryCount />
        <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
      <GlossaryList start={start} end={end} />
    </div>
  );
};
