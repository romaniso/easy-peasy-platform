import { useMemo } from "react";
import {
  MdFamilyRestroom,
  MdOutlineWorkOutline,
  MdOutlineSelfImprovement,
} from "react-icons/md";
import {
  CiLogin,
  CiViewList,
  CiTrophy,
  CiFootball,
  CiMusicNote1,
  CiLaptop,
} from "react-icons/ci";
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
  FaShare,
  FaStar,
  FaExclamationCircle,
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaQuestionCircle,
  FaSortAlphaDown,
  FaSchool,
  FaUmbrellaBeach,
  FaFlagUsa,
  FaFilm,
  FaBookReader,
  FaPaintBrush,
  FaGamepad,
} from "react-icons/fa";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import {
  IoIosInformationCircleOutline,
  IoIosCloseCircle,
  IoIosFitness,
} from "react-icons/io";
import { GrPowerReset, GrAchievement } from "react-icons/gr";
import {
  GiRoad,
  GiFlowerHat,
  GiAncientColumns,
  GiReceiveMoney,
  GiButterfly,
  GiCat,
  GiCook,
} from "react-icons/gi";
import {
  MdZoomOutMap,
  MdOutlineSportsFootball,
  MdOutlineScience,
  MdForest,
} from "react-icons/md";
import {
  RiEditFill,
  RiAlarmWarningLine,
  RiMedicineBottleFill,
} from "react-icons/ri";
import {
  PiCaretUpDownLight,
  PiClockCountdownLight,
  PiMusicNotesFill,
  PiExamBold,
} from "react-icons/pi";
import { TiPen } from "react-icons/ti";
import { TbMickey } from "react-icons/tb";
import { LiaFacebookF } from "react-icons/lia";
import { FaWhatsapp, FaXTwitter, FaRegTrashCan } from "react-icons/fa6";
import { GoGoal } from "react-icons/go";
import { HiOutlineDotsVertical, HiOutlineSpeakerphone } from "react-icons/hi";
import { SlPicture, SlSocialInstagram } from "react-icons/sl";
import { IconBaseProps } from "react-icons";

// Define the types of icons available
export enum IconType {
  // Motivation section
  Family = "family",
  Career = "career",
  School = "school",
  Traveling = "traveling",
  Exams = "exams",
  SelfDevelopment = "self-development",
  Emigration = "emigration",
  Culture = "culture",

  // Profile section icons
  Form = "form",
  Motivation = "motivation",
  Interests = "interests",

  // Interests icons
  Music = "music",
  Films = "films",
  IT = "it",
  Reading = "reading",
  Art = "art",
  Gaming = "gaming",
  Sports = "sports",
  Fashion = "fashion",
  Science = "science",
  Nature = "nature",
  History = "history",
  Economics = "economics",
  Marketing = "marketing",
  Beauty = "beauty",
  Animals = "animals",
  SocialMedia = "social-media",
  Medicine = "medicine",
  Cooking = "cooking",
  Fitness = "fitness",
  ContentMaking = "content-making",
  Cartoons = "cartoons",

  Achievement = "achievement",
  ByAlphabet = "by-alphabet",
  ChevronCompactLeft = "chevron-compact-left",
  ChevronCompactRight = "chevron-compact-right",
  ChevronDown = "chevron-down",
  ChevronLeft = "chevron-left",
  ChevronRight = "chevron-right",
  ChevronUp = "chevron-up",
  ChevronUpDown = "chevron-up-down",
  Cross = "cross",
  CrossCircle = "cross-circle",
  VerticalDots = "vertical-dots",
  Download = "download",
  Edit = "edit",
  Exclamation = "exclamation",
  ExclamationCircle = "exclamation-circle",
  Expand = "expand",
  Facebook = "facebook",
  Goal = "goal",
  Login = "login",
  Minus = "minus",
  Note = "note",
  Pause = "pause",
  Picture = "picture",
  Play = "play",
  Plus = "plus",
  Question = "question",
  Recent = "recent",
  Reset = "reset",
  Save = "save",
  Search = "search",
  Share = "share",
  Star = "star",
  ThumbsDown = "thumbs-down",
  ThumbsUp = "thumbs-up",
  Tick = "tick",
  TrashBin = "trash-bin",
  WarningBulb = "warning-bulb",
  Whatsapp = "whatsapp",
  XPlatform = "x-platform",
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
        [IconType.ThumbsUp, (props) => <FaRegThumbsUp {...props} />],
        [IconType.ThumbsDown, (props) => <FaRegThumbsDown {...props} />],
        [IconType.Question, (props) => <FaQuestionCircle {...props} />],
        [IconType.Share, (props) => <FaShare {...props} />],
        [
          IconType.VerticalDots,
          (props) => <HiOutlineDotsVertical {...props} />,
        ],

