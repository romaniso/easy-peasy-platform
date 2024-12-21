import { useState } from "react";
import { MdZoomOutMap } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import Modal from "./Modal";

interface ImageProps {
  src: string;
  alt?: string;
}

export const Image = ({ src, alt, ...props }: ImageProps): JSX.Element => {
  const [isZoomedIn, setZoomedIn] = useState(false);

  const handleZoom = () => {
    setZoomedIn(!isZoomedIn);
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

  return (
    <>
      <div className="w-full relative">
        <MdZoomOutMap
          className="text-4xl absolute bottom-7 right-7 p-1 bg-white dark:bg-black/30 rounded-md hover:scale-110 cursor-pointer transition-transform shadow-md"
          onClick={handleZoom}
        />
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full hover:cursor-zoom-in"
            {...props}
            onClick={handleZoom}
          />
        ) : (
          <p className="image-caption">{alt}</p>
        )}
      </div>
      {isZoomedIn && (
        <Modal onClose={() => setZoomedIn(false)} size="md:w-2/3 md:h-3/4">
          <div className="w-full h-full grid place-items-center md:py-2 md:px-4 relative">
            <RxCross2
              className="text-4xl absolute top-2 right-2 p-1 bg-indigo-500 dark:bg-white/20 rounded-md hover:scale-110 cursor-pointer transition-transform text-white dark:text-orange-500 shadow-md"
              onClick={handleZoom}
            />
            <img src={src} alt={alt} className="w-full" {...props} />
            <div className="absolute bottom-2 right-2 flex items-center gap-3">
              {/* Zoom in and out - 100% + */}
              <FaCloudDownloadAlt
                className="text-4xl p-1 bg-indigo-500 dark:bg-white/20 rounded-md hover:scale-110 cursor-pointer transition-transform text-white dark:text-orange-500 shadow-md"
                onClick={handleDownload}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
