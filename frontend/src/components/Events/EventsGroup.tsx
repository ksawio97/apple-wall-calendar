import EventBox from "./EventBox";
import DayModel from "../../models/DayModel";
import ItemsIndicatorCarousel from "../ItemIndicator/ItemsIndicatorCarousel";
import { useMemo } from "react";

type EventsGroupProps = {
    groupKey: string,
    dayModel: DayModel,
    activeIndex: number,
    noText: boolean,
    marked: boolean,
    colSpan: number,
    showEvent: boolean,
    groupLayer: number
};

export default function EventsGroup({ groupKey, dayModel, activeIndex, noText, marked, colSpan, showEvent, groupLayer }: EventsGroupProps) {
    const eventsStartingTodayCount = useMemo(() => dayModel.getEventsCountDayStart(), [dayModel]);

    return (
        <>
            <div className={`row-start-2 row-end-3 w-full h-full ${marked ? 'bg-surface-container' : ''}`}>
                { eventsStartingTodayCount > 0 && <ItemsIndicatorCarousel carouselKey={`${groupKey}-${dayModel.day}`} count={eventsStartingTodayCount} activeIndex={groupLayer}></ItemsIndicatorCarousel> }
            </div>
            {/* when no event is active we need to render so grid pos will be occupied, when show event we just display active event */}
            { (activeIndex === -1 || showEvent) && <div className={`row-start-3 row-end-4 w-full h-full overflow-hidden px-1 ${marked ? 'bg-surface-container' : ''}`} style={{ gridColumn: `span ${colSpan}`}}> 
                { showEvent && <EventBox event={dayModel.events[activeIndex]} noText={noText}></EventBox>}
            </div> }
        </>
    );
}