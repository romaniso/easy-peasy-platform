// React imports
import { useMemo } from "react";

// React-icons grouped by library
import {
  MdFamilyRestroom,
  MdOutlineWorkOutline,
  MdOutlineSelfImprovement,
  MdZoomOutMap,
  MdOutlineSportsFootball,
  MdOutlineScience,
  MdForest,
  MdOutlineEditNote,
  MdDragIndicator,
} from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import {
  CiLogin,
  CiViewList,
  CiTrophy,
  CiFootball,
  CiMusicNote1,
  CiLaptop,
  CiLogout,
  CiSettings,
  CiUser,
} from "react-icons/ci";
import { LuCopyPlus } from "react-icons/lu";
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
  FaWhatsapp,
  FaTiktok,
  FaInstagram,
  FaUpload,
} from "react-icons/fa";
import { FaRegTrashCan, FaXTwitter } from "react-icons/fa6";
import {
  BsChevronCompactLeft,
  BsChevronCompactRight,
  BsArrowLeftShort,
  BsListTask,
  BsBook,
  BsCollectionPlay,
  BsFillVolumeDownFill,
} from "react-icons/bs";
import {
  IoIosInformationCircleOutline,
  IoIosCloseCircle,
  IoIosFitness,
} from "react-icons/io";
import { IoLanguage } from "react-icons/io5";
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
  RiEditFill,
  RiAlarmWarningLine,
  RiMedicineBottleFill,
  RiLockPasswordLine,
  RiMoonLine,
  RiSunLine,
} from "react-icons/ri";
import {
  PiCaretUpDownLight,
  PiClockCountdownLight,
  PiMusicNotesFill,
  PiExamBold,
  PiBookOpenTextBold,
} from "react-icons/pi";
import { TiPen } from "react-icons/ti";
import { TbMickey, TbWorld } from "react-icons/tb";
import { LiaFacebookF } from "react-icons/lia";
import { GoGoal } from "react-icons/go";
import {
  HiOutlineDotsVertical,
  HiOutlineSpeakerphone,
  HiMenu,
  HiX,
} from "react-icons/hi";
import { SlPicture, SlSocialInstagram } from "react-icons/sl";
import { VscColorMode } from "react-icons/vsc";
import { IconBaseProps } from "react-icons";

// Define the types of icons available
export enum IconType {
  // Motivation section
  Career = "career",
  Culture = "culture",
  Emigration = "emigration",
  Exams = "exams",
  Family = "family",
  School = "school",
  SelfDevelopment = "self-development",
  Traveling = "traveling",

  // Profile section icons
  Form = "form",
  Interests = "interests",
  Motivation = "motivation",

  // Interests icons
  Animals = "animals",
  Art = "art",
  Beauty = "beauty",
  Cartoons = "cartoons",
  Cooking = "cooking",
  ContentMaking = "content-making",
  Economics = "economics",
  Fashion = "fashion",
  Films = "films",
  Fitness = "fitness",
  Gaming = "gaming",
  History = "history",
  IT = "it",
  Marketing = "marketing",
  Medicine = "medicine",
  Music = "music",
  Nature = "nature",
  Reading = "reading",
  Science = "science",
  SocialMedia = "social-media",
  Sports = "sports",

  // Common icons
  Achievement = "achievement",
  Add = "add",
  ArrowLeft = "arrow-left",
  Book = "book",
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
  Dashboard = "dashboard",
  Download = "download",
  Drag = "drag",
  Edit = "edit",
  Exclamation = "exclamation",
  ExclamationCircle = "exclamation-circle",
  Expand = "expand",
  Grid = "grid",
  Goal = "goal",
  Glossary = "glossary",
  Logout = "logout",
  Login = "login",
  List = "list",
  Media = "media",
  Minus = "minus",
  Moon = "moon",
  Note = "note",
  Password = "password",
  Pause = "pause",
  Picture = "picture",
  Play = "play",
  Plus = "plus",
  Question = "question",
  Recent = "recent",
  Reset = "reset",
  Save = "save",
  Search = "search",
  Settings = "settings",
  Share = "share",
  Sound = "sound",
  Star = "star",
  Sun = "sun",
  ThumbsDown = "thumbs-down",
  ThumbsUp = "thumbs-up",
  Tick = "tick",
  ThinCross = "thin-cross",
  TrashBin = "trash-bin",
  Upload = "upload",
  User = "user",
  VerticalDots = "vertical-dots",
  WarningBulb = "warning-bulb",

  // Social media icons
  Facebook = "facebook",
  Instagram = "instagram",
  Tiktok = "tiktok",
  Whatsapp = "whatsapp",
  XPlatform = "x-platform",

  // Settings icons
  ColorMode = "color-mode",
  Language = "language",
  World = "world",

  // Dictionary
  Dictionary = "dictionary",
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
        [IconType.Drag, (props) => <MdDragIndicator {...props} />],
        [IconType.Add, (props) => <LuCopyPlus {...props} />],
        [IconType.Upload, (props) => <FaUpload {...props} />],
        [IconType.Grid, (props) => <HiMenu {...props} />],
        [IconType.ThinCross, (props) => <HiX {...props} />],
        [IconType.Logout, (props) => <CiLogout {...props} />],
        [IconType.Settings, (props) => <CiSettings {...props} />],
        [IconType.User, (props) => <CiUser {...props} />],
        [IconType.ArrowLeft, (props) => <BsArrowLeftShort {...props} />],
        [IconType.List, (props) => <BsListTask {...props} />],
        [IconType.Book, (props) => <BsBook {...props} />],
        [IconType.Media, (props) => <BsCollectionPlay {...props} />],
        [IconType.Dashboard, (props) => <BiSolidDashboard {...props} />],
        [IconType.Moon, (props) => <RiMoonLine {...props} />],
        [IconType.Sun, (props) => <RiSunLine {...props} />],
        [IconType.Sound, (props) => <BsFillVolumeDownFill {...props} />],
        [IconType.Glossary, (props) => <PiBookOpenTextBold {...props} />],

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
        [IconType.Instagram, (props) => <FaInstagram {...props} />],
        [IconType.Tiktok, (props) => <FaTiktok {...props} />],
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

        // Settings icons
        [IconType.ColorMode, (props) => <VscColorMode {...props} />],
        [IconType.Password, (props) => <RiLockPasswordLine {...props} />],
        [IconType.Language, (props) => <IoLanguage {...props} />],
        [IconType.World, (props) => <TbWorld {...props} />],

        // Dictionary
        [IconType.Dictionary, (props) => <MdOutlineEditNote {...props} />],
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
