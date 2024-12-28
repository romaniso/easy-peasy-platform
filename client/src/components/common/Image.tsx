import { useState, useRef } from "react";
import { MdZoomOutMap } from "react-icons/md";
import { FaCloudDownloadAlt, FaPlus, FaMinus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import Modal from "./Modal";

interface ImageProps {
  src: string;
  alt?: string;
}

export const Image = ({ src, alt, ...props }: ImageProps): JSX.Element => {
  const [isOpened, setOpened] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const imageRef = useRef<HTMLImageElement>(null);

  const handleOpened = () => {
    setOpened(!isOpened);
  };

  const handleDownload = async () => {
    console.log(`Downloading file ${src}...`);
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const imageUrl = `${proxyUrl}${src}`;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      const fileName = imageUrl.split("/").pop();
      a.download = fileName as string;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Error downloading the image", err);
    }
  };

  const handleZoomIn = () => {
    setScale((scale) => scale + 0.1);
  };
  const handleZoomOut = () => {
    setScale((scale) => scale - 0.1);
  };

  const transformStyle = {
    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
  };

  return (
    <>
      <div className="w-full relative">
        <MdZoomOutMap
          className="text-4xl absolute bottom-7 right-7 p-1 bg-white dark:bg-black/30 rounded-md hover:scale-110 cursor-pointer transition-transform shadow-md"
          onClick={handleOpened}
        />
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full hover:cursor-zoom-in"
            {...props}
            onClick={handleOpened}
          />
        ) : (
          <p className="image-caption">{alt}</p>
        )}
      </div>
      {isOpened && (
        <Modal onClose={() => setOpened(false)} size="md:w-2/3 md:h-3/4">
          <div className="w-full h-full grid place-items-center md:py-2 md:px-4 relative overflow-hidden">
            <RxCross2
              className="text-4xl absolute top-2 right-2 p-1 bg-indigo-500 dark:bg-white/20 rounded-md hover:scale-110 cursor-pointer transition-transform text-white dark:text-orange-500 shadow-md"
              onClick={handleOpened}
            />
            <img
              src={src}
              alt={alt}
              className="w-full cursor-move select-none"
              draggable={false}
              style={transformStyle}
              {...props}
            />
            <FaCloudDownloadAlt
              className="absolute bottom-2 right-2 text-4xl p-1 bg-indigo-500 dark:bg-white/20 rounded-md hover:scale-110 cursor-pointer transition-transform text-white dark:text-orange-500 shadow-md"
              onClick={handleDownload}
            />
            <div className="absolute top-2 left-2 flex flex-col items-center gap-1">
              {/* Zoom in and out - 100% + */}
              <FaPlus
                className="text-4xl p-1 bg-indigo-500 dark:bg-white/20 rounded-md hover:scale-110 cursor-pointer transition-transform text-white dark:text-orange-500 shadow-md"
                onClick={handleZoomIn}
              />
              <FaMinus
                className="text-4xl p-1 bg-indigo-500 dark:bg-white/20 rounded-md hover:scale-110 cursor-pointer transition-transform text-white dark:text-orange-500 shadow-md"
                onClick={handleZoomOut}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
