import LbSkeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import classNames from "classnames";
import WaveSampleImg from "../../assets/images/wave-sample.png";

interface SkeletonProps {
  items: number;
  card?: boolean;
  exercise?: boolean;
  tooltip?: boolean;
  soundWave?: boolean;
  className?: string;
}

export const Skeleton = ({
  items,
  card,
  exercise,
  tooltip,
  soundWave,
  className,
}: SkeletonProps): JSX.Element => {
  const skeletonClasses = classNames(
    className,
    "p-3 border border-white dark:border-gray-500 rounded-md shadow-lg relative",
    {
      "md:max-w-xs w-full h-full": card,
      "w-full h-[70vh] flex flex-col lg:flex-row justify-between gap-5":
        exercise,
      "w-full h-[150px] flex flex-col lg:flex-row justify-between border-none shadow-none":
        tooltip,
      "w-full h-[50px] border-none shadow-none !p-0": soundWave,
    }
  );

  const renderSkeletonItem = (index: number): JSX.Element | null => {
    if (card) {
      return (
        <div key={index} className={skeletonClasses}>
          <SkeletonTheme baseColor="#dcdcdc17" highlightColor="#9a9a9a38">
            <LbSkeleton height={120} className="mb-3" />
            <LbSkeleton count={3} className="mb-2" />
            <LbSkeleton height={50} />
          </SkeletonTheme>
        </div>
      );
    } else if (exercise) {
      return (
        <div key={index} className={skeletonClasses}>
          <SkeletonTheme baseColor="#dcdcdc17" highlightColor="#9a9a9a38">
            <div className="basis-2/3">
              <LbSkeleton height={30} className="mb-3" />
              <LbSkeleton height={120} className="mb-3" />
              <LbSkeleton count={8} className="mb-2" />
              <LbSkeleton height={30} />
            </div>
            <div className="basis-1/3 hidden lg:block">
              <LbSkeleton height={60} className="mb-3" />
              <LbSkeleton count={12} className="mb-2" />
            </div>
          </SkeletonTheme>
        </div>
      );
    } else if (tooltip) {
      return (
        <div key={index} className={skeletonClasses}>
          <SkeletonTheme baseColor="#dcdcdc17" highlightColor="#9a9a9a38">
            <LbSkeleton height={30} className="mb-3" />
            <LbSkeleton height={120} className="mb-3" />
            <LbSkeleton count={8} className="mb-2" />
            <LbSkeleton height={30} />
          </SkeletonTheme>
        </div>
      );
    } else if (soundWave) {
      return (
        <div key={index} className={skeletonClasses}>
          <SkeletonTheme baseColor="#dcdcdc17" highlightColor="#9a9a9a38">
            <LbSkeleton height={50} />
            <img
              src={WaveSampleImg}
              alt="Sound Wave"
              className="absolute top-0 left-0 w-full z-10 h-full opacity-5 sepia"
            />
          </SkeletonTheme>
        </div>
      );
    }
    return null;
  };

  const skeletonItems = Array(items)
    .fill(0)
    .map((_, index) => renderSkeletonItem(index))
    .filter((element): element is JSX.Element => element !== null);

  return <>{skeletonItems}</>;
};
