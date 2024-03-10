import { ArticlesSection } from "../components/articles/ArticlesSection";

export const ArticlesPreviewPage = () => {
  const data = [
    { section: "Grammar" },
    { section: "Pronunciation" },
    { section: "Vocabulary" },
    // { section: "Recent" },
  ];

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
        <aside className="flex-1 basis-full md:basis-1/4 bg-indigo-500/10">
          Aside Recent Articles
        </aside>
      </div>
    </div>
  );
};
