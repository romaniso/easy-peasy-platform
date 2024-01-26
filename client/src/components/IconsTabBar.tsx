import React, {ReactElement} from "react";
interface IconTabBarProps {
    items: {
        label: string,
        content: string,
        icon: ReactElement
    }[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    className? : string;
}

const IconsTabBar: React.FC<IconTabBarProps> = ({ items, activeTab, setActiveTab, className}) => {
    const handleTab = (tab: string): void => {
        setActiveTab(tab);
    };

    const renderedTabs = items.map((item, index) => {
        return (
            <div className={`
                basis-1/${items.length} flex-grow-0 flex flex-col justify-between items-center relative text-center after:[content: ""] before:[content: ""] after:transition-colors after:duration-300 before:transition-colors before:duration-300
                ${index !== (items.length - 1) && 'after:absolute after:w-1/2 after:top-1/2 after:right-0 after:h-1 after:-translate-y-5 z-0'}
                ${index !== 0 && 'before:absolute before:w-1/2 before:top-1/2 before:left-0 before:bg-orange-500 before:h-1 before:-translate-y-5'}
                ${(item.label === activeTab && index === 0 ) || items[index - 1]?.label === activeTab && index !== 0 ? 'before:bg-orange-500' : 'before:bg-indigo-400'}
                ${item.label === activeTab ? 'after:bg-orange-500' : 'after:bg-indigo-400'}
                `}
                 key={item.label}
            >
                <div className={`
                    p-1.5 lg:p-2 rounded-full lg:text-xl text-indigo-50 shadow-md cursor-pointer hover:bg-orange-400 hover:scale-105 transition-all duration-300 z-10 relative
                    ${item.label === activeTab ? 'bg-orange-500' : 'bg-indigo-400'}
                    `}
                     onClick={() => handleTab(item.label)}
                >
                    {item.icon}
                </div>
                <p className='text-indigo-800 dark:text-indigo-200 font-semibold capitalize text-sm mt-1 lg:mt-3'>
                    {item.content}
                </p>
            </div>
        )
    })

    return (
        <div className={`flex justify-between w-full ${className}`}>
            {renderedTabs}
        </div>
    )
}

export default IconsTabBar;