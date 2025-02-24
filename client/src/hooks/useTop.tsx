import { useEffect } from "react";

export const useTop = () => {
  useEffect((): void => {
    window.scrollTo(0, 0);
  }, []);
};
