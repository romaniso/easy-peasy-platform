import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Icon, IconType } from "./icon/Icon";

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
          <Icon className="text-white text-xl m-0" type={IconType.Facebook} />
        </span>
      </FacebookShareButton>
      <TwitterShareButton url={currentUrl}>
        <span className="bg-black p-1.5 text-center rounded-md inline-flex justify-center items-center hover:px-5 transition-all duration-150 shadow-md">
          <Icon className="text-white text-xl m-0" type={IconType.XPlatform} />
        </span>
      </TwitterShareButton>
      <WhatsappShareButton url={currentUrl}>
        <span className="bg-green-500 p-1.5 text-center rounded-md inline-flex justify-center items-center hover:px-5 transition-all duration-150 shadow-md">
          <Icon className="text-white text-xl m-0" type={IconType.Whatsapp} />
        </span>
      </WhatsappShareButton>
    </>
  );
};
