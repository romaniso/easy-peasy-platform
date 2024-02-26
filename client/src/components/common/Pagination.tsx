import React from "react";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: () => void;
  siblingCount?: number;
}

export const Pagination: React.FC<PaginationProps> = () => {
  return <div>Pagination</div>;
};
