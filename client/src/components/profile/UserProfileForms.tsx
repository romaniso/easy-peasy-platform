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
import {MotivationItemText} from "../../enums/motivationItem";



const UserProfileForms = () => {
    const [activeTab, setActiveTab] = useState<string>('personal');
    const userForms =  [
        {label: 'personal', content: 'Personal information',  icon: <CiViewList/>},
        {label: 'motivation', content: 'Your motivation',  icon: <CiTrophy/>},
        {label: 'interests', content: 'Your Interests',  icon: <CiFootball/>},
    ]
    const motivationItems: MotivationItem[] = [
        {text: MotivationItemText.Family, icon: <MdFamilyRestroom/>},
        {text: MotivationItemText.Career, icon: <MdOutlineWorkOutline/>},
        {text: MotivationItemText.School, icon: <FaSchool/>},
        {text: MotivationItemText.Travelling, icon: <FaUmbrellaBeach/>},
        {text: MotivationItemText.Exams, icon: <PiExamBold/>},
        {text: MotivationItemText.SelfDevelopment, icon: <MdOutlineSelfImprovement/>},
        {text: MotivationItemText.Emigration, icon: <GiRoad/>},
        {text: MotivationItemText.Culture, icon: <FaFlagUsa/>},
    ]
    const interestItems: InterestItem[] = [
        {text: 'Music', icon: <CiMusicNote1/>},
        {text: 'Films', icon: <FaFilm/>},
        {text: 'IT', icon: <CiLaptop/>},
        {text: 'Reading', icon: <FaBookReader/>},
        {text: 'Art', icon: <FaPaintBrush/>},
        {text: 'Gaming', icon: <FaGamepad/>},
        {text: 'Sports', icon: <MdOutlineSportsFootball/>},
        {text: 'Fashion', icon: <GiFlowerHat/>},
        {text: 'Science', icon: <MdOutlineScience/>},
        {text: 'Nature', icon: <MdForest/>},
        {text: 'History', icon: <GiAncientColumns/>},
        {text: 'Economics', icon: <GiReceiveMoney/>},
        {text: 'Marketing', icon: <HiOutlineSpeakerphone/>},
        {text: 'Beauty', icon: <GiButterfly/>},
        {text: 'Animals', icon: <GiCat />},
        {text: 'Social Media', icon: <SlSocialInstagram />},
        {text: 'Cultures', icon: <FaFlagUsa/>},
        {text: 'Travelling', icon: <FaUmbrellaBeach/>},
        {text: 'Medicine', icon: <RiMedicineBottleFill/>},
        {text: 'Cooking', icon: <GiCook/>},
        {text: 'Fitness', icon: <IoIosFitness/>},
        {text: 'Content Making', icon: <TiPen/>},
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