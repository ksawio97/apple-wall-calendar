import ItemIndicatorCarousel from "../ItemIndicatorCarousel";

type EventsIndicatorCarouselProps = {
    carouselKey: string,
    eventsCount: number,
    activeIndex: number,
    marked: boolean
}


export default function EventsIndicatorCarousel({ carouselKey, eventsCount, activeIndex, marked }: EventsIndicatorCarouselProps) {
    return (
        <div className='flex flex-row h-1 gap-2 px-1'>
            {Array.from({ length: eventsCount }).map((_, i) => {
                return (
                    <ItemIndicatorCarousel key={`${carouselKey}-${i}-carousel`} highlight={activeIndex === i}/>
                )
            })}
        </div>
    );
}