//#region imports
import useTop from "../hooks/useTop";
import Card from "../components/Card";
import RelationshipsImg from "../assets/images/vocabulary/realtionships.jpg";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
//#endregion
function PreviewPage() {
    const {pathname} = useLocation();
    let sectionName = pathname.charAt(1).toUpperCase() + pathname.slice(2);

    useTop();
    useEffect(  () => {
        const getSectionSets = async () => {
            try {
                await axios.get(`/section/${pathname}`)
            } catch (e){
                throw new Error('There is no such a section');
            }
        }
        getSectionSets();
    }, []);


    return (
        <div className="my-24 container mx-auto px-4">
            <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
                {sectionName}
            </h1>
            {/*It should be rendered dynamically fetching cards and images by API, not hardcoded. A loader should be included as well*/}
            <section className="flex justify-start flex-wrap items-stretch gap-12">
                <Card
                    title="Building and Maintaining Relationships"
                    text="People live among other people. Let's learn how to build relationships using the most common English phrases"

                    image={RelationshipsImg}
                    buttonTxt="Let's learn"
                    link="/reading/relationships"
                    badge="A2"
                />
            </section>
        </div>
    );
}

export default PreviewPage;
