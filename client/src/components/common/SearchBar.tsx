import { Icon, IconType } from "./icon/Icon";

interface SearchBarProps {
  placeholder: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({
  placeholder,
  onChange,
}: SearchBarProps): JSX.Element => {
  return (
    <div className="flex w-full items-center rounded-md dark:bg-transparent border dark:border-indigo-500/50 border-indigo-100 px-2 md:px-4 py-2">
      <Icon
        className="dark:text-indigo-300 text-indigo-800 text-lg block float-left cursor-pointer mr-2"
        type={IconType.Search}
      />
      <input
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="search"
        className="text-base bg-transparent w-full text-indigo-900 dark:text-indigo-200 placeholder:dark:text-indigo-300/50 placeholder:text-indigo-900/50 focus:outline-none"
      />
    </div>
  );
};
