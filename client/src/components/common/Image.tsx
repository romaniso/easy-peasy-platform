import { useEffect, useState } from "react";
import { MdZoomOutMap, MdZoomInMap } from "react-icons/md";
import Modal from "./Modal";

interface Props {
  src: string;
  alt?: string;
}

export const Image = ({ src, alt, ...props }: Props) => {
  const [isZoomedIn, setZoomedIn] = useState(false);

  const handleZoom = () => {
    setZoomedIn(!isZoomedIn);
  };

  useEffect(() => {
    console.log(isZoomedIn);
  }, [isZoomedIn]);

  return (
    <>
      <div className="w-full relative">
        <MdZoomOutMap
          className="text-4xl absolute bottom-7 right-7 p-1 bg-white dark:bg-black/30 rounded-md hover:scale-110 cursor-pointer transition-transform shadow-md"
          onClick={handleZoom}
        />
        {src ? (
          <img src={src} alt={alt} className="w-full" {...props} />
        ) : (
          <p className="image-caption">{alt}</p>
        )}
      </div>
      {isZoomedIn && (
        <Modal onClose={() => setZoomedIn(false)} size="md:w-2/3 md:h-3/4">
          <div className="w-full h-full grid place-items-center md:py-2 md:px-4 relative">
            <MdZoomInMap
              className="text-4xl absolute bottom-7 right-7 p-1 bg-indigo-500 dark:bg-white/20 rounded-md hover:scale-110 cursor-pointer transition-transform text-white dark:text-orange-500 shadow-md"
              onClick={handleZoom}
            />
            <img src={src} alt={alt} className="w-full" {...props} />
          </div>
        </Modal>
      )}
    </>
  );
};
