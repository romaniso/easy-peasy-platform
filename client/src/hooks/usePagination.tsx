import { useMemo } from "react";

interface Props {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  //  onPageChange: () => void;
  siblingCount?: number;
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: Props) => {
  const paginationRange = useMemo(() => {
    // Our implementation logic will go here
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
