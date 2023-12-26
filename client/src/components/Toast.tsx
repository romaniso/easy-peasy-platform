import React, {useEffect, useMemo, useRef, useState} from "react";
import {ToastContext} from "../context/ToastContext";
import { IoIosClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

function useTimeout(callbackFunction: () => void) {
    const savedCallback = useRef(callbackFunction);

    useEffect(() => {
        savedCallback.current = callbackFunction;
    }, [callbackFunction])

    useEffect(() => {
        const functionId = setTimeout(() => savedCallback.current(), 3000);
        return () => clearTimeout(functionId);
    }, [])
}
interface ToastProps {
    message: string;
    close: () => void;
}
const Toast: React.FC<ToastProps> = ({message, close}) => {
    useTimeout(() => {
        close();
    });
    return <div className='bg-indigo-50 text-indigo-900 rounded-md w-[400px] py-2 px-2 border-l-8 border-green-600 shadow-md flex justify-between items-center duration-75 animate-slidein-toast'>
        <div className='flex items-center gap-2 font-bold'>
            <div className='p-2 bg-green-600 rounded-full shadow'>
                <FaCheck className='text-white'/>
            </div>
            {message}
        </div>
        <button className='' onClick={close}><IoIosClose className='text-2xl'/></button>
    </div>
}

export default Toast;

interface ToastContextProviderProps {
    children: React.ReactElement;
}
type ToastType = {
    message: string;
    id: string;
}

export const ToastContextProvider: React.FC<ToastContextProviderProps>  = ({children}) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    function openToast(message: string) {
        const newToast = {
            // @FIXME use sth different for id generation
            id: (Math.random()).toString(),
            message,
        };
        setToasts((prevToasts) => [...prevToasts, newToast]);
    };
    function closeToast(id: string) {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }

    const contextValue = useMemo(() => ({
        open: openToast,
        close: closeToast,
    }), [])

    return (<ToastContext.Provider value={contextValue}>
        {children}
        <div className='fixed bottom-10 right-10 flex flex-col gap-2'>
            {toasts && toasts.map(toast => {
                return <Toast message={toast.message} key={toast.id} close={() => closeToast(toast.id)}/>
            })}
        </div>
    </ToastContext.Provider>)
}