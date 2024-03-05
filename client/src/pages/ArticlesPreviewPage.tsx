import React from "react";
import { Link } from "react-router-dom";

export const ArticlesPreviewPage = () => {
  return (
    <div className="my-24 container mx-auto px-4">
      <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
        Articles
      </h1>
      <div className="flex gap-5">
        <main className="flex-1 basis-3/4">
          <section className="mb-3">
            <h2 className="text-2xl font-semibold w-full flex items-center justify-center text-indigo-700 relative after:[content: ''] after:flex-grow after:basis-10 after:h-1 after:bg-white after:ml-2 after:mt-[5px] mb-4">
              Grammar
            </h2>
            {/* Slider / Swiper*/}
            <div className="flex justify-between gap-4">
              <article className="basis-1/4 flex-shrink group hover:scale-95 transition-transform duration-200">
                <Link to="/">
                  <img
                    src="https://placehold.co/80x100"
                    alt=""
                    className="w-full rounded-md shadow-sm"
                  />
                  <h3 className="text-lg text-indigo-700 font-semibold mb-1">
                    lorem lorem
                  </h3>
                  <p className="text-sm text-indigo-900 mb-2 group-hover:underline">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Provident, iste.
                  </p>
                  <p className="text-orange-500 text-lg hover:underline">
                    Read
                  </p>
                </Link>
              </article>
              <article className="basis-1/4 flex-shrink group hover:scale-95 transition-transform duration-200">
                <Link to="/">
                  <img
                    src="https://placehold.co/80x100"
                    alt=""
                    className="w-full rounded-md shadow-sm"
                  />
                  <h3 className="text-lg text-indigo-700 font-semibold mb-1">
                    lorem lorem
                  </h3>
                  <p className="text-sm text-indigo-900 mb-2 group-hover:underline">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Provident, iste.
                  </p>
                  <p className="text-orange-500 text-lg hover:underline">
                    Read
                  </p>
                </Link>
              </article>
              <article className="basis-1/4 flex-shrink group hover:scale-95 transition-transform duration-200">
                <Link to="/">
                  <img
                    src="https://placehold.co/80x100"
                    alt=""
                    className="w-full rounded-md shadow-sm"
                  />
                  <h3 className="text-lg text-indigo-700 font-semibold mb-1">
                    lorem lorem
                  </h3>
                  <p className="text-sm text-indigo-900 mb-2 group-hover:underline">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Provident, iste.
                  </p>
                  <p className="text-orange-500 text-lg hover:underline">
                    Read
                  </p>
                </Link>
              </article>
              <article className="basis-1/4 flex-shrink group hover:scale-95 transition-transform duration-200">
                <Link to="/">
                  <img
                    src="https://placehold.co/80x100"
                    alt=""
                    className="w-full rounded-md shadow-sm"
                  />
                  <h3 className="text-lg text-indigo-700 font-semibold mb-1">
                    lorem lorem
                  </h3>
                  <p className="text-sm text-indigo-900 mb-2 group-hover:underline">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Provident, iste.
                  </p>
                  <p className="text-orange-500 text-lg hover:underline">
                    Read
                  </p>
                </Link>
              </article>
            </div>
          </section>
          <section className="mb-3">
            <h2 className="text-2xl font-semibold w-full flex items-center justify-center text-indigo-700 relative after:[content: ''] after:flex-grow after:basis-10 after:h-1 after:bg-white after:ml-2 after:mt-[5px]">
              Pronunciation
            </h2>
          </section>
          <section>
            <h2 className="text-2xl font-semibold w-full flex items-center justify-center text-indigo-700 relative after:[content: ''] after:flex-grow after:basis-10 after:h-1 after:bg-white after:ml-2 after:mt-[5px]">
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
