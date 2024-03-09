import { LevelsButtons } from "../components/common/LevelsButtons";
import { ArticlePreview } from "../components/articles/ArticlePreview";
import { useState } from "react";
import { Level } from "../types/level";

export const ArticlesPreviewPage = () => {
  const [selectedLevel, setSelectedLevel] = useState<Level>("All");

  //  const contentBeforeMapping =
  //    selectedLevel !== "All"
  //      ? sets.filter((set) => set.level === selectedLevel)
  //      : sets;
  return (
    <div className="my-24 container mx-auto px-4">
      <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-6">
        Articles
      </h1>
      <div className="flex gap-5">
        <main className="flex-1 basis-3/4">
          <section className="mb-3">
            <h2 className="text-2xl font-semibold w-full flex items-center justify-center text-indigo-700 dark:text-indigo-300 relative after:[content: ''] after:flex-grow after:basis-10 after:h-1 after:bg-white dark:after:bg-stone-900 after:ml-2 after:mt-[5px] mb-1">
              Grammar
            </h2>
            <LevelsButtons
              onSelect={setSelectedLevel}
              selectedLevel={selectedLevel}
            />
            {/* Slider / Swiper*/}
            <div className="flex justify-between gap-4 mb-4">
              <ArticlePreview
                title="Future Tenses"
                introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
                link="/articles"
                imgSrc="https://placehold.co/80x100"
              />
              <ArticlePreview
                title="Past Tenses"
                introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
                link="/articles"
                imgSrc="https://placehold.co/80x100"
              />
              <ArticlePreview
                title="To be"
                introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
                link="/articles"
                imgSrc="https://placehold.co/80x100"
              />
              <ArticlePreview
                title="Used to"
                introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
                link="/articles"
                imgSrc="https://placehold.co/80x100"
              />
            </div>
          </section>
          <section className="mb-3">
            <h2 className="text-2xl font-semibold w-full flex items-center justify-center text-indigo-700 dark:text-indigo-300 relative after:[content: ''] after:flex-grow after:basis-10 after:h-1 after:bg-white dark:after:bg-stone-900 after:ml-2 after:mt-[5px] mb-4">
              Pronunciation
            </h2>
          </section>
          <section>
            <h2 className="text-2xl font-semibold w-full flex items-center justify-center text-indigo-700 dark:text-indigo-300 relative after:[content: ''] after:flex-grow after:basis-10 after:h-1 after:bg-white dark:after:bg-stone-900 after:ml-2 after:mt-[5px] mb-4">
              Vocabulary
            </h2>
          </section>
        </main>
        <aside className="flex-1 basis-1/4 bg-indigo-500/10">
          Aside Recent Articles
        </aside>
      </div>
    </div>
  );
};