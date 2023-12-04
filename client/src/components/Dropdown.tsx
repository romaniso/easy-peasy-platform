import { useState, useRef, useEffect } from "react";
import { CiCircleChevDown } from "react-icons/ci";
import Panel from "./Panel";

function Dropdown({ options, value, onChange }) {
  const [isOpened, setIsOpened] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target)) {
        setIsOpened(false);
      }
    };
    document.addEventListener("click", handler, true);

    return () => document.removeEventListener("click", handler);
  }, []);

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  const handleChange = (option) => {
    setIsOpened(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-sky-100 p-3 transition-colors"
        onClick={() => handleChange(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });
  return (
    <div className="w-48 relative" ref={divEl}>
      <Panel
        className="flex justify-between items-center cursor-pointer"
        onClick={handleClick}
      >
        {value?.label || "Select..."}
        <CiCircleChevDown className="text-lg" />
      </Panel>
      {isOpened && (
        <Panel className="absolute top-full cursor-pointer">
          {renderedOptions}
        </Panel>
      )}
    </div>
  );
}

export default Dropdown;
