//#region imports
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import useTop from "../hooks/useTop";
import Panel from "../components/Panel";
import ExerciseSet from "../components/exercise/ExerciseSet";
import Cheatsheet from "../components/Cheatsheet";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";
import Reading from "../components/exercise/Reading";
import CustomSkeleton from "../components/Skeleton";

// Just for a template;
import Recommended from "../components/Recommended";
//#endregion

function ExercisePage() {
    const [section, setSection] = useState("");
    const [set, setSet] = useState([]);
    const [cheatsheet, setCheatsheet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {pathname} = useLocation();

    useTop();
    useEffect(() => {
        const setTitle = decodeURIComponent(pathname.split('/')[2]);
        const getExerciseSet = async () => {
            try {
                const {data} = await axios.get(`/exercise/${setTitle}`);
                const {exercises, cheatsheet} = data;
                setSet(exercises.exercises);
                setSection(exercises.section);
                if(cheatsheet){
                    setCheatsheet(cheatsheet);
                }
                setIsLoading(false);
            } catch (error) {
                throw new Error('There is no such an exercise set');
            }
        };
        getExerciseSet();
    }, [pathname]);


    const {topic} = useParams();
    const text =  <>
        {/*<h3 className='text-3xl mb-3'>Building and Maintaining Relationships</h3>*/}

        <h4 className='text-2xl mb-1'>Making Friends</h4>
        <p className='mb-3'>Hi there! Let me tell you about my friend, Sarah. We first met at work. Sarah was a <strong>colleague</strong>, and we started as <strong>acquaintances</strong>. We would say a quick "hello" in the office, but we didn't really know each other well. One day, we decided to grab lunch together, and that's when we started to get to know each other better. Soon, Sarah became my <strong>bestie</strong>, someone I could share everything with. It's amazing how friendships can grow from being colleagues to best friends.</p>

        <h4 className='text-2xl mb-1'>Keeping in Touch</h4>
        <p className='mb-3'>Life can get busy, and sometimes we <strong>lose touch with</strong> our friends. But it's essential to <strong>keep in touch</strong> to maintain a strong relationship. Even when Sarah and I changed jobs, we made a promise to keep in touch. We would regularly send messages, call each other, and make plans to <strong>hang out</strong>. It's important to make an effort to stay connected, especially when life gets busy.</p>

        <h4 className='text-2xl mb-1'>Unexpected Meetings</h4>
        <p className='mb-3'>One day, I <strong>bumped into</strong> Sarah at the supermarket. It was such a pleasant surprise! We hadn't seen each other for a while, and it was great to <strong>catch up</strong>. We decided to get together for coffee, and it felt like no time had passed since our last meeting. Sometimes, these unexpected <strong>encounters</strong> can bring back the joy of friendship.</p>

        <h4 className='text-2xl mb-1'>Friendship Forever</h4>
        <p className='mb-3'>In conclusion, building and maintaining relationships takes effort, but it's worth it. Whether it's getting to know someone at work, keeping in touch through messages and calls, or bumping into a friend unexpectedly, these experiences contribute to strong and lasting friendships. So, don't forget to <strong>reach out to</strong> your friends, make plans to hang out, and cherish the moments you spend together. After all, friends are there to support each other through thick and thin.</p>
    </>

    //FIXME Do I actually need here conditional rendering? Only one thing which changes is min-h...
    let content;
    if(!isLoading){
        switch (section) {
            case "grammar":
                content = (
                    <Panel className="bg-white flex flex-col lg:flex-row justify-between min-h-[850px] !p-0">
                        <ExerciseSet data={set}/>
                        <Cheatsheet
                            topic={cheatsheet.topic}
                            level={cheatsheet.level}
                            content={cheatsheet.markDown}
                        />
                    </Panel>
                );
                break;
            case "vocabulary":
                content = (
                    <Panel className="bg-white flex flex-col lg:flex-row justify-between !p-0">
                        <ExerciseSet data={set}/>
                        <Cheatsheet
                            topic={cheatsheet.topic}
                            level={cheatsheet.level}
                            content={cheatsheet.content}/>
                    </Panel>
                );
                break;
            case 'reading':
                content = (
                    <Panel className="bg-white flex flex-col lg:flex-row justify-between !p-0">
                        {/*<Reading text={text} title='Building and Maintaining Relationships' bgImage={RelationshipsImg}*/}
                        {/*         level='A2'/>*/}
                    </Panel>
                )
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
            <Breadcrumbs/>
            {isLoading ? <CustomSkeleton items={1} exercise/> : content}
            <Recommended/>
        </div>
    );
}

export default ExercisePage;
