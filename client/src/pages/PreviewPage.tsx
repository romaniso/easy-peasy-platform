//#region imports
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import useTop from "../hooks/useTop";
import axios from "axios";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
interface ExerciseSet {
    _id: string;
    name: string;
    description: string;
    level: Level;
    sectionId: string;
    image: string;
}
const defaultExerciseSets:ExerciseSet[] = [];

//#endregion
const PreviewPage: React.FC = () => {
    const [sets, setSets] = useState<ExerciseSet[]>(defaultExerciseSets);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {pathname} = useLocation();
    const sectionName: string = pathname.charAt(1).toUpperCase() + pathname.slice(2);

    useTop();
    useEffect( () => {
        const getSectionSets = async (): Promise<void> =>  {
            try {
                const {data, status}   = await axios.get<ExerciseSet[]>(`http://localhost:5000/section${pathname}`);
                console.log('response status is: ', status);
                setSets(data);
                setIsLoading(false);
            } catch (error) {
                // Consider writing a custom errorHandler
                console.error(error);
                throw new Error('There is no such a section');
            }
        };
        getSectionSets();
    }, [pathname]);


    return (
        <div className="my-24 container mx-auto px-4">
            {/*Navigate back. Maybe, "see all categories"*/}
            <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
                {sectionName}
            </h1>
            <section className="flex justify-start flex-wrap items-stretch gap-12">
                {isLoading && <Skeleton items={4} card/>}
                {sets.map((section, index) => {
                    return <Card
                                title={section.name}
                                text={section.description}
                                key={index}
                                image={section.image}
                                buttonTxt="Let's learn"
                                link={section.name}
                                badge={section.level}
                            />
                })}
            </section>
        </div>
    );
}

export default PreviewPage;