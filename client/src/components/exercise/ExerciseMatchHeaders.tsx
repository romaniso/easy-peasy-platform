import { useOpenHeadings } from "../../context/ReadingContext";
import { useToast } from "../../context/ToastContext";
import React, { useEffect } from "react";
import { UserResultEnums } from "../../enums/userResult";
import { ToastType } from "../../enums/toast";
import { UserResult } from "../../types/userResult";

interface ExerciseMatchHeadersProps {
  children: React.ReactElement;
  results: UserResult[] | null;
}

export const ExerciseMatchHeaders = ({
  children,
  results,
}: ExerciseMatchHeadersProps): JSX.Element => {
  const openHeadings = useOpenHeadings();
  const toast = useToast();
  useEffect(() => {
    if (results) {
      const isAllHeadingsMatched = results.every(
        (result) => result === UserResultEnums.Success
      );
      if (isAllHeadingsMatched) {
        openHeadings();
        toast?.open("You have opened all headings!", ToastType.Success);
      }
    }
  }, [results]);
  return children;
};
