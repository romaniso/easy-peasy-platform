import React from "react";
import Panel from "../components/Panel";
import { IoLanguage, IoMoonOutline } from "react-icons/io5";
import { BsExclamationDiamondFill } from "react-icons/bs";
import ChangePassword from "../components/settings/ChangePassword";
import LanguageSwitcher from "../components/settings/LanguageSwitcher";

const SettingsPage: React.FC = () => {
    return (
        <div className='h-full md:p-12'>
            <Panel className='bg-white flex flex-col !p-0 rounded-none md:rounded-md overflow-hidden h-full w-full'>
                <header className='p-3 md:p-5 bg-gradient-to-r from-orange-500 to-orange-300 dark:from-stone-900 dark:to-stone-800'>
                    <h1 className='text-indigo-800 dark:text-indigo-300 font-extrabold drop-shadow text-center md:text-left text-3xl md:text-4xl'>Settings</h1>
                </header>
                <main className='py-3 px-3 md:px-5 grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <ChangePassword/>
                    <LanguageSwitcher/>
                    <section className='md:col-span-2'>
                        <h2 className='text-lg md:text-2xl text-indigo-500 dark:text-indigo-200 font-bold drop-shadow flex items-center gap-1'>Change Theme <IoMoonOutline/></h2>
                    </section>
                    <section className='md:col-span-2'>
                        <h2 className='text-lg md:text-2xl text-indigo-500 dark:text-indigo-200 font-bold drop-shadow flex items-center gap-1'>Delete Account <BsExclamationDiamondFill/></h2>
                    </section>
                </main>
            </Panel>
        </div>
    );
}

export default SettingsPage;