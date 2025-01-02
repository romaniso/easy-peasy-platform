import { useEffect, useState } from "react";
import { ArticlesSection } from "../components/articles/ArticlesSection";
import axios from "../api/axios";
import { useTop } from "../hooks/useTop";
import { AsideSection } from "../components/articles/AsideSection";
import { Loader } from "../components/common/Loader";

const ARTICLES_URL = "/articles";

export const ArticlesPreviewPage = (): JSX.Element => {
  //@TODO: Where is types? PreviewSectionData
  const [data, setData] = useState<[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useTop();

  useEffect(() => {
    (async () => {
      try {
        const data = (await axios.get(ARTICLES_URL)).data;
        setData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="my-24 container mx-auto px-4">
      <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-6">
        Articles
      </h1>
      <div className="flex gap-5 flex-wrap md:flex-nowrap">
        <main className="flex-1 basis-full md:basis-3/4 overflow-hidden">
          {data?.map(({ section, data }) => {
            if (section !== "recent")
              return (
                <ArticlesSection title={section} data={data} key={section} />
              );
          })}
        </main>
        {data?.map(({ section, data }) => {
          if (section === "recent")
            return (
              <AsideSection key={section} data={data} title="Recent Articles" />
            );
        })}
      </div>
    </div>
  );
};
