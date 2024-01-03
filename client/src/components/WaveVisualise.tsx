import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
// import {getCalculatedStringifiedTime} from "../utils/getCalculatedStringifiedTime";
import WaveSurfer from "wavesurfer.js";

interface WaveVisualise {
    audioUrl: string;
}
const WaveVisualise: React.FC<WaveVisualise> = ({audioUrl}) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    // const [duration, setDuration] = useState<number>(0);
    // const [currentTime, setCurrentTime] = useState<number>(0);
    // References
    // const audioPlayer = useRef<HTMLAudioElement>(null); // Ref to audio component
    // const progressBar = useRef<HTMLInputElement>(null); // Ref to progress bar
    // const animationRef = useRef<number>(0); // Ref to animation
    const waveformRef = useRef<HTMLInputElement>(null);
    let wavesurfer: WaveSurfer | null = null;

    useEffect(() => {
            wavesurfer = WaveSurfer.create({
                container: waveformRef.current as HTMLElement,
                waveColor: '#a5b4fc',
                progressColor: '#ff800d',
                url: audioUrl,
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
        return () => wavesurfer?.destroy()
    }, []);


    const togglePlayPause = (): void => {
        // setIsPlaying((prevState) => !prevState);
        if(wavesurfer) {
            wavesurfer.playPause();
            return;
        }
    };
    const waveStop = () => {
        if(wavesurfer) {
            wavesurfer.stop();
        }
    }
    const wavePlayPause = () => {
        if(wavesurfer) {
            wavesurfer.playPause();
        }
    }
    const waveSkipForward = () => {
        if(wavesurfer) {
            wavesurfer.skip(2);
        }
    }

    const waveSkipBakc = () => {
        if(wavesurfer) {
            wavesurfer.skip(-2);
        }
    }

    // const changePlayerCurrentTime = () => {
    //     if (progressBar.current) {
    //         const progressBarValue = (parseFloat(progressBar.current.value) / duration) * 100;
    //         progressBar.current.style.setProperty('--seek-before-width', `${progressBarValue}%`);
    //         setCurrentTime(parseFloat(progressBar.current.value));
    //     }
    // };

    // const renderedDuration: string = isNaN(duration)
    //     ? '00:00'
    //     : getCalculatedStringifiedTime(duration);

    return (
        <div className='flex bg-indigo-50/30 px-2 py-1 items-center rounded-xl w-full'>
            <button onClick={togglePlayPause} className='mx-1 bg-orange-500 rounded-full w-10 h-10 text-xl text-indigo-50 flex justify-center items-center shadow-md hover:bg-indigo-300 transition-colors duration-300'>
                {isPlaying ? <FaPause className='m-0' /> : <FaPlay className='m-0 relative left-[2px]' />}
            </button>
            {/*<div className='font-mono text-lg ml-3 text-indigo-700'>{getCalculatedStringifiedTime(currentTime)}</div>*/}
            <div className='w-full'>
                <div ref={waveformRef} className='wavesurfer-container'/>
            </div>
            {/*<div className='font-mono text-lg text-indigo-700 ml-2'>{renderedDuration}</div>*/}
        </div>
    );
};

export default WaveVisualise;
