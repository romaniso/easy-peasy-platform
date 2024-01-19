import React, {ReactElement, useEffect} from "react";
import ReactDOM from "react-dom";
import Panel from "./Panel";

interface ModalProps {
    onClose(): void;
    children: ReactElement;
    actionBar: ReactElement;
}
const Modal: React.FC<ModalProps> = ({ onClose, children, actionBar }) => {
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
            <Panel className="fixed inset-y-40 inset-x-80 p-10 shadow-md bg-white !w-auto flex flex-col justify-between z-50 rounded-md overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-orange-300 dark:scrollbar-thumb-orange-500 scrollbar-track-indigo-50 dark:scrollbar-track-[#323232]">
                {children}
                <div className="flex justify-end">{actionBar}</div>
            </Panel>
        </section>,
        document.querySelector(".modal-container") as Element
    );
}

export default Modal;