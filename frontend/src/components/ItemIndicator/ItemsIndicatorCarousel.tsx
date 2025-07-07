import { useEffect, useState } from "react";
import ArrowLeft from "../../icons/ArrowLeft";
import ArrowRight from "../../icons/ArrowRight";
import ItemIndicator from "./ItemIndicator";

type ItemsIndicatorCarouselProps = {
    carouselKey: string,
    count: number,
    activeIndex: number
}

const MAX_SIZE = 3;

export default function ItemsIndicatorCarousel({ carouselKey, count, activeIndex }: ItemsIndicatorCarouselProps) {
    const [animate, setAnimate] = useState(false);
    
    useEffect(() => {
        if (activeIndex >= count)
            return;

        setAnimate(true); // trigger fade
        const timeout = setTimeout(() => {
            setAnimate(false); // reset animation
        }, 500); // must match duration of animation

        return () => clearTimeout(timeout);
    }, [activeIndex, count]);

    const layers = Math.floor(activeIndex / 3);
    return (
        <div className='flex flex-row px-4 py-1 items-center'>
            {  layers !== 0 && 
            <ArrowLeft className="h-fit w-fit fill-gray-400"></ArrowLeft> }
            <div className={`transition-all duration-500 flex flex-row gap-1 ${animate ? '-translate-x-2 opacity-0' : 'translate-x-0 opacity-100'}`}>
                {Array.from({ length: Math.min(MAX_SIZE, count - layers * 3) }).map((_, i) => {
                    return (
                        <ItemIndicator key={`${carouselKey}-${i}-carousel`} highlight={activeIndex === i }/>
                    )
                })}
            </div>
            { Math.floor(activeIndex / 3) !== Math.floor(count / 3) && count > MAX_SIZE &&
            <ArrowRight className="h-fit w-fit fill-gray-400"></ArrowRight> }
        </div>
    );
}