import { useMemo } from "react";

interface PaginationRange {
  start: number;
  end: number;
}

interface Props {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: Props): PaginationRange => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const start = Math.max(1, currentPage - siblingCount);
  const end = Math.min(totalPages, currentPage + siblingCount);

  return useMemo(() => {
    return { start, end };
  }, [totalCount, pageSize, siblingCount, currentPage]);
};
