import React from "react";
import Panel from "../components/common/Panel";
import { IoMoonOutline } from "react-icons/io5";
import { BsExclamationDiamondFill } from "react-icons/bs";
import ChangePassword from "../components/settings/ChangePassword";
import LanguageSwitcher from "../components/settings/LanguageSwitcher";
import {useTranslation} from "react-i18next";

const SettingsPage: React.FC = () => {
    const {t} = useTranslation('settings');
    const {changeTheme, deleteAccount} = t('subheadings');
    const {mainHeader} = t('header');

    return (
        <div className='h-full md:p-12'>
            <Panel className='bg-white flex flex-col !p-0 rounded-none md:rounded-md overflow-hidden h-full w-full'>
                <header className='p-3 md:p-5 bg-gradient-to-r from-orange-500 to-orange-300 dark:from-stone-900 dark:to-stone-800'>
                    <h1 className='text-indigo-800 dark:text-indigo-300 font-extrabold drop-shadow text-center md:text-left text-3xl md:text-4xl'>
                        {mainHeader}
                    </h1>
                </header>
                <main className='py-3 px-3 md:px-5 grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <ChangePassword/>
                    <LanguageSwitcher/>
                    <section className='md:col-span-2'>
                        <h2 className='text-lg md:text-2xl text-indigo-500 dark:text-indigo-200 font-bold drop-shadow flex items-center gap-1'>{changeTheme} <IoMoonOutline/></h2>
                    </section>
                    <section className='md:col-span-2'>
                        <h2 className='text-lg md:text-2xl text-indigo-500 dark:text-indigo-200 font-bold drop-shadow flex items-center gap-1'>{deleteAccount} <BsExclamationDiamondFill/></h2>
                    </section>
                </main>
            </Panel>
        </div>
    );
}

export default SettingsPage;