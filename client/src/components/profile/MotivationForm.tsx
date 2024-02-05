// import Input from "../Input";
import Button from "../Button";
import {FaSave} from "react-icons/fa";
import React, {ReactElement, SyntheticEvent, useState} from "react";
import CheckboxButton from "../CheckboxButton";
import {User} from "../../interfaces/user";
import {axiosPrivate} from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import {MotivationItemText} from "../../enums/motivationItem";

export type MotivationItem = {
    text: MotivationItemText,
    icon: ReactElement,
}
interface MotivationFormProps {
    items: MotivationItem[];
}

const UPDATE_URL = '/users';

const MotivationForm: React.FC<MotivationFormProps> = ({items}) => {
    const {auth} = useAuth();
    const { setUser, user} = useUser();
    const [selectedItems, setSelectedItems] = useState<MotivationItemText[]>(user.motivations || []);

    const handleCheckboxChange = (itemText: MotivationItemText) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemText)) {
                return prevSelectedItems.filter((text) => text !== itemText);
            } else {
                return [...prevSelectedItems, itemText];
            }
        });
    };

    const handleNextForm = (event: SyntheticEvent) => {
        event.preventDefault();
        console.log('Next Form');
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const updatedUser: User = {
            username: auth.user,
            motivations: selectedItems,
        }
        try {
            const response = await axiosPrivate.put(UPDATE_URL, updatedUser,
                {
                    withCredentials: true
                }
            )
            if(response.status === 200) {
                setUser((prev) => {
                    return {
                        ...prev,
                        ...updatedUser
                    }
                })
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form className='mx-auto flex-grow flex flex-col justify-between items-center md:py-5 md:px-7 px-3 py-5 w-full md:max-w-[600px] lr:max-w-[750px]' onSubmit={handleSubmit}>
            <div>
                <h3 className='text-indigo-500 dark:text-indigo-200 font-bold text-center drop-shadow text-xl md:text-3xl mb-1 md:mb-3'>Your Motivation</h3>
                <p className='text-indigo-900 dark:text-indigo-300 font-semibold'>What motivates you to learn English?</p>
            </div>
            <div className='flex-shrink w-full grid grid-cols-1 md:grid-cols-2 gap-3'>
                {items.map(item => {
                    return (
                        <CheckboxButton
                            item={item}
                            key={item.text}
                            onChange={() => handleCheckboxChange(item.text)}
                            checked={selectedItems.includes(item.text)}
                        />
                    )
                })}
            </div>
            <div className='md:self-start flex justify-between w-full gap-4'>
                <Button
                    submit
                    primary
                    rounded
                    className='basis-1/2'
                >
                        <span className='text-lg'>
                            Save
                            <FaSave className='inline ml-2'/>
                        </span>
                </Button>
                <Button secondary rounded className='basis-1/2' onClick={handleNextForm}>
                    Next
                </Button>
            </div>
        </form>
    )
}

export default MotivationForm;