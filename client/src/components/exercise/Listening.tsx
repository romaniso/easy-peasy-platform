import { FaRegThumbsUp, FaShare } from "react-icons/fa";
import React from "react";
import Button from "../Button";
import WaveFormPlayer from "../WaveFormPlayer";

interface ListeningProps {
    audioUrl: string;
    title: string;
    description: string;
    image: string;

}
const Listening: React.FC<ListeningProps> = ({audioUrl, title, description, image}) => {
    return (
        <>
            <div className='bg-white/90 dark:bg-black/90 md:bg-transparent dark:md:bg-transparent flex items-center md:gap-5 relative rounded-t-md md:rounded-md'>
                <div className='top-0 left-0 w-full h-full md:p-3 md:w-auto md:h-auto absolute md:static basis-0 md:basis-2/5 overflow-hidden self-stretch rounded-t-md md:rounded-md'>
                    <img src={image} alt="" className='w-full h-full object-cover opacity-30 md:opacity-100'/>
                </div>
                <div className='basis-full md:basis-3/5 py-3 px-3 md:px-5 self-center relative z-10'>
                    <h2 className='text-2xl md:text-3xl font-bold text-orange-500 drop-shadow mb-2'>{title}</h2>
                    <p className='text-sm md:tex-lg text-indigo-700 dark:text-indigo-300 mb-3 md:mb-5'>{description}</p>
                    <WaveFormPlayer audioUrl={audioUrl} indicators className='mr-2'/>
                    <div className='mt-4 md:mt-8 flex gap-2'>
                        <Button secondary outline rounded>
                            <span className='flex items-center gap-2'><FaRegThumbsUp/> Add</span>
                        </Button>
                        <Button secondary outline rounded>
                            <span className='flex items-center gap-2'><FaShare/> Share</span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Listening;