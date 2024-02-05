import Input from "../Input";
import Button from "../Button";
import {FaCheck, FaSave, FaTimes} from "react-icons/fa";
import React, {SyntheticEvent, useEffect, useRef, useState} from "react";
import useAuth from "../../hooks/useAuth";
import {axiosPrivate} from "../../api/axios";
import useUser from "../../hooks/useUser";
import {User} from "../../interfaces/user";

const UPDATE_URL = '/users'
const FIRSTNAME_REGEX = /^[a-zA-Z][a-zA-Z\s'-]{1,50}$/;
const LASTNAME_REGEX = /^[a-zA-Z][a-zA-Z\s'-]{1,50}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// @TODO: break it down to hook, before sending req validate it, show info with Toast
const PersonalInformationForm: React.FC = () => {
    const {auth} = useAuth();
    const { setUser, user} = useUser();

    const [firstName, setFirstName]= useState<string>("");
    const [validFirstName, setValidFirstName] = useState<boolean>(false)
    const [firstNameFocus, setFirstNameFocus] = useState<boolean>(false);


    const [lastName, setLastName]= useState<string>("");
    const [validLastName, setValidLastName] = useState<boolean>(false)
    const [lastNameFocus, setLastNameFocus] = useState<boolean>(false);


    const [userEmail, setUserEmail]= useState<string>("");
    const [validUserEmail, setValidUserEmail] = useState<boolean>(false)
    const [userEmailFocus, setUserEmailFocus] = useState<boolean>(false);


    const [birthday, setBirthday]= useState<string>( "");
    const [validBirthday, setValidBirthday] = useState<boolean>(false)
    const [birthdayFocus, setBirthdayFocus] = useState<boolean>(false);

    const [errMsg, setErrMsg] = useState<string>('');

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null)
    const errRef = useRef<HTMLParagraphElement>(null);

    const validateBirthday = (stringDate: string): boolean => {
        const parsedDate = stringDate ? new Date(stringDate) : undefined;
        const currentDate = new Date();
        return  !!(parsedDate && !isNaN(parsedDate.getTime()) && parsedDate <= currentDate);
    }

    useEffect(() => {
        firstNameRef.current?.focus();
    }, []);
    //PRE Validation - FIRSTNAME
    useEffect(() => {
        if (firstName.trim() === "") {
            // Skip validation for empty input
            setValidFirstName(true);
            return;
        }
        const result = FIRSTNAME_REGEX.test(firstName);
        setValidFirstName(result);
    }, [firstName]);
    //PRE Validation - LASTNAME
    useEffect(() => {
        if (lastName.trim() === "") {
            // Skip validation for empty input
            setValidLastName(true);
            return;
        }
        const result = LASTNAME_REGEX.test(lastName);
        setValidLastName(result);
    }, [lastName]);
    //PRE Validation - EMAIL
    useEffect(() => {
        if (userEmail.trim() === "") {
            // Skip validation for empty input
            setValidUserEmail(true);
            return;
        }

        const result = EMAIL_REGEX.test(userEmail);
        setValidUserEmail(result);
    }, [userEmail]);
    //PRE Validation - B-DAY
    //PRE Validation - B-DAY
    useEffect(() => {
        if (!birthday) {
            // Skip validation for undefined birthday
            setValidBirthday(true);
            return;
        }

        setValidBirthday(validateBirthday(birthday));
    }, [birthday]);
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        // Additional validation in case a button is enabled with JS hack
        const v1 = LASTNAME_REGEX.test(lastName);
        const  v2 = FIRSTNAME_REGEX.test(firstName);
        const  v3 = EMAIL_REGEX.test(userEmail);
        if((!v1 && lastName.length > 0) || (!v2 && firstName.length > 0) || (!v3 && userEmail.length > 0) || !validUserEmail) {
            setErrMsg('Invalid Entry');
            return;
        }

        const updatedUser: User = {
            username: auth.user,
            firstName,
            lastName,
            email: userEmail,
            birthday,
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

    const handleNextForm = (event: SyntheticEvent) => {
        event.preventDefault();
        console.log('Next Form');
    }

    return (
        <form className='mx-auto flex-grow flex flex-col justify-between items-center md:py-5 md:px-7 px-3 py-5 w-full md:max-w-[600px] lr:max-w-[750px]' onSubmit={handleSubmit}>
            <h3 className='text-indigo-500 dark:text-indigo-200 font-bold text-center drop-shadow text-2xl md:text-3xl'>Personal Information</h3>
            <div className='flex-shrink flex flex-col gap-10 w-full'>
                <p ref={errRef} className={errMsg ? 'block bg-red-500/10 dark:border dark:border-red-400 rounded p-1 text-sm font-bold text-red-500 opacity-100 transition-colors duration-500 -mt-5 shadow' : 'invisible absolute'} aria-live='assertive'>{errMsg}</p>
                <Input
                    className=''
                    name='firstName'
                    type='text'
                    secondary
                    rounded
                    outline
                    autoComplete="off"
                    lg
                    onChange={setFirstName}
                    prevValue={user.firstName}
                    onFocus={() => setFirstNameFocus(true)}
                    onBlur={() => setFirstNameFocus(false)}
                    ref={firstNameRef}
                >
                    First name
                    <span className={validFirstName && firstName ? 'inline-block ml-1 text-green-500' : 'invisible absolute'}>
                        <FaCheck/>
                    </span>
                    <span className={validFirstName ? 'invisible absolute' : 'inline-block ml-1 text-red-500'}>
                        <FaTimes/>
                    </span>
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
                    prevValue={user.lastName}
                    onFocus={() => setLastNameFocus(true)}
                    onBlur={() => setLastNameFocus(false)}
                    onChange={setLastName}
                    ref={lastNameRef}
                >
                    Last name
                    <span className={validLastName && lastName ? 'inline-block ml-1 text-green-500' : 'invisible absolute'}>
                        <FaCheck/>
                    </span>
                    <span className={validLastName ? 'invisible absolute' : 'inline-block ml-1 text-red-500'}>
                        <FaTimes/>
                    </span>
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
                    prevValue={user.email}
                    onChange={setUserEmail}
                    onFocus={() => setUserEmailFocus(true)}
                    onBlur={() => setUserEmailFocus(false)}
                >
                    Your E-mail
                    <span className={validUserEmail && userEmail ? 'inline-block ml-1 text-green-500' : 'invisible absolute'}>
                        <FaCheck/>
                    </span>
                    <span className={validUserEmail ? 'invisible absolute' : 'inline-block ml-1 text-red-500'}>
                        <FaTimes/>
                    </span>
                </Input>
                <Input
                    className=''
                    name='birthday'
                    type='date'
                    secondary
                    rounded
                    outline
                    autoComplete="off"
                    lg
                    prevValue={user.birthday}
                    onChange={setBirthday}
                    onFocus={() => setBirthdayFocus(true)}
                    onBlur={() => setBirthdayFocus(false)}
                >
                    Your Birthday
                    <span className={validBirthday && birthday ? 'inline-block ml-1 text-green-500' : 'invisible absolute'}>
                        <FaCheck/>
                    </span>
                    <span className={validBirthday ? 'invisible absolute' : 'inline-block ml-1 text-red-500'}>
                        <FaTimes/>
                    </span>
                </Input>
            </div>
            <div className='md:self-start flex justify-between w-full gap-4'>
                <Button
                    primary
                    rounded
                    submit
                    disabled={!validFirstName || !validLastName || !validUserEmail || !validBirthday }
                    className={!validFirstName || !validLastName || !validUserEmail || !validBirthday ? 'opacity-40 !cursor-not-allowed basis-1/2' :"basis-1/2"}
                >
                        <span className='text-lg'>
                            Save
                            <FaSave className='inline ml-2'/>
                        </span>
                </Button>
                <Button
                    secondary
                    rounded
                    className='basis-1/2'
                    onClick={handleNextForm}
                >
                    Next
                </Button>
            </div>
        </form>
    )
}

export default PersonalInformationForm;