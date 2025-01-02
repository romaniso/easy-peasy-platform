//#region imports
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useTop from "../hooks/useTop";
import { Panel } from "../components/common/Panel";
import { ExerciseSet } from "../components/exercise/ExerciseSet";
import { Cheatsheet } from "../components/exercise/Cheatsheet";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import axios from "../api/axios";
import { Reading } from "../components/exercise/Reading";
import { Skeleton } from "../components/common/Skeleton";
// Types
import { Section } from "../types/section";
import { SingleExercise } from "../interfaces/singleExercise";
import { ICheatsheet } from "../interfaces/cheatsheet";
import { IReading } from "../interfaces/reading";
// Just for a template;
import { RecommendedSection } from "../components/RecommendedSection";
import DictionarySection from "../components/DictionarySection";
import { ReadingContextProvider } from "../context/ReadingContext";
import { SectionType } from "../enums/section";
import { Listening } from "../components/exercise/Listening";
import { IListening } from "../interfaces/listening";
import { IRecommendedPreview } from "../components/RecommendedPreview";
//#endregion

const ExercisePage: React.FC = () => {
  const [section, setSection] = useState<Section | null>(null);
  const [exercises, setExercises] = useState<SingleExercise[] | null>(null);
  const [cheatsheet, setCheatsheet] = useState<ICheatsheet | null>(null);
  const [reading, setReading] = useState<IReading | null>(null);
  const [listening, setListening] = useState<IListening | null>(null);
  const [recommendedSets, setRecommendedSets] = useState<
    IRecommendedPreview[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useTop();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    const setApiKey = decodeURIComponent(pathname.split("/")[2]);
    const getExerciseSet = async () => {
      try {
        const { data } = await axios.get<{
          section: Section;
          exercises: SingleExercise[];
          cheatsheet: ICheatsheet;
          reading: IReading;
          listening: IListening;
        }>(`/exercise/${setApiKey}`);
        const { section, exercises, cheatsheet, reading, listening } = data;

        //@FIXME: useReducer?
        setSection(section);

        if (cheatsheet) {
          setCheatsheet(cheatsheet);
        }
        if (reading) {
          setReading(reading);
        }
        if (listening) {
          setListening(listening);
        }
        if (exercises) {
          setExercises(exercises);
          setIsLoading(false);
        } else {
          console.error("There is no such an exercise set");
          navigate("*");
        }
      } catch (error) {
        console.error("There is no such an exercise set");
        navigate("*");
      }
    };
    getExerciseSet();
  }, [pathname]);
  useEffect(() => {
    const fetchRecommendedSets = async () => {
      const setApiKey = decodeURIComponent(pathname.split("/")[2]);
      try {
        const { data } = await axios.get(
          `http://localhost:5000/exercise/recommended?key=${setApiKey}&section=${section}`
        );
        setRecommendedSets(data.recommendedSets);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecommendedSets();
  }, [section, pathname]);

  const { topic } = useParams();

  //FIXME Do I actually need here conditional rendering? Only one thing which changes is min-h...
  let content;
  if (!isLoading && exercises) {
    switch (section) {
      case SectionType.Grammar:
        content = (
          <Panel className="bg-white flex flex-col lg:flex-row justify-between min-h-[850px] !p-0">
            <ExerciseSet exercises={exercises} />
            {!!cheatsheet && (
              <Cheatsheet
                topic={cheatsheet.topic}
                level={cheatsheet.level}
                content={cheatsheet.markDown}
              />
            )}
          </Panel>
        );
        break;
      case SectionType.Vocabulary:
        content = (
          <Panel className="bg-white flex flex-col lg:flex-row justify-between !p-0">
            <ExerciseSet exercises={exercises} />
            {cheatsheet && (
              <Cheatsheet
                topic={cheatsheet.topic}
                level={cheatsheet.level}
                content={cheatsheet.markDown}
              />
            )}
          </Panel>
        );
        break;
      case SectionType.Reading:
        content = (
          <ReadingContextProvider>
            <Panel className="bg-white flex flex-col lg:flex-row justify-between !p-0">
              <section className="basis-full md:basis-3/4 border-r dark:border-gray-500">
                {!!reading && (
                  <Reading
                    text={reading.markDown}
                    title={reading.topic}
                    level={reading.level}
                    image={reading.image}
                    audioUrl={reading.audioUrl}
                  />
                )}
              </section>
              <DictionarySection />
            </Panel>
            <Panel className="bg-white mt-5">
              <ExerciseSet exercises={exercises} />
            </Panel>
          </ReadingContextProvider>
        );
        break;
      case SectionType.Listening:
        content = (
          <Panel className="bg-white flex flex-col gap-5 !p-0">
            {listening && (
              <Listening
                title={listening.topic}
                description={listening.description}
                level={listening.level}
                image={listening.image}
                audioUrl={listening.audioUrl}
              />
            )}
            <ExerciseSet exercises={exercises} />
          </Panel>
        );
        break;
      default:
        throw new Error("There is no such an exercise section");
    }
  }

  return (
    <div className="my-24 container mx-auto px-4">
      <h1 className="text-4xl md:text-6xl text-center font-bold text-orange-500 drop-shadow mb-6 md:mb-8">
        {topic}
      </h1>
      <Breadcrumbs />
      {isLoading ? <Skeleton items={1} exercise /> : content}
      {recommendedSets && (
        <RecommendedSection recommendedSets={recommendedSets} />
      )}
    </div>
  );
};

export default ExercisePage;
