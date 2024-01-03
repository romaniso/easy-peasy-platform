import AudioPlayer from "../AudioPlayer";
import { FaRegThumbsUp, FaShare } from "react-icons/fa";
import React from "react";
import Button from "../Button";

const Listening = () => {
    return (
        <>
            <header className='flex items-center gap-5'>
                <div className='basis-2/5'>
                    <img src="https://picsum.photos/800/400" alt="" className='w-full'/>
                </div>
                <div className='basis-3/5'>
                    <h2 className='text-3xl font-bold text-orange-500 drop-shadow mb-2'>Heading</h2>
                    <p className='tex-lg text-indigo-700 mb-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, optio! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, optio!</p>
                    <AudioPlayer audioUrl='https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'/>
                    <div className='mt-8 flex gap-2'>
                        <Button secondary outline rounded>
                            <span className='flex items-center gap-2'><FaRegThumbsUp/> Add</span>
                        </Button>
                        <Button secondary outline rounded>
                            <span className='flex items-center gap-2'><FaShare/> Share</span>
                        </Button>
                    </div>
                </div>
            </header>
            <main>
                Exercise
            </main>
        </>
    )
}

export default Listening;