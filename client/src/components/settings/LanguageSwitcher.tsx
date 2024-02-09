import {IoLanguage} from "react-icons/io5";
import React, {ReactElement, useState} from "react";
import PolandFlag from '../../assets/images/poland.png';
import UsaFlag from '../../assets/images/usa.png';
import UkraineFlag from '../../assets/images/ukraine.png';
import Select from "../Select";
import {Language} from "../../enums/lang";

interface LanguageSwitcherItem {
    value: Language;
    label: string;
    icon: ReactElement;
}
const LanguageSwitcher: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<Language |null>(null);
    const languages: LanguageSwitcherItem[] = [
        { value: Language.English, label: "English (default)", icon: <img src={UsaFlag} alt='American flag' className='w-7'/> },
        { value: Language.Polish, label: "Polish", icon:  <img src={PolandFlag} alt='Polish flag' className='w-7'/> },
        { value: Language.Ukrainian, label: "Ukrainian", icon:  <img src={UkraineFlag} alt='Ukrainian flag' className='w-7'/> },
    ]

    const handleSwitchLanguage = (lang: Language) => {
        setSelectedLanguage(lang);
        //@TODO: context logics
    }

    return (
        <section>
            <h2 className='text-lg md:text-2xl text-indigo-500 dark:text-indigo-200 font-bold drop-shadow flex items-center gap-1 mb-3.5 md:mb-6'>
                Choose default language
                <IoLanguage/>
            </h2>
            <Select options={languages} onChange={handleSwitchLanguage}/>
        </section>
    )
}
export default LanguageSwitcher;