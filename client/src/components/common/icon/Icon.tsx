import { useMemo } from "react";
import { CiLogin } from "react-icons/ci";
import {
  FaCloudDownloadAlt,
  FaPlus,
  FaMinus,
  FaCheck,
  FaTimes,
  FaPause,
  FaPlay,
  FaSave,
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
  FaChevronLeft,
  FaSearch,
  FaExclamationCircle,
} from "react-icons/fa";
import {
  IoIosInformationCircleOutline,
  IoIosCloseCircle,
} from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { MdZoomOutMap } from "react-icons/md";
import { RiEditFill, RiAlarmWarningLine } from "react-icons/ri";
import { PiCaretUpDownLight } from "react-icons/pi";
import { LiaFacebookF } from "react-icons/lia";
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { IconBaseProps } from "react-icons";

// Define the types of icons available
export enum IconType {
  Login = "login",
  Tick = "tick",
  Cross = "cross",
  CrossCircle = "cross-circle",
  Exclamation = "exclamation",
  ExclamationCircle = "exclamation-circle",
  Reset = "reset",
  Expand = "expand",
  Plus = "plus",
  Minus = "minus",
  Download = "download",
  Pause = "pause",
  Play = "play",
  ChevronRight = "chevron-right",
  ChevronLeft = "chevron-left",
  ChevronUp = "chevron-up",
  ChevronDown = "chevron-down",
  ChevronUpDown = "chevron-up-down",
  Save = "save",
  Edit = "edit",
  Search = "search",
  Facebook = "facebook",
  Whatsapp = "whatsapp",
  XPlatform = "x-platform",
  WarningBulb = "warning-bulb",
}

// Interface for component props
interface IconProps extends IconBaseProps {
  className?: string;
  type: IconType;
}

// Icon component
/**
 * The Icon component renders a specific icon based on the provided type.
 * If the icon type is not found, it returns a <span> with the text "Icon not found".
 *
 * @param {IconProps} props - The props for the component such as callback event handlers.
 * @param {string} [props.className] - Optional className to apply to the icon.
 * @param {IconType} props.type - The type of the icon to render.
 * @returns {JSX.Element} The rendered icon or a <span> with the text "Icon not found".
 */
export const Icon = ({ className, type, ...props }: IconProps): JSX.Element => {
  const iconMap = useMemo(
    () =>
      new Map<IconType, (props: IconBaseProps) => JSX.Element>([
        // General icons
        [IconType.Login, (props) => <CiLogin {...props} />],
        [IconType.Tick, (props) => <FaCheck {...props} />],
        [IconType.Cross, (props) => <FaTimes {...props} />],
        [
          IconType.Exclamation,
          (props) => <IoIosInformationCircleOutline {...props} />,
        ],

        [IconType.Expand, (props) => <MdZoomOutMap {...props} />],
        [IconType.Minus, (props) => <FaMinus {...props} />],
        [IconType.Plus, (props) => <FaPlus {...props} />],
        [IconType.Download, (props) => <FaCloudDownloadAlt {...props} />],

        // Media player icons
        [IconType.Pause, (props) => <FaPause {...props} />],
        [IconType.Play, (props) => <FaPlay {...props} />],

        // Navigation icons
        [IconType.Reset, (props) => <GrPowerReset {...props} />],
        [IconType.ChevronRight, (props) => <FaChevronRight {...props} />],
        [IconType.ChevronLeft, (props) => <FaChevronLeft {...props} />],
        [IconType.ChevronUp, (props) => <FaChevronUp {...props} />],
        [IconType.ChevronDown, (props) => <FaChevronDown {...props} />],
        [IconType.ChevronUpDown, (props) => <PiCaretUpDownLight {...props} />],

        // Form icons
        [IconType.Save, (props) => <FaSave {...props} />],
        [IconType.Edit, (props) => <RiEditFill {...props} />],
        [IconType.Search, (props) => <FaSearch {...props} />],

        // Socila media icons
        [IconType.Facebook, (props) => <LiaFacebookF {...props} />],
        [IconType.Whatsapp, (props) => <FaWhatsapp {...props} />],
        [IconType.XPlatform, (props) => <FaXTwitter {...props} />],

        // Toast icons
        [
          IconType.ExclamationCircle,
          (props) => <FaExclamationCircle {...props} />,
        ],
        [IconType.CrossCircle, (props) => <IoIosCloseCircle {...props} />],
        [IconType.WarningBulb, (props) => <RiAlarmWarningLine {...props} />],
      ]),
    []
  );

  const IconComponent = iconMap.get(type);

  return IconComponent ? (
    <IconComponent className={className} {...props} />
  ) : (
    <span>Icon not found</span>
  );
};
