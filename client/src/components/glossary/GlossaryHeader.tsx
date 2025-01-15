import { Select } from "../common/Select";
import { SearchBar } from "../common/SearchBar";
import { useTranslation } from "react-i18next";
import { Icon, IconType } from "../common/icon/Icon";

interface GlossaryHeaderProps {
  onSort: (sortable: string) => void;
  onSearh: (searchPhrase: string) => void;
}

export const GlossaryHeader = ({
  onSort,
  onSearh,
}: GlossaryHeaderProps): JSX.Element => {
  const { t } = useTranslation("glossary");
  const sortibles = [
    {
      value: "abc",
      label: t("sortBar.abc"),
      icon: <Icon type={IconType.ByAlphabet} />,
    },
    {
      value: "recent",
      label: t("sortBar.recent"),
      icon: <Icon type={IconType.Recent} />,
    },
    {
      value: "marked",
      label: t("sortBar.marked"),
      icon: <Icon type={IconType.Star} />,
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
