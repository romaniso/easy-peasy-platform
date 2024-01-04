import React from "react";
import LbSkeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import classNames from "classnames";
import WaveSampleImg from "../assets/images/wave-sample.png";

interface SkeletonProps {
    items: number;
    card?: true;
    exercise?: true;
    tooltip?: true;
    soundWave?: true;
    className?: string;
}
const Skeleton: React.FC<SkeletonProps> = ({items, card, exercise, tooltip, soundWave,  className})=> {
    const skeletonClasses = classNames(
        className,
        "p-3 border border-white dark:border-gray-500 rounded-md shadow-lg relative",
        {
            "md:max-w-xs w-full h-full" : card,
            "w-full h-[70vh] flex flex-col lg:flex-row justify-between gap-5" : exercise,
            "w-full h-[150px] flex flex-col lg:flex-row justify-between border-none shadow-none" : tooltip,
            "w-full h-[50px] border-none shadow-none !p-0" : soundWave,
        }
    );
    return (
        Array(items)
            .fill(0)
            .map((_, index) => {
                if(card){
                    return <div key={index} className={skeletonClasses}>
                        <SkeletonTheme baseColor="#dcdcdc17" highlightColor="#9a9a9a38">
                            <LbSkeleton height={120} className='mb-3'/>
                            <LbSkeleton count={3} className='mb-2'/>
                            <LbSkeleton height={50}/>
                        </SkeletonTheme>
                    </div>
                }else if(exercise){
                    return <div key={index} className={skeletonClasses}>
                        <SkeletonTheme baseColor="#dcdcdc17" highlightColor="#9a9a9a38">
                            <div className='basis-2/3'>
                                <LbSkeleton height={30} className='mb-3'/>
                                <LbSkeleton height={120} className='mb-3'/>
                                <LbSkeleton count={8} className='mb-2'/>
                                <LbSkeleton height={30}/>
                            </div>
                            <div className='basis-1/3 hidden lg:block'>
                                <LbSkeleton height={60} className='mb-3'/>
                                <LbSkeleton count={12} className='mb-2'/>
                            </div>

                        </SkeletonTheme>
                    </div>
                }
                else if(tooltip) {
                    return <div key={index} className={skeletonClasses}>
                        <SkeletonTheme baseColor="#dcdcdc17" highlightColor="#9a9a9a38">
                            <LbSkeleton height={30} className='mb-3'/>
                            <LbSkeleton height={120} className='mb-3'/>
                            <LbSkeleton count={8} className='mb-2'/>
                            <LbSkeleton height={30}/>
                        </SkeletonTheme>
                    </div>
                }
                else if(soundWave){
                    return <div key={index} className={skeletonClasses}>
                        <SkeletonTheme baseColor="#dcdcdc17" highlightColor="#9a9a9a38">
                            <LbSkeleton height={50}/>
                            <img src={WaveSampleImg} alt="Sound Wave" className='absolute top-0 left-0 w-full z-10 h-full opacity-5 sepia'/>
                        </SkeletonTheme>
                    </div>
                }
            }));
}

export default Skeleton;