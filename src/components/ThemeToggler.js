import {useEffect, useState} from "react";

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

    return <button className={className} onClick={handleToggleTheme}>
        Dark
    </button>
}

export default ThemeToggler;