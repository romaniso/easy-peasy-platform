import React, { useEffect, useState } from "react";
import { GlossaryItem } from "./GlossaryItem";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useUser from "../../hooks/useUser";
import { Glossaryitem } from "../../enums/glossaryItem";

interface GlossaryListProps {
  start: number;
  end: number;
}

const GLOSSARY_URL = "users/words";
export const GlossaryList: React.FC<GlossaryListProps> = ({
  start = 1,
  end,
}) => {
  const [data, setData] = useState<Glossaryitem[]>([]);

  const axiosPrivate = useAxiosPrivate();
  const { user } = useUser();
  //Here is a paginaation logics
  useEffect(() => {
    const url = `${GLOSSARY_URL}/${user.username}`;

    (async () => {
      try {
        const response = await axiosPrivate.get(url, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setData(response.data);
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const renderedGlossaryItems = data.map((item) => (
    <GlossaryItem
      key={item.id}
      word={item.word}
      definition={item.definition}
      audio={item.audio}
    />
  ));

  return (
    <div className="flex-grow flex flex-col gap-3 h-full !overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-orange-300 dark:scrollbar-thumb-stone-800 scrollbar-track-white dark:scrollbar-track-stone-900">
      {renderedGlossaryItems}
    </div>
  );
};