        // Glossary icons
        [IconType.Star, (props) => <FaStar {...props} />],
        [IconType.TrashBin, (props) => <FaRegTrashCan {...props} />],
        [IconType.ByAlphabet, (props) => <FaSortAlphaDown {...props} />],
        [IconType.Recent, (props) => <PiClockCountdownLight {...props} />],
        [IconType.Note, (props) => <PiMusicNotesFill {...props} />],

        // Media player icons
        [IconType.Pause, (props) => <FaPause {...props} />],
        [IconType.Play, (props) => <FaPlay {...props} />],

        // Navigation icons
        [IconType.Reset, (props) => <GrPowerReset {...props} />],
        [IconType.ChevronRight, (props) => <FaChevronRight {...props} />],
        [
          IconType.ChevronCompactRight,
          (props) => <BsChevronCompactRight {...props} />,
        ],
        [IconType.ChevronLeft, (props) => <FaChevronLeft {...props} />],
        [
          IconType.ChevronCompactLeft,
          (props) => <BsChevronCompactLeft {...props} />,
        ],
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

        // Stats icons
        [IconType.Achievement, (props) => <GrAchievement {...props} />],
        [IconType.Goal, (props) => <GoGoal {...props} />],

        // Profile icons
        [IconType.Picture, (props) => <SlPicture {...props} />],
        [IconType.Form, (props) => <CiViewList {...props} />],
        [IconType.Motivation, (props) => <CiTrophy {...props} />],
        [IconType.Interests, (props) => <CiFootball {...props} />],

        // Motivation icons
        [IconType.Family, (props) => <MdFamilyRestroom {...props} />],
        [IconType.Career, (props) => <MdOutlineWorkOutline {...props} />],
        [IconType.School, (props) => <FaSchool {...props} />],
        [IconType.Traveling, (props) => <FaUmbrellaBeach {...props} />],
        [IconType.Exams, (props) => <PiExamBold {...props} />],
        [
          IconType.SelfDevelopment,
          (props) => <MdOutlineSelfImprovement {...props} />,
        ],
        [IconType.Emigration, (props) => <GiRoad {...props} />],
        [IconType.Culture, (props) => <FaFlagUsa {...props} />],

        // Interests icons
        [IconType.Music, (props) => <CiMusicNote1 {...props} />],
        [IconType.Films, (props) => <FaFilm {...props} />],
        [IconType.IT, (props) => <CiLaptop {...props} />],
        [IconType.Reading, (props) => <FaBookReader {...props} />],
        [IconType.Art, (props) => <FaPaintBrush {...props} />],
        [IconType.Gaming, (props) => <FaGamepad {...props} />],
        [IconType.Sports, (props) => <MdOutlineSportsFootball {...props} />],
        [IconType.Fashion, (props) => <GiFlowerHat {...props} />],
        [IconType.Science, (props) => <MdOutlineScience {...props} />],
        [IconType.Nature, (props) => <MdForest {...props} />],
        [IconType.History, (props) => <GiAncientColumns {...props} />],
        [IconType.Economics, (props) => <GiReceiveMoney {...props} />],
        [IconType.Marketing, (props) => <HiOutlineSpeakerphone {...props} />],
        [IconType.Beauty, (props) => <GiButterfly {...props} />],
        [IconType.Animals, (props) => <GiCat {...props} />],
        [IconType.SocialMedia, (props) => <SlSocialInstagram {...props} />],
        [IconType.Medicine, (props) => <RiMedicineBottleFill {...props} />],
        [IconType.Cooking, (props) => <GiCook {...props} />],
        [IconType.Fitness, (props) => <IoIosFitness {...props} />],
        [IconType.ContentMaking, (props) => <TiPen {...props} />],
        [IconType.Cartoons, (props) => <TbMickey {...props} />],
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
