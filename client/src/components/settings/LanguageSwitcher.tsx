import {IoLanguage} from "react-icons/io5";
import React, {ReactElement, useState} from "react";
import PolandFlag from '../../assets/images/poland.png';
import UsaFlag from '../../assets/images/usa.png';
import UkraineFlag from '../../assets/images/ukraine.png';
import Select from "../common/Select";
import {Language} from "../../enums/lang";
import {useTranslation} from "react-i18next";
import {ToastType} from "../../enums/toast";
import {useToast} from "../../context/ToastContext";

interface LanguageSwitcherItem {
    value: Language;
    label: string;
    icon: ReactElement;
}
const LanguageSwitcher: React.FC = () => {
    const [, setSelectedLanguage] = useState<Language>((localStorage.getItem('i18nextLng') as Language) || Language.English);
    const toast = useToast();

    const {i18n} = useTranslation();
    const {t} = useTranslation('settings');

    const languages: LanguageSwitcherItem[] = [
        { value: Language.English, label: t('languages.en'), icon: <img src={UsaFlag} alt='American flag' className='w-7'/> },
        { value: Language.Polish, label: t('languages.pl'), icon:  <img src={PolandFlag} alt='Polish flag' className='w-7'/> },
        { value: Language.Ukrainian, label: t('languages.ua'), icon:  <img src={UkraineFlag} alt='Ukrainian flag' className='w-7'/> },
    ]

    const handleSwitchLanguage = (lang: Language) => {
        i18n.changeLanguage(lang);
        setSelectedLanguage(lang);
        const toastMessage = t('selectLanguage.toastMessage');
        if(toastMessage){
            toast?.open(toastMessage, ToastType.Success);
        }
    }

    return (
        <section>
            <h2 className='text-lg md:text-2xl text-indigo-500 dark:text-indigo-200 font-bold drop-shadow flex items-center gap-1 mb-3.5 md:mb-6'>
                {t('subheadings.defaultLanguage')}
                <IoLanguage/>
            </h2>
            <Select
                options={languages}
                onChange={handleSwitchLanguage}
                defaultText={t('selectLanguage.selectInputText')}
            />
        </section>
    )
}
export default LanguageSwitcher;