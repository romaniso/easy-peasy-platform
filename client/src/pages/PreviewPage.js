//#region imports
import useTop from "../hooks/useTop";
import Card from "../components/Card";
import RelationshipsImg from "../assets/images/vocabulary/realtionships.jpg";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
//#endregion
function PreviewPage() {
    const [sets, setSets] = useState(null);
    const {pathname} = useLocation();
    let sectionName = pathname.charAt(1).toUpperCase() + pathname.slice(2);

    useTop();
    useEffect(() => {
        const getSectionSets = async () => {
            try {
                const {data} = await axios.get(`/section${pathname}`);
                setSets(data);
            } catch (error) {
                throw new Error('There is no such a section');
            }
        };
        getSectionSets();
    }, [pathname]);


    return (
        <div className="my-24 container mx-auto px-4">
            <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
                {sectionName}
            </h1>
            {/*A loader should be included*/}
            <section className="flex justify-start flex-wrap items-stretch gap-12">
                {sets && sets.map((section, index) => {
                    return <Card
                        title={section.name}
                        text={section.description}
                        key={index}
                        image={section.image}
                        buttonTxt="Let's learn"
                        /* I need to create abstraction layer/object instance/model */
                        link={section.id}
                        badge={section.level}
                    />
                })}
            </section>
        </div>
    );
}

export default PreviewPage;
