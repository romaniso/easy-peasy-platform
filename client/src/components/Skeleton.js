import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import classNames from "classnames";

function CustomSkeleton({items, card, exercise,  className}){
    const skeletonClasses = classNames(
        className,
        "p-3 border border-white dark:border-gray-500 rounded-md shadow-lg",
        {
            "md:max-w-xs w-full h-full" : card,
            "w-full h-[70vh] flex flex-col lg:flex-row justify-between gap-5" : exercise,
        }
    );
    return (
        Array(items)
            .fill(0)
            .map((_, index) => {
                if(card){
                    return <div key={index} className={skeletonClasses}>
                        <SkeletonTheme baseColor="#dcdcdc17" highlightColor="#9a9a9a38">
                            <Skeleton height={120} className='mb-3'/>
                            <Skeleton count={3} className='mb-2'/>
                            <Skeleton height={50}/>
                        </SkeletonTheme>
                    </div>
                }else if(exercise){
                    return <div key={index} className={skeletonClasses}>
                        <SkeletonTheme baseColor="#dcdcdc17" highlightColor="#9a9a9a38">
                            <div className='basis-2/3'>
                                <Skeleton height={30} className='mb-3'/>
                                <Skeleton height={120} className='mb-3'/>
                                <Skeleton count={8} className='mb-2'/>
                                <Skeleton height={30}/>
                            </div>
                            <div className='basis-1/3 hidden lg:block'>
                                <Skeleton height={60} className='mb-3'/>
                                <Skeleton count={12} className='mb-2'/>
                            </div>

                        </SkeletonTheme>
                    </div>
                }

            }));
}

export default CustomSkeleton;