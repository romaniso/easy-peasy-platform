import React, {ReactElement, useState} from "react";
import IconsTabBar from "../IconsTabBar";
import { MdFamilyRestroom, MdOutlineWorkOutline, MdOutlineSelfImprovement, MdOutlineSportsFootball, MdOutlineScience, MdForest } from "react-icons/md";
import { CiViewList, CiTrophy, CiFootball, CiMusicNote1, CiLaptop } from "react-icons/ci";
import { GiRoad, GiFlowerHat, GiAncientColumns, GiReceiveMoney, GiCat, GiButterfly, GiCook } from "react-icons/gi";
import { TiPen } from "react-icons/ti";
import { TbMickey } from "react-icons/tb";
import { SlSocialInstagram } from "react-icons/sl";
import { IoIosFitness } from "react-icons/io";
import { FaSchool, FaUmbrellaBeach, FaFlagUsa, FaFilm, FaBookReader, FaPaintBrush,FaGamepad } from "react-icons/fa";
import { RiMedicineBottleFill } from "react-icons/ri";
import { PiExamBold } from "react-icons/pi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import PersonalInformationForm from "./PersonalInformationForm";
import MotivationForm, {MotivationItem} from "./MotivationForm";
import InterestsForm, {InterestItem} from "./InterestsForm";


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
    const interestItems: InterestItem[] = [
        {text: 'Music', icon: <CiMusicNote1/>},
        {text: 'Films', icon: <FaFilm/>},
        {text: 'Reading', icon: <FaBookReader/>},
        {text: 'Art', icon: <FaPaintBrush/>},
        {text: 'Sports', icon: <MdOutlineSportsFootball/>},
        {text: 'Gaming', icon: <FaGamepad/>},
        {text: 'IT', icon: <CiLaptop/>},
        {text: 'Fashion', icon: <GiFlowerHat/>},
        {text: 'Science', icon: <MdOutlineScience/>},
        {text: 'History', icon: <GiAncientColumns/>},
        {text: 'Economics', icon: <GiReceiveMoney/>},
        {text: 'Nature', icon: <MdForest/>},
        {text: 'Animals', icon: <GiCat />},
        {text: 'Beauty', icon: <GiButterfly/>},
        {text: 'Marketing', icon: <HiOutlineSpeakerphone/>},
        {text: 'Social Media', icon: <SlSocialInstagram />},
        {text: 'Travelling', icon: <FaUmbrellaBeach/>},
        {text: 'Cultures', icon: <FaFlagUsa/>},
        {text: 'Cooking', icon: <GiCook/>},
        {text: 'Content Making', icon: <TiPen/>},
        {text: 'Medicine', icon: <RiMedicineBottleFill/>},
        {text: 'Fitness', icon: <IoIosFitness/>},
        {text: 'Cartoons', icon: <TbMickey/>},
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
            content = <InterestsForm items={interestItems}/>
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