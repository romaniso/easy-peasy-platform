// import Input from "../Input";
import Button from "../Button";
import {FaSave} from "react-icons/fa";
import React, {ReactElement} from "react";

export type MotivationItem = {
    text: string,
    icon: ReactElement,
}
interface MotivationFormProps {
    items: MotivationItem[];
}

const MotivationForm: React.FC<MotivationFormProps> = ({items}) => {
    return (
        <form className='mx-auto flex-grow flex flex-col justify-between items-center md:py-5 md:px-7 px-3 py-5 w-full md:max-w-[600px] lr:max-w-[750px]'>
            <div>
                <h3 className='text-indigo-500 dark:text-indigo-200 font-bold text-center drop-shadow text-2xl md:text-3xl mb-3'>Your Motivation</h3>
                <p className='text-indigo-900 font-semibold'>What motivates you to learn English?</p>
            </div>
            <div className='flex-shrink w-full grid grid-cols-1 md:grid-cols-2 gap-3'>
                {items.map(item => {
                    return (
                        <label
                            key={item.text}
                            htmlFor=""
                            className='relative inline-block w-full h-full rounded-xl shadow-md cursor-pointer group'
                        >
                            <input type="radio" name='work' value='work' className='bg-indigo-50 group-hover:bg-indigo-100 absolute inset-0 w-full h-full inline-block appearance-none rounded-xl outline-0 transition-colors cursor-pointer checked:bg-indigo-400 checked:transition-colors'/>
                            <div className='flex justify-start items-center h-full relative z-10 gap-3 py-2.5 md:py-4 md:px-4'>
                                <span className='text-2xl text-indigo-800'>
                                    {item.icon}
                                </span>
                                <span className='text-indigo-800 font-semibold text-lg'>{item.text}</span>
                            </div>
                        </label>
                    )
                })}
            </div>
            <div className='md:self-start flex justify-between w-full gap-4'>
                <Button primary rounded className='basis-1/2'>
                        <span className='text-lg'>
                            Save
                            <FaSave className='inline ml-2'/>
                        </span>
                </Button>
                <Button secondary rounded className='basis-1/2'>
                    Next
                </Button>
            </div>
        </form>
    )
}

export default MotivationForm;