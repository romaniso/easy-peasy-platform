import {createContext, useContext} from "react";
import {ToastType} from "../enums/toast";

interface ToastContextValue {
    open: (message: string, type: ToastType) => void;
    close: (id: string) => void;
}
export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => useContext(ToastContext);