import React, {useEffect, useState} from "react";
import {RiMoonLine, RiSunLine} from "react-icons/ri";


function ThemeToggle(){
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;

    });

    useEffect(() => {
        if(isDarkTheme){
            document.querySelector('html')?.classList.add('dark');
            document.querySelector('body')?.classList.remove('scrollbar-track-indigo-300');
            document.querySelector('body')?.classList.add('scrollbar-track-stone-800', 'scrollbar-thumb-orange-500');
        } else {
            document.querySelector('html')?.classList.remove('dark');
            document.querySelector('body')?.classList.remove('scrollbar-track-stone-800');
            document.querySelector('body')?.classList.add('scrollbar-thumb-orange-500', 'scrollbar-track-indigo-300');
        }

    }, [isDarkTheme]);
    const handleToggleTheme = () => {
        setIsDarkTheme((prevIsDarkTheme) => !prevIsDarkTheme);
    };

    return (
        <div className="flex justify-center items-center">
        <span className="text-xl">
          <RiSunLine className='text-orange-500 dark:text-indigo-400'/>
        </span>
            <div className="p-1">
                <label className="relative inline-block w-11 h-6">
                    <input type="checkbox" className='opacity-0 w-0 h-0' onChange={handleToggleTheme} />
                    <span className="absolute cursor-pointer inset-0 rounded-2xl border dark:border-stone-700 bg-indigo-300 dark:bg-stone-900 transition-all before:[content: ''] before:h-5 before:absolute before:w-5 before:inline-block before:rounded-full before:left-[1px] dark:before:translate-x-5 before:bottom-[1px] before:bg-white dark:before:bg-indigo-200 before:transition-all"></span>
                </label>
            </div>
            <span className="text-xl">
          <RiMoonLine className='text-stone-700 dark:text-stone-300'/>
        </span>
        </div>
    )
}

export default ThemeToggle;