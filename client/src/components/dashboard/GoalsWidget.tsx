import React from "react";
import { GoGoal } from "react-icons/go";
import Select from "../common/Select";
import Input from "../common/Input";

// import Button from "../common/Button";

interface GoalsWidgetProps {
    // title: string;
    // percentage: number;
    // put a unit in a plural form, e.g. words, users, kilograms.
    // unitNameInPlural: string;
}
export const GoalsWidget: React.FC<GoalsWidgetProps> = () => {


    return (
        <article className='bg-white dark:bg-black/40 dark:border dark:border-stone-900 rounded-md p-3 shadow-lg h-full flex flex-col gap-4'>
            <div className='text-orange-500 dark:text-orange-500 font-bold text-xl md:text-3xl flex items-center gap-2 drop-shadow'>
                <h4>
                    Set your goals
                </h4>
                <GoGoal/>
            </div>
            <table className='flex-1 w-full table-auto'>
                <tbody>
                    <tr className='border-b border-indigo-50 dark:border-indigo-500/50'>
                        <td className='text-sm md:text-base text-indigo-900 dark:text-indigo-300'>
                            How many words per week would you like to learn?
                        </td>
                        <td className='text-orange-500 text-lg font-bold'>
                            {/*<Input name='wordsPerWeek' type='number' onChange={() => console.log('ok')}>*/}
                            {/*    Number of words*/}
                            {/*</Input>*/}
                            {/*<Select defaultText='Select' options={[{label: 10, value: 10}, ]}/>*/}
                        </td>
                    </tr>
                    <tr className='border-b border-indigo-50 dark:border-indigo-500/50'>
                        <td className='text-sm md:text-base text-indigo-900 dark:text-indigo-300'>
                            How many exercises per week would you like to complete?
                        </td>
                        <td className='text-orange-500 text-lg font-bold'>5</td>
                    </tr>
                    <tr className='border-b border-indigo-50 dark:border-indigo-500/50'>
                        <td className='text-sm md:text-base text-indigo-900 dark:text-indigo-300'>
                            How many articles/readings per week would you like to read?
                        </td>
                        <td className='text-orange-500 text-lg font-bold'>5</td>
                    </tr>
                    <tr className=''>
                        <td className='text-sm md:text-base text-indigo-900 dark:text-indigo-300'>
                            What aspect of English do you want to learn this week?
                        </td>
                        <td className='text-orange-500 text-lg font-bold'>5</td>
                    </tr>
                </tbody>
            </table>
        </article>
    )
}