import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const Pagination = ({
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  siblingCount = 1,
}: PaginationProps): JSX.Element | null => {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null; // Hide pagination if there is only one page

  const rangeStart = Math.max(1, currentPage - siblingCount);
  const rangeEnd = Math.min(totalPages, currentPage + siblingCount);

  const pages = [];
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center text-lg gap-2 text-indigo-900 dark:text-indigo-300">
      <button
        className={`${currentPage === 1 && "opacity-50"}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <BsChevronLeft />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-2 rounded-md transition-colors duration-200 ${
            currentPage === page
              ? "bg-indigo-500/10 dark:bg-black/30 dark:border dark:border-indigo-500/50 dark:text-orange-500 px-2 rounded-md"
              : "hover:bg-indigo-500/10 dark:hover:bg-black/30"
          }`}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button
        className={`${currentPage === totalPages && "opacity-50"}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <BsChevronRight />
      </button>
    </div>
  );
};
