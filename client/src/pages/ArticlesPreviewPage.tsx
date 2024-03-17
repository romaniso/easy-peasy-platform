import { useEffect, useState } from "react";
import { ArticlesSection } from "../components/articles/ArticlesSection";
import axios from "../api/axios";
import { RecentSection } from "../components/articles/RecentSection";

const ARTICLES_URL = "/articles";

export const ArticlesPreviewPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = (await axios.get(ARTICLES_URL)).data;
      setData(data);
      setIsLoading(false);
      console.log(data);
    })();
  }, []);

  return (
    <div className="my-24 container mx-auto px-4">
      <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-6">
        Articles
      </h1>
      <div className="flex gap-5 flex-wrap md:flex-nowrap">
        <main className="flex-1 basis-full md:basis-3/4 overflow-hidden">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            data.map(({ section, data }) => {
              if (section !== "recent")
                return (
                  <ArticlesSection title={section} data={data} key={section} />
                );
            })
          )}
        </main>
        <aside className="flex-1 basis-full md:basis-1/4">
          <h3 className="text-2xl font-bold text-orange-500 drop-shadow mb-2">
            Recent Articles
          </h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            data.map(({ section, data }) => {
              if (section === "recent")
                return <RecentSection key={section} data={data} />;
            })
          )}
        </aside>
      </div>
    </div>
  );
};
