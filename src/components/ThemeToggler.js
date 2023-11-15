import {useEffect, useState} from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";


function ThemeToggler({className}){
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;

    });

    useEffect(() => {
        if(isDarkTheme){
            document.querySelector('html').classList.add('dark');
        } else {
            document.querySelector('html').classList.remove('dark');
        }

    }, [isDarkTheme]);
    const handleToggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    const toggleButtonClasses = `border rounded-md w-10 h-10 p-3 border-stone-700 text-stone-700 hover:text-indigo-300 hover:bg-stone-700 transition-colors duration-700 ${className}`

    return <button className={toggleButtonClasses} onClick={handleToggleTheme}>
        {isDarkTheme ? <BsFillSunFill/> : <BsFillMoonStarsFill/>}
    </button>
}

export default ThemeToggler;