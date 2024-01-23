import Panel from "../Panel";
import React from "react";
import Input from "../Input";
import Button from "../Button";
import { FaSave } from "react-icons/fa";


const PersonalDetails = () => {
    return (
        <Panel className='bg-white flex items-center p-5'>
            <form className='flex flex-col gap-8 basis-full'>
                <h2 className='text-indigo-500 font-semibold text-2xl mb-3'>About yourself</h2>
                <div className='flex gap-2'>
                    <Input
                        className='flex-grow-1 basis-3/5'
                        name='firstName'
                        type='text'
                        secondary
                        rounded
                        outline
                        lg
                        onChange={() => {console.log('First Name')}}
                    >Your First Name
                    </Input>
                    <Input
                        className='flex-grow-1 basis-2/5'
                        name='firstName'
                        type='text'
                        secondary
                        rounded
                        outline
                        lg
                        onChange={() => {console.log('Last Name')}}
                    >Your Last Name
                    </Input>
                </div>
                <div className='flex gap-2'>
                    <Input
                        className='flex-grow-1 basis-2/5'
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
                        className='flex-grow-1 basis-3/5'
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
                <Button primary rounded className='self-start'>
                    <span>
                       Save
                    <FaSave className='inline ml-2'/>
                    </span>
                </Button>
            </form>
        </Panel>
    )
}

export default PersonalDetails;