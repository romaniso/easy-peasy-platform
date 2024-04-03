import React, { forwardRef, useState } from "react";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { FaQuestionCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
//import GiffSample from '../../assets/images/fill-box-giff.gif'
interface ExerciseHeader {
  title: string;
  instruction: string;
  forwardedRef?: React.RefObject<HTMLElement>;
}
const ExerciseHeader: React.FC<ExerciseHeader> = ({
  title,
  instruction,
  forwardedRef,
}) => {
  const { t } = useTranslation("exercise");
  const [showModal, setShowModal] = useState(false);
  return (
    <header ref={forwardedRef}>
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 dark:text-indigo-100 mb-2 md:mb-8">
        {title}
      </h2>
      <p className="text-lg md:text-2xl font-bold text-indigo-400 dark:text-indigo-200 mb-2 md:mb-4 flex items-center gap-4">
        <span>{t("descriptions.text")}</span>
        {/* @TODO: create modals */}
        {/*<FaQuestionCircle
          className="cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => setShowModal(!showModal)}
        />*/}
      </p>
      <p className="inline-block text-sm md:text-base text-orange-500 dark:text-orange-500 bg-stone-50 dark:bg-[#484848] shadow-inner p-3 md:p-5 mb-4 rounded-lg w-full">
        {instruction}
      </p>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          actionBar={
            <Button primary rounded onClick={() => setShowModal(false)}>
              Got It
            </Button>
          }
        >
          <span>
            <h5 className="text-orange-500 text-xl font-bold mb-2 drop-shadow-sm">
              Don't know what to do?
            </h5>
            <hr />
            <p className="text-indigo-800 dark:text-indigo-300 my-3 selection:bg-orange-500">
              {instruction}
            </p>
            {/*<img src={GiffSample} alt="Animation" className='mx-auto mb-4 w-full'/>*/}
          </span>
        </Modal>
      )}
    </header>
  );
};

export default forwardRef<HTMLElement, ExerciseHeader>((props, ref) => (
  <ExerciseHeader
    {...props}
    forwardedRef={ref as React.RefObject<HTMLElement>}
  />
));
