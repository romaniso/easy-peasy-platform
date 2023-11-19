import { useEffect, useRef, useState } from "react";

function CircularProgressBar({ results, activeExercise }) {
  const [result, setResult] = useState(null);
  const [dashOffset, setDashOffset] = useState(null);

  const animateRef = useRef();
  const resultRef = useRef();
  const circleRef = useRef();

  const calculateResultIntoPercentages = (results, result) => {
    const numberOfPossibleAnswers = results.length;
    const correctAnswers = results.filter((result) => result === "Same").length;
    const percentage = (correctAnswers / numberOfPossibleAnswers) * 100;

    setResult(percentage);
    setDashOffset(Math.floor(243 - (percentage / 100) * 155));
    return percentage;
  };
  const animateCircularBar = (htmlRef, animateRef, result) => {
    // Reset counter
    let counter = 0;
    htmlRef.innerHTML = counter + "%";

    const intervalId = setInterval(() => {
      if (counter === result) {
        clearInterval(intervalId);
      } else {
        counter++;
        htmlRef.innerHTML = counter + "%";
      }
    }, 20);

    // Update the animation when dashOffset changes
    if (animateRef.current) {
      animateRef.current.setAttribute("values", `243;${dashOffset}`);
      animateRef.current.beginElement();
    }

    return intervalId;
  }

  useEffect(() => {
    const currResult = calculateResultIntoPercentages(results, result);
    console.log('==============================');
    console.log("CircularProgressBar Mounted");

    console.log("Results:", results);
    console.log("Dash Offset:", dashOffset);
    console.log("Active Exercise:", activeExercise);

    const intervalId = animateCircularBar(resultRef.current, animateRef, currResult);

    // Clean up the interval when the component unmounts
    return () => {
      console.log("CircularProgressBar Unmounted");

      setDashOffset(null);
      setResult(null);
      clearInterval(intervalId);
    };
  }, [results, dashOffset, activeExercise]);

  const circleStyle = {
    strokeDashoffset: dashOffset || 236,
    animation: `progressAnimation 1s linear forwards ${dashOffset || 236}px`, // Dynamic CSS animation
  };

  return (
    <div className="progress-bar w-[65px] h-[65px] relative">
      <div className="outer h-[65px] w-[65px] rounded-full border p-2">
        <div className="inner h-[45px] w-[45px] rounded-full flex items-center justify-center">
          {/* Percentage */}
          <div
            className="font-bold text-indigo-900 text-sm dark:text-indigo-200"
            ref={resultRef}
          >
            0%
          </div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="62px"
        height="62px"
        className='absolute top-0 left-0'
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#1ced54" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        <circle
          ref={circleRef}
          cx="32.5"
          cy="32.5"
          r="25"
          strokeLinecap="square"
          style={circleStyle}
          stroke={`url(#GradientColor)`}
          fill='none'
          strokeWidth='8px'
          strokeDasharray='243'
        >
          <animate
            ref={animateRef}
            attributeName="stroke-dashoffset"
            // from={fromValue}
            // to={toValue}
            dur="1s"
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
