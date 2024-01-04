import React, {useRef, useState, useEffect, LegacyRef} from 'react'
import { FaPlay, FaPause } from "react-icons/fa";
import WaveSurfer  from 'wavesurfer.js';
import {getCalculatedStringifiedTime} from "../utils/getCalculatedStringifiedTime";

interface WaveFormPlayer {
    audioUrl: string;
    className? : string;
}

const  WaveForm: React.FC<WaveFormPlayer> = ({audioUrl, className}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState<string>("00:00");
    const [currentTime, setCurrentTime] = useState<string>("00:00");

    const containerRef = useRef<HTMLDivElement | undefined>();
    const waveSurferRef = useRef({
        isPlaying: () => false,
    })
    const currentRef = useRef<HTMLDivElement | undefined>();
    const animationRef = useRef<number>(0);


    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current as HTMLElement,
            waveColor: '#a5b4fc',
            progressColor: '#ff800d',
            dragToSeek: true,
            width: '100%',
            height: 50,
            hideScrollbar: true,
            normalize: true,
            barGap: 1,
            barHeight: 20,
            barRadius: 20,
            barWidth: 3,
        })
        waveSurfer.load(audioUrl);
        waveSurfer.on('ready', () => {
             setDuration(getCalculatedStringifiedTime(waveSurfer.getDuration()));
            (waveSurferRef.current as WaveSurfer) = waveSurfer

        });


        return () => {
            waveSurfer.destroy()
        }
    }, [audioUrl])

    const togglePlayPause = () => {
        (waveSurferRef.current as WaveSurfer).playPause()
        setIsPlaying(waveSurferRef.current.isPlaying())
        if (!isPlaying) {
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        if (waveSurferRef?.current) {
            changePlayerCurrentTime();
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
    };

    const changePlayerCurrentTime = () => {
        const currentTimeValue = (getCalculatedStringifiedTime((waveSurferRef.current as  WaveSurfer).getCurrentTime()));
        setCurrentTime(currentTimeValue);
    };

    return  <div className={`flex items-center cursor-pointer relative ${className}`}>
        <button onClick={togglePlayPause}
                type="button" className='shrink-0 mr-4 bg-orange-500 rounded-full w-10 h-10 text-xl text-indigo-50 flex justify-center items-center shadow-md hover:bg-indigo-300 transition-colors duration-300'
        >{isPlaying ? <FaPause className='m-0'/> : <FaPlay className='m-0 relative left-[2px]'/>}
        </button>
        <div className='absolute left-11 -bottom-2 font-mono text-md text-indigo-300 dark:text-indigo-400 self-end dark:bg-white bg-stone-700/80 z-10 px-2 rounded-md shadow-md' ref={currentRef as LegacyRef<HTMLDivElement>}>{currentTime}</div>
        <div ref={containerRef as LegacyRef<HTMLDivElement> | undefined} className='w-full'/>
        <div className='absolute -right-2 -bottom-2 font-mono text-md text-indigo-300 dark:text-indigo-400 self-end dark:bg-white bg-stone-700/80 z-10 px-2 rounded-md shadow-md' >{duration}</div>
    </div>
}
export default WaveForm