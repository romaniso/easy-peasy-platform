import React, { useCallback, useEffect, useRef } from "react";
import CircleAnimation from './CircleAnimation';

interface CircularProgressBarProps {
    percentage: number;
    offset: number;
    lg?: true;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage, offset, lg }) => {
    const resultRef = useRef<HTMLDivElement>(null);

    const animatePercentage: React.EffectCallback = useCallback(() => {
        if (resultRef.current) {
            let counter = 0;
            resultRef.current.innerHTML = counter + "%";

            const intervalId = setInterval(() => {
                if (counter === percentage || counter === 100) {
                    clearInterval(intervalId);
                } else {
                    counter++;
                    resultRef.current!.innerHTML = counter + "%";
                }
            }, 20);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [percentage]);

    useEffect(animatePercentage, [animatePercentage]);

    return (
        <div className={`progress-bar w-[65px] h-[65px] relative ${lg && 'scale-150'}`}>
            <div className="outer h-[65px] w-[65px] rounded-full border p-2">
                <div className="inner h-[45px] w-[45px] rounded-full flex items-center justify-center">
                    <div
                        ref={resultRef}
                        className="font-bold text-indigo-900 text-sm dark:text-indigo-200"
                    >
                        {`${percentage ?? '0'}%`}
                    </div>
                </div>
            </div>
            <CircleAnimation offset={offset} />
        </div>
    );
}

export default CircularProgressBar;
