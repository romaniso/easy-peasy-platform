// import Input from "../Input";
import Button from "../Button";
import {FaSave} from "react-icons/fa";
import React, {ReactElement} from "react";
import CheckboxButton from "../CheckboxButton";

export type MotivationItem = {
    text: string,
    icon: ReactElement,
}
interface MotivationFormProps {
    items: MotivationItem[];
}

const MotivationForm: React.FC<MotivationFormProps> = ({items}) => {
    return (
        <form className='mx-auto flex-grow flex flex-col justify-between items-center md:py-5 md:px-7 px-3 py-2 w-full md:max-w-[600px] lr:max-w-[750px]'>
            <div>
                <h3 className='text-indigo-500 dark:text-indigo-200 font-bold text-center drop-shadow text-xl md:text-3xl mb-1 md:mb-3'>Your Motivation</h3>
                <p className='text-indigo-900 dark:text-indigo-300 font-semibold'>What motivates you to learn English?</p>
            </div>
            <div className='flex-shrink w-full grid grid-cols-1 md:grid-cols-2 gap-3'>
                {items.map(item => {
                    return (
                        <CheckboxButton item={item} key={item.text}/>
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