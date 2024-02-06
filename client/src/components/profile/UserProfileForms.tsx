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
import {InterestItemText} from "../../enums/interestItem";



const UserProfileForms = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
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
        {text: InterestItemText.Music, icon: <CiMusicNote1/>},
        {text: InterestItemText.Films, icon: <FaFilm/>},
        {text: InterestItemText.IT, icon: <CiLaptop/>},
        {text: InterestItemText.Reading, icon: <FaBookReader/>},
        {text: InterestItemText.Art, icon: <FaPaintBrush/>},
        {text: InterestItemText.Gaming, icon: <FaGamepad/>},
        {text: InterestItemText.Sports, icon: <MdOutlineSportsFootball/>},
        {text: InterestItemText.Fashion, icon: <GiFlowerHat/>},
        {text: InterestItemText.Science, icon: <MdOutlineScience/>},
        {text: InterestItemText.Nature, icon: <MdForest/>},
        {text: InterestItemText.History, icon: <GiAncientColumns/>},
        {text: InterestItemText.Economics, icon: <GiReceiveMoney/>},
        {text: InterestItemText.Marketing, icon: <HiOutlineSpeakerphone/>},
        {text: InterestItemText.Beauty, icon: <GiButterfly/>},
        {text: InterestItemText.Animals, icon: <GiCat />},
        {text: InterestItemText.SocialMedia, icon: <SlSocialInstagram />},
        {text: InterestItemText.Cultures, icon: <FaFlagUsa/>},
        {text: InterestItemText.Travelling, icon: <FaUmbrellaBeach/>},
        {text: InterestItemText.Medicine, icon: <RiMedicineBottleFill/>},
        {text: InterestItemText.Cooking, icon: <GiCook/>},
        {text: InterestItemText.Fitness, icon: <IoIosFitness/>},
        {text: InterestItemText.ContentMaking, icon: <TiPen/>},
        {text: InterestItemText.Cartoons, icon: <TbMickey/>},
    ]

    let content: ReactElement | null = null

    switch (activeTab) {
        case 0:
            content = <PersonalInformationForm switchForm={setActiveTab}/>
            break;
        case 1:
            content = <MotivationForm items={motivationItems} switchForm={setActiveTab}/>
            break;
        case 2:
            content = <InterestsForm items={interestItems} switchForm={setActiveTab}/>
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