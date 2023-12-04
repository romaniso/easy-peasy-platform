import { useState } from "react";
import { CiCircleChevDown, CiCircleChevLeft } from "react-icons/ci";

function Accordion({ items }) {
  const [extendedIndex, setExtendedIndex] = useState(-1);
  const handleClick = (nextIndex) => {
    setExtendedIndex((current) => {
      if (current === nextIndex) {
        return -1;
      } else {
        return nextIndex;
      }
    });
  };

  const renderedItems = items.map((item, index) => {
    const icon =
      extendedIndex === index ? (
        <CiCircleChevDown className="text-xl" />
      ) : (
        <CiCircleChevLeft className="text-xl" />
      );
    return (
      <div key={index}>
        <div
          className="flex justify-between p-3 items-center bg-orange-50 border-b cursor-pointer text-sky-800 font-bold"
          onClick={() => handleClick(index)}
        >
          {item.label}
          {icon}
        </div>
        {extendedIndex === index && (
          <div className="p-5 border-b">{item.content}</div>
        )}
      </div>
    );
  });

  return <div className="border rounded shadow">{renderedItems}</div>;
}

export default Accordion;
