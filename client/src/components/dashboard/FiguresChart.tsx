import React from "react";
import { GrAchievement } from "react-icons/gr";
import { FaArrowTrendUp } from "react-icons/fa6";
// import Button from "../common/Button";

interface FiguresChartProps {
    title: string;
    percentage: number;
    // put a unit in a plural form, e.g. words, users, kilograms.
    unitNameInPlural: string;
}
export const FiguresChart: React.FC<FiguresChartProps> = ({title, percentage, unitNameInPlural}) => {


    return (
        <article className='bg-white dark:bg-black/40 dark:border dark:border-stone-900 rounded-md p-3 shadow-lg h-full flex flex-col justify-between items-center gap-1 hover:scale-105 transition-transform duration-300'>
            <div className='text-orange-500 dark:text-orange-500 font-bold text-xl md:text-3xl flex justify-center items-center gap-2'>
                <h4>{title}</h4>
                <GrAchievement/>
            </div>
            <p className="text-3xl md:text-5xl text-indigo-500 drop-shadow font-bold relative">
                {percentage}%
                <span className="bg-indigo-50 dark:bg-gray-950 shadow-sm rounded-xl py-0.5 px-1 absolute -top-2 -right-8 text-xs md:text-sm text-green-600 dark:text-green-300 inline-flex">+10% <FaArrowTrendUp/></span>
            </p>
            <p className='text-xs md:text-sm text-indigo-900/50 dark:text-indigo-300 text-center'>
                This is the average result of all the {" "}
                <span className='font-bold'>{unitNameInPlural}</span>
                {" "} you have completed, represented in percentages.
            </p>
        </article>
    )
}