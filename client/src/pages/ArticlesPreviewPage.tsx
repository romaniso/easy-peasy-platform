import { useEffect } from "react";
import { ArticlesSection } from "../components/articles/ArticlesSection";
import { RecentPreview } from "../components/articles/RecentPreview";

export const ArticlesPreviewPage = () => {
  const data = [
    { section: "Grammar" },
    { section: "Pronunciation" },
    { section: "Vocabulary" },
    // { section: "Recent" },
  ];

  useEffect(() => {
    console.log("Fetching data from BE");
  }, []);

  return (
    <div className="my-24 container mx-auto px-4">
      <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-6">
        Articles
      </h1>
      <div className="flex gap-5 flex-wrap md:flex-nowrap">
        <main className="flex-1 basis-full md:basis-3/4 overflow-hidden">
          {data.map(({ section }) => {
            return <ArticlesSection title={section} />;
          })}
        </main>
        <aside className="flex-1 basis-full md:basis-1/4">
          <h3 className="text-2xl font-bold text-orange-500 drop-shadow mb-2">
            Recent Articles
          </h3>
          <section className="flex flex-col gap-2">
            <RecentPreview
              title="Future Tenses"
              introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
              link="/"
              imgSrc="https://picsum.photos/200"
            />
            <RecentPreview
              title="Future Tenses"
              introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
              link="/"
              imgSrc="https://picsum.photos/200"
            />
            <RecentPreview
              title="Future Tenses"
              introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
              link="/"
              imgSrc="https://picsum.photos/200"
            />
          </section>
        </aside>
      </div>
    </div>
  );
};
