import React from "react";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  siblingCount = 1,
}) => {
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
    <div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
