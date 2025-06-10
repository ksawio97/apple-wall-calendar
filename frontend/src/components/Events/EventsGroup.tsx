import EventBox from "./EventBox";
import DayModel from "../../models/DayModel";
import EventsIndicatorCarousel from "./EventsIndicatorCarousel";

type EventsGroupProps = {
    groupKey: string,
    dayModel: DayModel,
    activeIndex: number,
    noText: boolean,
    marked: boolean,
    colSpan: number,
    showEvent: boolean
};

export default function EventsGroup({ groupKey, dayModel, activeIndex, noText, marked, colSpan, showEvent }: EventsGroupProps) {
    return (
        <>
            <div className={`row-start-2 row-end-3 w-full h-full ${marked ? 'bg-slate-300' : ''}`}>
                { dayModel.events.length > 0 && <EventsIndicatorCarousel carouselKey={`${groupKey}-${dayModel.day}`} eventsCount={dayModel.events.length} activeIndex={showEvent ? activeIndex : -1} marked={marked}></EventsIndicatorCarousel> }
            </div>
            {/* when no event is active we need to render so grid pos will be occupied, when show event we just display active event */}
            { (activeIndex === -1 || showEvent) && <div className={`row-start-3 row-end-4 w-full h-full overflow-hidden ${marked ? 'bg-slate-300' : ''}`} style={{ gridColumn: `span ${colSpan}`}}> 
                { showEvent && <EventBox event={dayModel.events[activeIndex]} noText={noText}></EventBox>}
            </div> }
        </>
    );
}