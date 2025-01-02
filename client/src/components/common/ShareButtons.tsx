import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import { LiaFacebookF } from "react-icons/lia";
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";

interface ShareButtonsProps {
  currentUrl: string;
}

export const ShareButtons = ({
  currentUrl,
}: ShareButtonsProps): JSX.Element => {
  return (
    <>
      <p className="text-sm text-indigo-800 dark:text-indigo-200 mr-2">
        Share:
      </p>
      <FacebookShareButton url={currentUrl} hashtag="#easy-peasy-english">
        <span className="bg-blue-500 p-1.5 text-center rounded-md inline-flex justify-center items-center hover:px-5 transition-all duration-150 shadow-md">
          <LiaFacebookF className="text-white text-xl m-0" />
        </span>
      </FacebookShareButton>
      <TwitterShareButton url={currentUrl}>
        <span className="bg-black p-1.5 text-center rounded-md inline-flex justify-center items-center hover:px-5 transition-all duration-150 shadow-md">
          <FaXTwitter className="text-white text-xl m-0" />
        </span>
      </TwitterShareButton>
      <WhatsappShareButton url={currentUrl}>
        <span className="bg-green-500 p-1.5 text-center rounded-md inline-flex justify-center items-center hover:px-5 transition-all duration-150 shadow-md">
          <FaWhatsapp className="text-white text-xl m-0" />
        </span>
      </WhatsappShareButton>
    </>
  );
};
