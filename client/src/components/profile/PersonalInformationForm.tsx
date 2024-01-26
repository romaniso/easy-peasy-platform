import Input from "../Input";
import Button from "../Button";
import {FaSave} from "react-icons/fa";
import React from "react";

const PersonalInformationForm: React.FC = () => {
    return (
        <form className='mx-auto flex-grow flex flex-col justify-between items-center md:py-5 md:px-7 px-3 py-5 w-full md:max-w-[600px] lr:max-w-[750px]'>
            <h3 className='text-indigo-500 dark:text-indigo-200 font-bold text-center drop-shadow text-2xl md:text-3xl'>Personal Information</h3>
            <div className='flex-shrink flex flex-col gap-10 w-full'>
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
                <Input
                    className=''
                    name='email'
                    type='email'
                    secondary
                    rounded
                    outline
                    autoComplete="off"
                    lg
                    onChange={() => {console.log('Last Name')}}
                >Your E-mail
                </Input>
                <Input
                    className=''
                    name='b-day'
                    type='date'
                    secondary
                    rounded
                    outline
                    autoComplete="off"
                    lg
                    onChange={() => {console.log('Last Name')}}
                >Your Birthday
                </Input>
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

export default PersonalInformationForm;