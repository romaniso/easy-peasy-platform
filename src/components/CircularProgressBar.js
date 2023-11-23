import {useCallback, useEffect, useRef} from "react";
import CircleAnimation from './CircleAnimation';

function CircularProgressBar({percentage, offset}) {
  const resultRef = useRef();
  const animatePercentage = useCallback((htmlRef, result) => {
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

    return intervalId;
  },[]);

  useEffect(() => {
    const intervalId = animatePercentage(
        resultRef.current,
        percentage
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [percentage, animatePercentage]);

  return (
      <div className="progress-bar w-[65px] h-[65px] relative">
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