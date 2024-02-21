import React from "react";
import { GlossaryList } from "./GlossaryList";

export const GlossaryBody: React.FC = () => {
  return (
    <div className="!overflow-y-auto flex-grow flex flex-col gap-4 items-stretch">
      <div className="flex justify-between">
        <div className="bg-gray-400">Count</div>
        <div className="bg-gray-400">Paggination</div>
      </div>
      <GlossaryList />
    </div>
  );
};
