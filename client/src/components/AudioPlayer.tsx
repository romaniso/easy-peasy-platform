import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

import AudioSampleURL from '../assets/Building-and-maintaining-relationships-transcript.mp3';

const AudioPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);

    // References
    const audioPlayer = useRef<HTMLAudioElement>(null); // Ref to audio component
    const progressBar = useRef<HTMLInputElement>(null); // Ref to progress bar
    const animationRef = useRef<number>(0); // Ref to animation

    const calculateTime = (secs: number): string => {
        const minutes: number = Math.floor(secs / 60);
        const returnedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds: number = Math.floor(secs % 60);
        const returnedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    };

    useEffect(() => {
        const handleLoadedMetadata = () => {
            const seconds: number = Math.floor(audioPlayer.current?.duration || 0);
            setDuration(seconds);
            if (progressBar.current) {
                progressBar.current.max = seconds.toString();
            }
        };

        const handleCanPlay = () => {
            if (!duration) {
                handleLoadedMetadata();
            }
        };

        if (audioPlayer.current) {
            audioPlayer.current.addEventListener('loadedmetadata', handleLoadedMetadata);
            audioPlayer.current.addEventListener('canplay', handleCanPlay);
        }

        return () => {
            if (audioPlayer.current) {
                audioPlayer.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioPlayer.current.removeEventListener('canplay', handleCanPlay);
            }
        };
    }, [audioPlayer?.current, duration, progressBar?.current]);


    const togglePlayPause = (): void => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue && audioPlayer.current) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else if (audioPlayer.current) {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    };

    const whilePlaying = () => {
        if (progressBar?.current && audioPlayer?.current) {
            progressBar.current.value = audioPlayer.current.currentTime.toString();
            changePlayerCurrentTime();
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
    };

    const changeRange = () => {
        if (audioPlayer.current && progressBar.current) {
            audioPlayer.current.currentTime = parseFloat(progressBar.current.value);
            changePlayerCurrentTime();
        }
    };

    const changePlayerCurrentTime = () => {
        console.log(duration);
        if (progressBar.current) {
            const progressBarValue = (parseFloat(progressBar.current.value) / duration) * 100;
            progressBar.current.style.setProperty('--seek-before-width', `${progressBarValue}%`);
            setCurrentTime(parseFloat(progressBar.current.value));
        }
    };

    const renderedDuration: string = isNaN(duration)
        ? '00:00'
        : calculateTime(duration);

    return (
        <div className='flex bg-indigo-50/30 px-2 py-1 items-center rounded-xl'>
            <audio src={AudioSampleURL} preload='metadata' ref={audioPlayer} />
            <button onClick={togglePlayPause} className='mx-1 bg-orange-500 rounded-full w-10 h-10 text-xl text-indigo-50 flex justify-center items-center shadow-md hover:bg-indigo-300 transition-colors duration-300'>
                {isPlaying ? <FaPause className='m-0' /> : <FaPlay className='m-0 relative left-[2px]' />}
            </button>
            <div className='font-mono text-lg ml-3 text-indigo-700'>{calculateTime(currentTime)}</div>
            <div className=''>
                <input type="range" className={`relative w-full h-3 mx-1 outline-0 before:content-[""] before:bg-orange-500 before:h-3 before:rounded-tl-md before:rounded-bl-md before:absolute before:top-0 before:left-0 before:z-10 before:cursor-pointer`} defaultValue={0} ref={progressBar} onChange={changeRange} />
            </div>
            <div className='font-mono text-lg text-indigo-700 ml-2'>{renderedDuration}</div>
        </div>
    );
};

export default AudioPlayer;
