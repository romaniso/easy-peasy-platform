import React, {ReactElement, useState} from "react";
import IconsTabBar from "../IconsTabBar";
import { MdFamilyRestroom, MdOutlineWorkOutline, MdOutlineSelfImprovement } from "react-icons/md";
import { CiViewList, CiTrophy, CiFootball  } from "react-icons/ci";
import { GiRoad } from "react-icons/gi";
import { FaSchool, FaUmbrellaBeach, FaFlagUsa } from "react-icons/fa";
import { PiExamBold } from "react-icons/pi";
import PersonalInformationForm from "./PersonalInformationForm";
import MotivationForm, {MotivationItem} from "./MotivationForm";
import InterestsForm from "./InterestsForm";


const UserProfileForms = () => {
    const [activeTab, setActiveTab] = useState<string>('personal');
    const userForms =  [
        {label: 'personal', content: 'Personal information',  icon: <CiViewList/>},
        {label: 'motivation', content: 'Your motivation',  icon: <CiTrophy/>},
        {label: 'interests', content: 'Your Interests',  icon: <CiFootball/>},
    ]
    const motivationItems: MotivationItem[] = [
        {text: 'Family and Relationship', icon: <MdFamilyRestroom/>},
        {text: 'Career', icon: <MdOutlineWorkOutline/>},
        {text: 'School', icon: <FaSchool/>},
        {text: 'Travelling', icon: <FaUmbrellaBeach/>},
        {text: 'Exams and Certificates', icon: <PiExamBold/>},
        {text: 'Self-development', icon: <MdOutlineSelfImprovement/>},
        {text: 'Emigration', icon: <GiRoad/>},
        {text: 'Culture Interest', icon: <FaFlagUsa/>},
    ]
    let content: ReactElement | null = null;

    switch (activeTab) {
        case 'personal':
            content = <PersonalInformationForm/>
            break;
        case 'motivation':
            content = <MotivationForm items={motivationItems}/>
            break;
        case 'interests':
            content = <InterestsForm/>
            break;
    }

    return (
        <section className='flex-shrink w-full h-full flex flex-col gap-2 md:gap-4'>
            <IconsTabBar
                className='pt-6 md:max-w-[650px] mx-auto'
                activeTab={activeTab}
                items={userForms}
                setActiveTab={setActiveTab}
            />
            {content}
        </section>
    )
}

export default UserProfileForms;