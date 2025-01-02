import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";

const STATS_URL = "/stats";

interface GlossaryCountProps {
  count: number;
}

export const GlossaryCount = ({ count }: GlossaryCountProps): JSX.Element => {
  const [glossaryLimit, setGlossaryLimit] = useState<number | null>(null);

  const axiosPrivate = useAxiosPrivate();
  const { user } = useUser();
  useEffect(() => {
    (async () => {
      const url = `${STATS_URL}/${user.username}`;
      const response = await axiosPrivate.get(url, {
        withCredentials: true,
      });

      const { vocabularyLimit } = response.data.stats;

      setGlossaryLimit(vocabularyLimit);
    })();
  }, []);
  return (
    <div className="text-lg text-indigo-900 dark:text-indigo-300">
      <span>{count} </span>/<span> {glossaryLimit}</span>
    </div>
  );
};
