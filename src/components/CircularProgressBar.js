import { useEffect, useRef, useState } from "react";

function CircularProgressBar({ results }) {
    const [result, setResult] = useState(null);
    const [dashOffset, setDashOffset] = useState(null);

    const calculateResultIntoPercentages = (results) => {
        const numberOfPossibleAnswers = results.length;
        const correctAnswers = results.filter((result) => result === "Same").length;
        const percentage = (correctAnswers / numberOfPossibleAnswers) * 100;

        setResult(percentage);
        setDashOffset(Math.floor(236 - (percentage / 100) * 236));

        return percentage;
    };

    console.log(results);
    const resultRef = useRef();

    useEffect(() => {
        const result = calculateResultIntoPercentages(results);
        const resultBar = resultRef.current;
        let counter = 0;
        const intervalId = setInterval(() => {
            if (counter === result) {
                // clearInterval(intervalId);
            } else {
                counter++;
                resultBar.innerHTML = counter + "%";
            }
        }, 30);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [results, dashOffset, result]);

    return (
        <div className="progress-bar w-20 h-20 relative">
            <div className="outer h-20 w-20 rounded-full border p-2">
                <div className="inner h-[60px] w-[60px] rounded-full flex items-center justify-center">
                    <div className="font-bold text-indigo-900 text-md dark:text-indigo-200" ref={resultRef}>
                        0%
                    </div>
                </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="80px" height="80px">
                <defs>
                    <linearGradient id="GradientColor">
                        <stop offset="0%" stopColor="#1ced54" />
                        <stop offset="100%" stopColor="#3730a3" />
                    </linearGradient>
                </defs>
                <circle cx="40" cy="40" r="35" strokeLinecap="square">
                    <animate
                        attributeName="stroke-dashoffset"
                        values={`236;${dashOffset}`}
                        dur="2s"
                        keyTimes="0;1"
                        repeatCount="1"
                        fill="freeze"
                    />
                </circle>
            </svg>
        </div>
    );
}

export default CircularProgressBar;
