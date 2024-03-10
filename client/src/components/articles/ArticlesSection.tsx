import { Level } from "../../types/level";
import { useState } from "react";
import { LevelsButtons } from "../common/LevelsButtons";
import { ArticlePreview } from "./ArticlePreview";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Props {
  title: string;
}

export const ArticlesSection = ({ title }: Props) => {
  const [selectedLevel, setSelectedLevel] = useState<Level>("All");
  //  const contentBeforeMapping =
  //    selectedLevel !== "All"
  //      ? sets.filter((set) => set.level === selectedLevel)
  //      : sets;
  return (
    <section className="mb-3">
      <h2 className="text-2xl font-semibold w-full flex items-center justify-center text-indigo-700 dark:text-indigo-300 relative after:[content: ''] after:flex-grow after:basis-10 after:h-1 after:bg-white dark:after:bg-stone-900 after:ml-2 after:mt-[5px] mb-1">
        {title}
      </h2>
      <LevelsButtons
        onSelect={setSelectedLevel}
        selectedLevel={selectedLevel}
      />
      {/* Slider / Swiper*/}

      <div className="mb-4 overflow-hidden rounded-md">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <ArticlePreview
              title="Future Tenses"
              introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
              link="/"
              imgSrc="https://picsum.photos/200"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ArticlePreview
              title="Future Tenses"
              introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
              link="/articles"
              imgSrc="https://picsum.photos/200"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ArticlePreview
              title="Future Tenses"
              introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
              link="/articles"
              imgSrc="https://picsum.photos/200"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ArticlePreview
              title="Future Tenses"
              introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
              link="/articles"
              imgSrc="https://picsum.photos/200"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ArticlePreview
              title="Future Tenses"
              introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
              link="/articles"
              imgSrc="https://picsum.photos/200"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ArticlePreview
              title="Future Tenses"
              introduction="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, ratione."
              link="/articles"
              imgSrc="https://picsum.photos/200"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
