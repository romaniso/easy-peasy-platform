import React, { useEffect, useState, useRef } from "react";

function generateQuickGuid() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}

interface CircleAnimationProps {
    offset: number;
}

const CircleAnimation: React.FC<CircleAnimationProps> = ({ offset }) => {
    const [uid] = useState(generateQuickGuid());
    const circleRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        let animationValue = 243;
        const intervalId = setInterval(() => {
            if (animationValue <= 0 || animationValue === offset) {
                circleRef.current!.style.strokeDashoffset = animationValue.toString();
                clearInterval(intervalId);
            } else {
                animationValue--;
                circleRef.current!.style.strokeDashoffset = animationValue.toString();
            }
        }, 20);

        return () => {
            clearInterval(intervalId);
        };
    }, [offset]);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="62px"
            height="62px"
            className="absolute top-0 left-0"
        >
            <defs>
                <linearGradient id={`GradientColor_${uid}`}>
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
                stroke={`url(#GradientColor_${uid})`}
                fill="none"
                strokeWidth="8px"
                strokeDasharray="243"
            ></circle>
        </svg>
    );
};

export default CircleAnimation;
