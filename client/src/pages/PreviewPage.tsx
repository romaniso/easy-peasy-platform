//#region imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useTop from "../hooks/useTop";
import axios from "axios";
import Card from "../components/common/Card";
import Skeleton from "../components/common/Skeleton";
import { Level } from "../types/level";
import {LevelsButtons} from "../components/common/LevelsButtons";

interface ExerciseSet {
  _id: string;
  name: string;
  description: string;
  level: Level;
  sectionId: string;
  image: string;
}
const defaultExerciseSets: ExerciseSet[] = [];

//#endregion
const PreviewPage: React.FC = () => {
  const [sets, setSets] = useState<ExerciseSet[]>(defaultExerciseSets);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  //@TODO: maybe refactor for useParams?
  const { pathname } = useLocation();
  const sectionName: string =
    pathname.charAt(1).toUpperCase() + pathname.slice(2);

  useTop();
  useEffect(() => {
    const getSectionSets = async (): Promise<void> => {
      try {
        const { data, status } = await axios.get<ExerciseSet[]>(
          `http://localhost:5000/section${pathname}`
        );
        console.log("response status is: ", status);
        setSets(data);
        setIsLoading(false);
      } catch (error) {
        // Consider writing a custom errorHandler
        console.error(error);
        throw new Error("There is no such a section");
      }
    };
    getSectionSets();
  }, [pathname]);

  const contentBeforeMapping = selectedLevel
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
          return (
            <Card
              title={section.name}
              text={section.description}
              key={index}
              image={section.image}
              buttonTxt="Let's learn"
              link={section.name}
              badge={section.level}
            />
          );
        })}
      </section>
    </div>
  );
};

export default PreviewPage;
