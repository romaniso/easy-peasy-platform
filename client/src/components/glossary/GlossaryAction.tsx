import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit } from "react-icons/md";

interface GlossaryActionProps {
  onRemove: () => void;
  onMark: () => void;
  onEdit: () => void;
}

export default function GlossaryAction({
  onRemove,
  onMark,
  onEdit,
}: GlossaryActionProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const glossaryActionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!glossaryActionRef.current) return;
      if (!glossaryActionRef.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    };
    document.addEventListener("click", handleOutsideClick, true);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);
  const handleRemove = () => {
    onRemove();
    setIsOpened(false);
  };

  const handleEdit = () => {
    onEdit();
    setIsOpened(false);
  };
  const handleMark = () => {
    onMark();
    setIsOpened(false);
  };

  return (
    <div className="relative" ref={glossaryActionRef}>
      <HiOutlineDotsVertical
        className={`
               ${isOpened ? "text-indigo-950" : "text-orange-500"}
               text-lg md:hidden relative z-10
           `}
        onClick={() => setIsOpened(!isOpened)}
      />
      {isOpened && (
        <div className="flex flex-col items-start gap-0.5 absolute -top-2 -right-1 bg-indigo-50 py-1.5 pl-2 pr-7 shadow-md">
          <button
            className="flex items-center text-indigo-950 dark:text-white text-sm gap-1 mb-1"
            onClick={handleRemove}
          >
            Remove <FaRegTrashCan />
          </button>
          <button
            className="flex items-center text-indigo-950 dark:text-white text-sm gap-1 mb-1"
            onClick={handleEdit}
          >
            Edit <MdEdit />
          </button>
          <button
            className="flex items-center text-indigo-950 dark:text-white text-sm gap-1 mb-1"
            onClick={handleMark}
          >
            Star <FaStar />
          </button>
        </div>
      )}
    </div>
  );
}
