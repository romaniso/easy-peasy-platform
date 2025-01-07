import { Icon, IconType } from "../common/icon/Icon";
import { Button } from "../common/Button";
import { WaveFormPlayer } from "../common/WaveFormPlayer";
import { Level } from "../../types/level";

interface ListeningProps {
  audioUrl: string;
  title: string;
  description: string;
  image: string;
  level: Level;
}

export const Listening = ({
  audioUrl,
  title,
  description,
  image,
  level,
}: ListeningProps): JSX.Element => {
  return (
    <>
      <div className="bg-white/90 dark:bg-black/90 md:bg-transparent dark:md:bg-transparent flex items-center md:gap-5 relative rounded-t-md md:rounded-md">
        <div className="top-0 left-0 w-full h-full md:p-3 md:w-auto md:h-auto absolute md:static basis-0 md:basis-2/5 overflow-hidden self-stretch rounded-t-md md:rounded-md">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover opacity-30 md:opacity-100"
          />
        </div>
        <div className="basis-full md:basis-3/5 py-3 px-3 md:px-5 self-center relative z-10">
          <span className="text-md font-bold font-mono text-indigo-700 absolute right-3 top-3 md:right-6 md:top-5 border border-indigo-500 px-1 py-0.5 md:px-2 md:py-1.5 rounded-md drop-shadow-md drop-shadow-purpleGlow">
            {level}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500 drop-shadow mb-2">
            {title}
          </h2>
          <p className="text-sm md:tex-lg text-indigo-700 dark:text-indigo-300 mb-3 md:mb-5">
            {description}
          </p>
          <WaveFormPlayer audioUrl={audioUrl} indicators className="mr-2" />
          <div className="mt-4 md:mt-8 flex gap-2">
            <Button secondary outline rounded small>
              <span className="flex items-center gap-2">
                <Icon type={IconType.ThumbsUp} /> Add
              </span>
            </Button>
            <Button secondary outline rounded small>
              <span className="flex items-center gap-2">
                <Icon type={IconType.Share} /> Share
              </span>
            </Button>
            <Button secondary outline rounded small className="ml-auto">
              <span className="flex items-center gap-2">
                <Icon type={IconType.Download} /> Download the script
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
