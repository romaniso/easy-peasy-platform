import { useState, useRef, useEffect } from "react";
import { MdZoomOutMap } from "react-icons/md";
import { FaCloudDownloadAlt, FaPlus, FaMinus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import { Modal } from "../Modal";

interface ImageProps {
  src: string;
  alt?: string;
  downloadable?: boolean;
}

export const Image = ({
  src,
  alt,
  downloadable = false,
  ...props
}: ImageProps): JSX.Element => {
  const [isOpened, setOpened] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    let isDragging = false;
    let prevPosition = { x: 0, y: 0 };

    // Mouse down event for starting the drag
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevPosition = { x: e.clientX, y: e.clientY };
    };

    // Mouse move event for dragging the image
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevPosition.x;
        const deltaY = e.clientY - prevPosition.y;
        prevPosition = { x: e.clientX, y: e.clientY };
        setPosition((position) => ({
          x: position.x + deltaX,
          y: position.y + deltaY,
        }));
      }
    };

    // Mouse up event for stopping the drag
    const handleMouseUp = () => {
      isDragging = false;
    };

    // Add event listeners
    image?.addEventListener("mousedown", handleMouseDown);
    image?.addEventListener("mousemove", handleMouseMove);
    image?.addEventListener("mouseup", handleMouseUp);

    // Remove event listeners on unmount
    return () => {
      image?.removeEventListener("mousedown", handleMouseDown);
      image?.removeEventListener("mousemove", handleMouseMove);
      image?.removeEventListener("mouseup", handleMouseUp);
    };
  }, [imageRef, scale]);

  const handleOpened = () => {
    resetTransform();
    setOpened(!isOpened);
  };

  const handleDownload = async () => {
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
  const resetTransform = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const transformStyle = {
    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
  };

  return (
    <>
      <div className="w-full relative">
        <MdZoomOutMap
          className="absolute text-2xl md:text-4xl bottom-2 right-2 md:bottom-7 md:right-7 p-1 bg-white dark:bg-black/30 rounded-md hover:scale-110 cursor-pointer transition-transform shadow-md"
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
          <div className="w-full h-full grid place-items-center md:py-2 md:px-4 relative md:overflow-hidden">
            <RxCross2
              className="text-2xl md:text-4xl absolute -top-1 -right-1 md:top-2 md:right-2 p-1 bg-indigo-500 dark:bg-white/20 rounded-md hover:scale-110 cursor-pointer transition-transform text-white dark:text-orange-500 shadow-md z-50"
              onClick={handleOpened}
            />
            <img
              src={src}
              alt={alt}
              className="w-full cursor-move select-none"
              draggable={false}
              style={transformStyle}
              ref={imageRef}
              {...props}
            />
            {downloadable && (
              <FaCloudDownloadAlt
                className="absolute -bottom-1 -right-1 md:bottom-2 md:right-2 text-2xl md:text-4xl p-1 bg-indigo-500 dark:bg-white/20 rounded-md hover:scale-110 cursor-pointer transition-transform text-white dark:text-orange-500 shadow-md"
                onClick={handleDownload}
              />
            )}
            <div className="absolute -top-1 -left-1 hidden md:top-2 md:left-2 md:flex flex-col items-center gap-1">
              {/* Zoom in and out - 100% + */}
              <FaPlus
                className="text-2xl md:text-4xl p-1 bg-indigo-500 dark:bg-white/20 rounded-md hover:scale-110 cursor-pointer transition-transform text-white dark:text-orange-500 shadow-md"
                onClick={handleZoomIn}
              />
              <FaMinus
                className="text-2xl md:text-4xl p-1 bg-indigo-500 dark:bg-white/20 rounded-md hover:scale-110 cursor-pointer transition-transform text-white dark:text-orange-500 shadow-md"
                onClick={handleZoomOut}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
