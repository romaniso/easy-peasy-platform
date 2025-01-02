import React, { useEffect, useMemo, useRef, useState } from "react";
import { ToastContext } from "../../context/ToastContext";
import { IoIosCloseCircle } from "react-icons/io";
import { RiAlarmWarningLine } from "react-icons/ri";
import { FaExclamationCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { ToastType } from "../../enums/toast";
import className from "classnames";

const useTimeout = (callbackFunction: () => void) => {
  const savedCallback = useRef(callbackFunction);

  useEffect(() => {
    savedCallback.current = callbackFunction;
  }, [callbackFunction]);

  useEffect(() => {
    const functionId = setTimeout(() => savedCallback.current(), 3000);
    return () => clearTimeout(functionId);
  }, []);
};
interface ToastProps {
  message: string;
  close: () => void;
  type: ToastType;
}
export const Toast = ({ message, close, type }: ToastProps): JSX.Element => {
  const toastClasses = className(
    "backdrop-blur bg-white/30 dark:bg-black/30 rounded-md w-full md:w-[400px] py-5 md:py-2 px-2 border-l-8 shadow-md flex justify-between items-center duration-75 animate-slidein-toast",
    {
      "border-green-600": type === ToastType.Success,
      "border-orange-400": type === ToastType.Warning,
      "border-red-400": type === ToastType.Failure,
    }
  );
  const iconClasses = className("p-2 rounded-full shadow", {
    "bg-green-600": type === ToastType.Success,
    "bg-orange-400": type === ToastType.Warning,
    "bg-red-400": type === ToastType.Failure,
  });
  let icon: React.ReactElement | null = null;

  switch (type) {
    case ToastType.Success:
      icon = <FaCheck className="text-indigo-50" />;
      break;
    case ToastType.Warning:
      icon = <RiAlarmWarningLine className="text-indigo-50" />;
      break;
    case ToastType.Failure:
      icon = <FaExclamationCircle className="text-indigo-50" />;
      break;
  }

  useTimeout(() => {
    close();
  });
  return (
    <div className={toastClasses}>
      <div className="flex items-center gap-2 font-bold">
        <div className={iconClasses}>{icon}</div>
        <p className="text-indigo-900 dark:text-indigo-50">{message}</p>
      </div>
      <button className="" onClick={close}>
        <IoIosCloseCircle className="text-2xl text-indigo-900 dark:text-indigo-50" />
      </button>
    </div>
  );
};

interface ToastContextProviderProps {
  children: React.ReactElement;
}
type Toast = {
  message: string;
  id: string;
  type: ToastType;
};

export const ToastContextProvider: React.FC<ToastContextProviderProps> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function openToast(message: string, type: ToastType) {
    const newToast = {
      // @FIXME use sth different for id generation
      id: Math.random().toString(),
      message,
      type,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  }
  function closeToast(id: string) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  const contextValue = useMemo(
    () => ({
      open: openToast,
      close: closeToast,
    }),
    []
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed bottom-2 right-1 md:bottom-10 md:right-10 flex flex-col gap-2 z-50 w-[95vw] md:w-auto">
        {toasts &&
          toasts.map((toast) => {
            return (
              <Toast
                message={toast.message}
                key={toast.id}
                type={toast.type}
                close={() => closeToast(toast.id)}
              />
            );
          })}
      </div>
    </ToastContext.Provider>
  );
};
