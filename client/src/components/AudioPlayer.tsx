import {useState, useRef, useEffect} from "react";
import AudioSampleURL from '../assets/Building-and-maintaining-relationships-transcript.mp3';
import { FaArrowLeft, FaArrowRight, FaPlay, FaPause } from "react-icons/fa";


const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0)

    //References
    const audioPlayer = useRef<HTMLAudioElement>(); //ref to audio component
    const progressBar = useRef<HTMLInputElement>(); //ref to progress bar
    const animationRef = useRef<number>(); // ref to animation

    const calculateTime = (secs: number): string => {
        const minutes: number = Math.floor(secs / 60);
        const returnedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds: number = Math.floor(secs % 60);
        const returnedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;

    }

    useEffect(() => {
        const seconds: number = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;

    }, [audioPlayer?.current?.onloadedmetadata, audioPlayer?.current?.readyState]);
    const togglePlayPause = (): void => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if(!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }
    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
        setCurrentTime(progressBar.current.value);
    }
    return (
        <div className='flex bg-indigo-50/30 px-2 py-1 items-center rounded-xl'>
            <audio src={AudioSampleURL} preload='metadata' ref={audioPlayer}/>
            {/*<button className='flex items-center font-mono text-lg cursor-pointer hover:text-orange-500 transition-colors duration-300 text-indigo-700'><FaArrowLeft/>30</button>*/}
            <button onClick={togglePlayPause} className='mx-1 bg-orange-500 rounded-full w-10 h-10 text-xl text-indigo-50 flex justify-center items-center shadow-md hover:bg-indigo-300 transition-colors duration-300'>
                {isPlaying ? <FaPause className='m-0'/> : <FaPlay className='m-0 relative left-[2px]'/>}
            </button>
            {/*<button className='flex items-center font-mono text-lg cursor-pointer hover:text-orange-500 transition-colors duration-300 text-indigo-700'>30<FaArrowRight/></button>*/}
            {/*Current Time*/}
            <div className='font-mono text-lg ml-3 text-indigo-700'>{calculateTime(currentTime)}</div>
            {/*Progress bar*/}
            <div className=''>
                <input type="range" className={`relative w-full h-3 mx-1 outline-0 before:content-[""] before:bg-orange-500 before:h-3 before:rounded-tl-md before:rounded-bl-md before:absolute before:top-0 before:left-0 before:z-10 before:cursor-pointer`} defaultValue={0} ref={progressBar} onChange={changeRange}/>

            </div>

            {/*Duration*/}
            <div className='font-mono text-lg text-indigo-700 ml-2'>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        </div>
    )
}

export default AudioPlayer;