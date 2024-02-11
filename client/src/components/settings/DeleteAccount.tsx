import {BsExclamationDiamondFill} from "react-icons/bs";
import React from "react";
import {useTranslation} from "react-i18next";
import Button from "../common/Button";

export const DeleteAccount: React.FC  = () => {
    const {t} = useTranslation('settings');
    return (
        <section className='md:col-span-2 flex justify-between items-center'>
            <div>
                <h2 className='text-lg md:text-2xl text-indigo-500 dark:text-indigo-200 font-bold drop-shadow flex items-center gap-1 flex-wrap'>
                    {t('subheadings.deleteAccount')}
                    <BsExclamationDiamondFill/>
                </h2>
                <p className='hidden md:block text-indigo-900 dark:text-indigo-300'>
                    {t('deleteAccount.deleteAccountDescription')}
                </p>
            </div>
            <Button danger rounded small className='whitespace-nowrap'>
                {t('deleteAccount.btnText')}
            </Button>
        </section>
    )
}