import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Panel from "./Panel";

interface CardProps {
    title: string;
    text: string;
    image: string;
    buttonTxt?: string;
    link?: string;
    badge?: string;
}

const Card: React.FC<CardProps> = ({ title, text, image, buttonTxt, link, badge }) => {
    return (
        <Panel className="bg-white shadow-lg flex flex-col md:max-w-xs transition-all duration-700 hover:scale-105">
            {image && (
                <div className="h-28 relative">
                    {badge && <div className='absolute text-2xl capitalize right-2 top-2 w-8 h-8 flex justify-center items-center rounded-md shadow-md bg-black/40 text-indigo-300 z-10'>{badge}</div>}
                    <img
                        src={image}
                        alt="decor of the card"
                        className="w-full h-full object-cover rounded-md dark:brightness-95"
                    />
                </div>
            )}
            <div className="py-5 flex-col items-center gap-3 flex-auto">
                <h3
                    className="font-semibold text-2xl overflow overflow-ellipsis text-indigo-900 dark:text-orange-500 text-center"
                    title={title}
                >
                    {title}
                </h3>
                <p className="text-md text-center text-orange-500 dark:text-indigo-200">{text}</p>
            </div>
            <Link to={link || `/${title.toLowerCase()}`}>
                <Button primary rounded className="w-full shine-effect relative overflow-hidden">
                    {buttonTxt || "Check it out"}
                </Button>
            </Link>
        </Panel>
    );
}

export default Card;