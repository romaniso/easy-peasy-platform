//#region imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useTop from "../hooks/useTop";
import axios from "../api/axios";
import Card from "../components/common/Card";
import Skeleton from "../components/common/Skeleton";
import { Level } from "../types/level";
import { LevelsButtons } from "../components/common/LevelsButtons";
import { decodeAndFormatURL } from "../utils/decodeAndFormatUrl";

interface ExerciseSet {
  _id: string;
  name: string;
  description: string;
  level: Level;
  sectionId: string;
  imgBase64: string;
}
const defaultExerciseSets: ExerciseSet[] = [];

//#endregion
const PreviewPage: React.FC = () => {
  const [sets, setSets] = useState<ExerciseSet[]>(defaultExerciseSets);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLevel, setSelectedLevel] = useState<Level>("All");
  //@TODO: maybe refactor for useParams?
  const { pathname } = useLocation();
  const sectionName: string =
    pathname.charAt(1).toUpperCase() + pathname.slice(2);

  useTop();
  useEffect(() => {
    const getSectionSets = async (): Promise<void> => {
      try {
        const { data } = await axios.get<ExerciseSet[]>(
          `http://localhost:5000/section${pathname}`
        );
        console.log("response data is: ", data);
        setSets(data);
        setIsLoading(false);
      } catch (error) {
        // Consider writing a custom errorHandler
        console.error(error);
      }
    };
    getSectionSets();
  }, [pathname]);

  const contentBeforeMapping =
    selectedLevel !== "All"
      ? sets.filter((set) => set.level === selectedLevel)
      : sets;

  return (
    <div className="my-24 container mx-auto px-4">
      {/*Navigate back. Maybe, "see all categories"*/}
      <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
        {sectionName}
      </h1>
      <LevelsButtons
        onSelect={setSelectedLevel}
        selectedLevel={selectedLevel}
      />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {isLoading && <Skeleton items={4} card />}
        {contentBeforeMapping.map((section, index) => {
          const apiKey = `${decodeAndFormatURL(
            section.level
          )}-${decodeAndFormatURL(section.name)}`;
          console.log(apiKey);

          return (
            <Card
              title={section.name}
              text={section.description}
              key={index}
              image={section.imgBase64}
              buttonTxt="Let's learn"
              link={apiKey}
              badge={section.level}
            />
          );
        })}
      </section>
    </div>
  );
};

export default PreviewPage;
