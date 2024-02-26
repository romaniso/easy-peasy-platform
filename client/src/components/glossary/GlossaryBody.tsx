import React from "react";
import { GlossaryList } from "./GlossaryList";
import { GlossaryCount } from "./GlossaryCount";
import { Pagination } from "../common/Pagination";

export const GlossaryBody: React.FC = () => {
  return (
    <div className="!overflow-y-auto flex-grow flex flex-col gap-4 items-stretch">
      <div className="flex justify-between">
        <GlossaryCount />
        <Pagination totalCount={20} currentPage={1} pageSize={5} />
      </div>
      <GlossaryList />
    </div>
  );
};
