//#region imports
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import useTop from "../hooks/useTop";
import axios from "axios";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import {Level} from "../types/level";
import Button from "../components/Button";

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
    const [sortedLevel, setSortedLevel] = useState<Level | null>(null);
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

    const contentBeforeMapping = sortedLevel ? sets.filter(set => set.level === sortedLevel) : sets;

    return (
        <div className="my-24 container mx-auto px-4">
            {/*Navigate back. Maybe, "see all categories"*/}
            <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
                {sectionName}
            </h1>
            <section className='flex justify-end gap-1 mb-2'>
                <Button primary outline rounded small onClick={() => setSortedLevel(null)}>all</Button>
                <Button primary outline rounded small onClick={() => setSortedLevel('A1')}>A1</Button>
                <Button primary outline rounded small onClick={() => setSortedLevel('A2')}>A2</Button>
                <Button primary outline rounded small onClick={() => setSortedLevel('B1')}>B1</Button>
                <Button primary outline rounded small onClick={() => setSortedLevel('B2')}>B2</Button>
                <Button primary outline rounded small onClick={() => setSortedLevel('C1')}>C1</Button>
                <Button primary outline rounded small onClick={() => setSortedLevel('C2')}>C2</Button>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {isLoading && <Skeleton items={4} card/>}
                {contentBeforeMapping.map((section, index) => {
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