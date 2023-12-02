//#region imports
import useTop from "../hooks/useTop";
import Card from "../components/Card";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import CardSkeleton from "../components/CardSkeleton";
//#endregion
function PreviewPage() {
    const [sets, setSets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {pathname} = useLocation();
    let sectionName = pathname.charAt(1).toUpperCase() + pathname.slice(2);

    useTop();
    useEffect(() => {
        const getSectionSets = async () => {
            try {
                const {data} = await axios.get(`/section${pathname}`);
                setSets(data);
                setIsLoading(false);
            } catch (error) {
                throw new Error('There is no such a section');
            }
        };
        getSectionSets();
    }, []);


    return (
        <div className="my-24 container mx-auto px-4">
            <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
                {sectionName}
            </h1>
            <section className="flex justify-start flex-wrap items-stretch gap-12">
                {isLoading && <CardSkeleton cards={4}/>}
                {sets.map((section, index) => {
                    return <>
                        <Card
                            title={section.name}
                            text={section.description}
                            key={index}
                            image={section.image}
                            buttonTxt="Let's learn"
                            /* I need to create abstraction layer/object instance/model */
                            link={section.name}
                            badge={section.level}
                        />

                    </>
                })}
            </section>
        </div>
    );
}

export default PreviewPage;
