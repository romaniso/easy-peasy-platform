import {useEffect, useState} from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";


function ThemeToggler({className}: {className: string}){
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;

    });

    useEffect(() => {
        if(isDarkTheme){
            document.querySelector('html')?.classList.add('dark');
            document.querySelector('body')?.classList.add('scrollbar-track-stone-800');
        } else {
            document.querySelector('html')?.classList.remove('dark');
            document.querySelector('body')?.classList.remove('scrollbar-track-stone-800');
        }

    }, [isDarkTheme]);
    const handleToggleTheme = () => {
        setIsDarkTheme((prevIsDarkTheme) => !prevIsDarkTheme);
    };


    const toggleButtonClasses = `border border-indigo-900 dark:border-indigo-200 rounded-md w-10 h-10 p-3 border-stone-700 text-indigo-900 dark:text-orange-500 hover:text-indigo-300 hover:bg-stone-700 transition-colors duration-700 ${className}`

    return <button className={toggleButtonClasses} onClick={handleToggleTheme}>
        {isDarkTheme ? <BsFillSunFill/> : <BsFillMoonStarsFill/>}
    </button>
}

export default ThemeToggler;