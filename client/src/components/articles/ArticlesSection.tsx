import { Level } from "../../types/level";
import { useEffect, useState } from "react";
import { LevelsButtons } from "../common/LevelsButtons";
import { ArticlePreview } from "./ArticlePreview";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { PreviewArticle } from "../../types/previewArticle";

interface Props {
  title: string;
  data: PreviewArticle[];
}

export const ArticlesSection = ({ title, data }: Props) => {
  const [selectedLevel, setSelectedLevel] = useState<Level>("All");
  const [selectedData, setSelectedData] = useState(data);
  useEffect(() => {
    const contentBeforeMapping =
      selectedLevel !== "All"
        ? data.filter((set) => set.level === selectedLevel)
        : data;
    setSelectedData(contentBeforeMapping);
  }, [selectedLevel, data]);

  return (
    <section className="mb-3">
      <h2 className="text-2xl font-semibold w-full flex items-center justify-center text-indigo-700 dark:text-indigo-300 relative after:[content: ''] after:flex-grow after:basis-10 after:h-1 after:bg-white dark:after:bg-stone-900 after:ml-2 after:mt-[5px] mb-1">
        {title[0].toUpperCase() + title.substring(1)}
      </h2>
      <LevelsButtons
        onSelect={setSelectedLevel}
        selectedLevel={selectedLevel}
      />
      <div className="mb-4 overflow-hidden rounded-md">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 3,
            },
          }}
        >
          {selectedData.map(
            ({ id, img, introduction, level, section, title }) => {
              return (
                <SwiperSlide key={id}>
                  <ArticlePreview
                    title={title}
                    introduction={introduction}
                    link="/"
                    imgSrc={img}
                  />
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      </div>
    </section>
  );
};
