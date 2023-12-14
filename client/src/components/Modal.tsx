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
                className="fixed inset-0 bg-gray-300 opacity-80"
                onClick={onClose}
            ></div>
            <Panel className="fixed inset-40 p-10 bg-white w-auto flex flex-col justify-between">
                {children}
                <div className="flex justify-end">{actionBar}</div>
            </Panel>
        </section>,
        document.querySelector(".modal-container") as Element
    );
}

export default Modal;