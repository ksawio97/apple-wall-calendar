import EventBox from "./EventBox";
import ItemsIndicatorCarousel from "../ItemIndicator/ItemsIndicatorCarousel";
import { useMemo } from "react";
import { DayModelWithEvents } from "../Calendar/WeekGrid";

type EventsGroupProps = {
    groupKey: string,
    dayModelWithEvents: DayModelWithEvents,
    activeIndex: number,
    noText: boolean,
    colSpan: number,
    showEvent: boolean,
    weekIndex: number
};

export default function EventsGroup({ groupKey, dayModelWithEvents, activeIndex, noText, colSpan, showEvent, weekIndex }: EventsGroupProps) {
    const eventsStartingTodayCount = useMemo(() => dayModelWithEvents.dayModel.getEventsCountDayStart(weekIndex), [dayModelWithEvents, weekIndex]);

    return (
        <>
            <div className={`row-start-2 row-end-3 w-full h-full ${dayModelWithEvents.dayModel.marked ? 'bg-surface-container' : ''}`}>
                { eventsStartingTodayCount > 0 && <ItemsIndicatorCarousel carouselKey={`${groupKey}-${dayModelWithEvents.dayModel.day}`} count={eventsStartingTodayCount} activeIndex={noText || !showEvent ? eventsStartingTodayCount : (dayModelWithEvents.groupInfo.groupLayer % eventsStartingTodayCount)}></ItemsIndicatorCarousel> }
            </div>
            {/* when no event is active we need to render so grid pos will be occupied, when show event we just display active event */}
            { (activeIndex === -1 || showEvent) && <div className={`row-start-3 row-end-4 w-full h-full overflow-hidden px-1 ${dayModelWithEvents.dayModel.marked ? 'bg-surface-container' : ''}`} style={{ gridColumn: `span ${colSpan}`}}> 
                { showEvent && <EventBox event={dayModelWithEvents.dayModel.events[activeIndex]} noText={noText}></EventBox>}
            </div> }
        </>
    );
}