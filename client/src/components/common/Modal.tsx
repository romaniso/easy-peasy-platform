import React, {ReactElement, useEffect} from "react";
import ReactDOM from "react-dom";
import Panel from "./Panel";
import ImageDropZone from "../ImageDropZone";

interface ModalProps {
    onClose(): void;
    children: ReactElement;
    actionBar: ReactElement;
    size?: string
}
const Modal: React.FC<ModalProps> = ({ onClose, children, actionBar, size }) => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => document.body.classList.remove("overflow-hidden");
    }, []);
    return ReactDOM.createPortal(
        <section>
            <div
                className="fixed inset-0 backdrop-brightness-75 backdrop-blur-sm z-50"
                onClick={onClose}
            ></div>
            <Panel className={`${size ? size : 'w-3/5 h-3/5'} fixed bottom-2 md:top-1/2 left-1/2 md:-translate-y-1/2 -translate-x-1/2 p-10 shadow-md bg-white flex flex-col justify-between z-50 rounded-md overflow-y-auto overflow-x-hidden scrollbar scrollbar-thin scrollbar-thumb-orange-300 dark:scrollbar-thumb-orange-500 scrollbar-track-indigo-50 dark:scrollbar-track-[#323232]`}>
                {children}
                <div className="flex justify-end">{actionBar}</div>
            </Panel>
        </section>,
        document.querySelector(".modal-container") as Element
    );
}

export default Modal;