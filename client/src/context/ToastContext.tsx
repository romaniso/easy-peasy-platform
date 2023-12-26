import {createContext, useContext} from "react";

interface ToastContextValue {
    open: (message: string) => void;
    close: (id: string) => void;
}
export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => useContext(ToastContext);