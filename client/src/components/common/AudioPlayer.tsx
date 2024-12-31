import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { getCalculatedStringifiedTime } from "../../utils/getCalculatedStringifiedTime";

interface AudioPlayerProps {
  audioUrl: string;
  className?: string;
}
export const AudioPlayer = ({
  audioUrl,
  className,
}: AudioPlayerProps): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  // References
  const audioPlayer = useRef<HTMLAudioElement>(null); // Ref to audio component
  const progressBar = useRef<HTMLInputElement>(null); // Ref to progress bar
  const animationRef = useRef<number>(0); // Ref to animation

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
      audioPlayer.current.addEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      audioPlayer.current.addEventListener("canplay", handleCanPlay);
    }

    return () => {
      if (audioPlayer.current) {
        audioPlayer.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioPlayer.current.removeEventListener("canplay", handleCanPlay);
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
    if (progressBar.current) {
      const progressBarValue =
        (parseFloat(progressBar.current.value) / duration) * 100;
      progressBar.current.style.setProperty(
        "--seek-before-width",
        `${progressBarValue}%`
      );
      setCurrentTime(parseFloat(progressBar.current.value));
    }
  };

  const renderedDuration: string = isNaN(duration)
    ? "00:00"
    : getCalculatedStringifiedTime(duration);

  return (
    <div className={`flex items-center ${className}`}>
      <audio src={audioUrl} ref={audioPlayer} />
      <button
        onClick={togglePlayPause}
        className="mx-1 bg-orange-500 rounded-full w-10 h-10 text-xl text-indigo-50 flex justify-center items-center shadow-md hover:bg-indigo-300 transition-colors duration-300"
      >
        {isPlaying ? (
          <FaPause className="m-0" />
        ) : (
          <FaPlay className="m-0 relative left-[2px]" />
        )}
      </button>
      <div className="font-mono text-lg ml-3 text-indigo-700 dark:text-indigo-400">
        {getCalculatedStringifiedTime(currentTime)}
      </div>
      <div className="flex-auto">
        <input
          type="range"
          className="relative cursor-pointer w-full h-3 mx-1 outline-0"
          defaultValue={0}
          ref={progressBar}
          onChange={changeRange}
        />
      </div>
      <div className="font-mono text-lg text-indigo-700 ml-2 dark:text-indigo-400">
        {renderedDuration}
      </div>
    </div>
  );
};
