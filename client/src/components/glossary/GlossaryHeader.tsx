import React from "react";
import Select from "../common/Select";
import { FaSortAlphaDown } from "react-icons/fa";
import { PiClockCountdownLight } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { SearchBar } from "../common/SearchBar";
import { useTranslation } from "react-i18next";

interface GlossaryHeaderProps {
  onSort: (sortable: string) => void;
  onSearh: (searchPhrase: string) => void;
}

export const GlossaryHeader: React.FC<GlossaryHeaderProps> = ({
  onSort,
  onSearh,
}) => {
  const { t } = useTranslation("glossary");
  const sortibles = [
    {
      value: "abc",
      label: t("sortBar.abc"),
      icon: <FaSortAlphaDown />,
    },
    {
      value: "recent",
      label: t("sortBar.recent"),
      icon: <PiClockCountdownLight />,
    },
    {
      value: "marked",
      label: t("sortBar.marked"),
      icon: <FaStar />,
    },
  ];

  return (
    <div className="flex md:justify-between gap-5">
      <div className="flex-shrink md:flex-grow-0 md:basis-1/4">
        <SearchBar
          placeholder={t("searchBar.placeholder")}
          onChange={onSearh}
        />
      </div>
      <div className="basis-1/2 md:basis-auto">
        <Select
          defaultText={t("sortBar.placeholder")}
          options={sortibles}
          onChange={onSort}
        />
      </div>
    </div>
  );
};
