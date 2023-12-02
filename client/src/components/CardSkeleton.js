import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

function CardSkeleton({cards}){
    return (
        Array(cards)
            .fill(0)
            .map((_, index) => (
                <div key={index} className='md:max-w-xs w-full h-full p-3 border border-white dark:border-gray-500 rounded-md shadow-lg'>
                    <SkeletonTheme baseColor="#dcdcdc17" highlightColor="#9a9a9a38">
                        <Skeleton height={120} className='mb-3'/>
                        <Skeleton count={3} className='mb-2'/>
                        <Skeleton height={50}/>
                    </SkeletonTheme>
                </div>)
            ));
}

export default CardSkeleton;