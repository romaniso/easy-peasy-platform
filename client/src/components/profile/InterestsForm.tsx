import Button from "../Button";
import {FaSave} from "react-icons/fa";
import React, {ReactElement} from "react";
import CheckboxButton from "../CheckboxButton";

export type InterestItem = {
    text: string,
    icon: ReactElement,
}
interface InterestsFormProps {
    items:  InterestItem[];
}
const InterestsForm: React.FC<InterestsFormProps> = ({items}) => {
    return (
        <form className='mx-auto flex-grow flex flex-col justify-between items-center md:py-5 md:px-7 px-3 py-5 w-full md:max-w-[600px] lr:max-w-[750px]'>
            <div>
                <h3 className='text-indigo-500 dark:text-indigo-200 font-bold text-center drop-shadow text-xl md:text-3xl mb-1 md:mb-3'>Your Interests</h3>
                <p className='text-indigo-900 dark:text-indigo-300 font-semibold'>What are you interested in?</p>
            </div>
            <div className='flex-shrink w-full flex flex-wrap gap-2 lg:gap-4'>
                {items.map(item => {
                    return (
                        <CheckboxButton item={item} key={item.text} small/>
                    )
                })}
            </div>
            <div className='md:self-start flex justify-end w-full gap-4'>
                <Button primary rounded className='basis-1/2'>
                        <span className='text-lg'>
                            Save
                            <FaSave className='inline ml-2'/>
                        </span>
                </Button>
            </div>
        </form>
    )
}

export default InterestsForm;