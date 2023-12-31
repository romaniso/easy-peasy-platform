import React, {forwardRef} from "react";
interface ExerciseHeader{
    title: string;
    instruction: string;
    forwardedRef?: React.RefObject<HTMLElement>;
}
const ExerciseHeader: React.FC<ExerciseHeader> = ({ title, instruction, forwardedRef }) => {
    return (
        <header ref={forwardedRef}>
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 dark:text-indigo-100 mb-2 md:mb-8">{title}</h2>
            <p className="text-lg md:text-2xl font-bold text-indigo-400 dark:text-indigo-200 mb-2 md:mb-4">
                Task Description
            </p>
            <p className="inline-block text-sm md:text-base text-orange-500 dark:text-orange-500 bg-stone-50 dark:bg-[#484848] shadow-inner p-3 md:p-5 mb-4 rounded-lg">
                {instruction}
            </p>
        </header>
    );
}

export default forwardRef<HTMLElement, ExerciseHeader>((props, ref) => (
    <ExerciseHeader {...props} forwardedRef={ref as React.RefObject<HTMLElement>} />
));