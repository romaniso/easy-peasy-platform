import React from "react";
import Input from "../Input";
import Button from "../Button";
import { FaSave } from "react-icons/fa";
const PersonalDetails = () => {
    return (
        <form className='flex-shrink flex flex-col justify-between md:py-5 md:px-7 px-3 py-2'>
            <h3 className='text-indigo-500 dark:text-indigo-200 font-semibold text-2xl mb-6 border-b'>Information</h3>
            <div className='flex-shrink flex flex-wrap gap-2'>
                <Input
                    className=''
                    name='firstName'
                    type='text'
                    secondary
                    rounded
                    outline
                    autoComplete="off"
                    lg
                    onChange={() => {console.log('First Name')}}
                >Your First Name
                </Input>
                <Input
                    className=''
                    name='firstName'
                    type='text'
                    secondary
                    rounded
                    outline
                    autoComplete="off"
                    lg
                    onChange={() => {console.log('Last Name')}}
                >Your Last Name
                </Input>
            </div>
            <h3 className='text-indigo-500 dark:text-indigo-200 font-semibold text-2xl mb-6 border-b'>Motivation</h3>
            <div className='flex-shrink flex'>
                <Input
                    className=''
                    name='firstName'
                    type='text'
                    secondary
                    rounded
                    outline
                    lg
                    onChange={() => {console.log('First Name')}}
                >Why English?
                </Input>
                <Input
                    className=''
                    name='firstName'
                    type='text'
                    secondary
                    rounded
                    outline
                    lg
                    onChange={() => {console.log('Last Name')}}
                >What's your goal?
                </Input>
            </div>
            <Button primary rounded className='md:self-start'>
                <span className='text-lg'>
                   Save
                <FaSave className='inline ml-2'/>
                </span>
            </Button>
        </form>
    )
}

export default PersonalDetails;