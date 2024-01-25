import React from "react";
import PersonalDetails from "../components/profile/PersonalDetails";
import Panel from "../components/Panel";
import ProfileAvatar from "../components/profile/ProfileAvatar";

const ProfilePage: React.FC = () => {
    return (
        <div className='h-full md:p-10'>
            <Panel className='bg-white flex md:flex-row flex-col !p-0 rounded-none md:rounded-md overflow-hidden h-full w-full'>
                <div className='flex-shrink h-1/5 md:h-full md:basis-2/6 flex flex-col justify-center items-center bg-gradient-to-r from-orange-300 to-orange-200 dark:from-stone-800 dark:to-stone-600 p-3 md:p-5'>
                    <ProfileAvatar/>
                    <p className='text-center mt-1 md:mt-10 text-xl md:text-3xl text-indigo-800 dark:text-indigo-300 font-extrabold drop-shadow'>User Name</p>
                    <blockquote className='text-center mt-10 text-lg text-indigo-800 dark:text-indigo-200 border-t border-indigo-600/50 dark:border-indigo-200/50 pt-8 italic md:block hidden'>
                        "Those who know many languages live as many lives <br/> as the languages they know."
                        <footer className='text-right mt-2 font-thin text-sm'>Czech proverb</footer>
                    </blockquote>
                </div>
                <PersonalDetails/>
            </Panel>
        </div>

    );
}

export default ProfilePage;