import EventBox from "./EventBox";
import ItemsIndicatorCarousel from "../ItemIndicator/ItemsIndicatorCarousel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DayModelWithGroupInfo } from "../Calendar/WeekGrid";
import { useEventGroupsService } from "../../hooks/useEventGroupsService";
import EventModel from "../../models/EventModel";
import EventGroupsService from "../../services/EventGroupsService";

type EventsGroupProps = {
    groupKey: string,
    dayModelWithGroupInfo: DayModelWithGroupInfo,
    activeIndex: number,
    noText: boolean,
    colSpan: number,
    showEvent: boolean,
    weekIndex: number
};

export default function EventsGroup({ groupKey, dayModelWithGroupInfo, activeIndex, noText, colSpan, showEvent, weekIndex }: EventsGroupProps) {
    const { getEventGroupsService, addEventsChangedListener, removeEventsChangedListener } = useEventGroupsService();
    const [eventsStartingTodayCount, setEventsStartingTodayCount] = useState(0);

    useEffect(() => {
        const updateCount = (eventsGroupsService: EventGroupsService) => {
            const dayEvents = dayModelWithGroupInfo.dayModel.events.map(uid => eventsGroupsService.getEventByUid(uid)).filter(Boolean) as EventModel[];
            setEventsStartingTodayCount(getEventsStartingTodayCount(dayEvents));
        };


        const eventsGroupsService = getEventGroupsService();
        updateCount(eventsGroupsService);

        const { "id": listenerId } = addEventsChangedListener((eventsGroupsService) => {
            updateCount(eventsGroupsService)
        });
        return () => {
            removeEventsChangedListener(listenerId); 
        };
    }, [getEventGroupsService, dayModelWithGroupInfo]);
    

    
    const activeEvent = useMemo(() => {
        const eventsGroupsService =  getEventGroupsService();
        return eventsGroupsService.getEventByUid(dayModelWithGroupInfo.dayModel.events[activeIndex]);
    }, [activeIndex, getEventGroupsService, dayModelWithGroupInfo])

    const getEventsStartingTodayCount = useCallback((events: EventModel[]) => {
        return events.filter((e) => e.isFirstDisplayedDayOfEvent(dayModelWithGroupInfo.dayModel.day, weekIndex)).length;
    }, [dayModelWithGroupInfo, weekIndex]);

    return (
        <>
            <div className={`row-start-2 row-end-3 w-full h-full ${dayModelWithGroupInfo.dayModel.marked ? 'bg-surface-container' : ''}`}>
                { eventsStartingTodayCount > 0 && <ItemsIndicatorCarousel carouselKey={`${groupKey}-${dayModelWithGroupInfo.dayModel.day}`} count={eventsStartingTodayCount} activeIndex={noText || !showEvent ? eventsStartingTodayCount : (dayModelWithGroupInfo.groupInfo.groupLayer % eventsStartingTodayCount)}></ItemsIndicatorCarousel> }
            </div>
            {/* when no event is active we need to render so grid pos will be occupied, when show event we just display active event */}
            { (activeIndex === -1 || showEvent) && <div className={`row-start-3 row-end-4 w-full h-full overflow-hidden px-1 ${dayModelWithGroupInfo.dayModel.marked ? 'bg-surface-container' : ''}`} style={{ gridColumn: `span ${colSpan}`}}> 
                { showEvent && activeEvent && <EventBox event={activeEvent} noText={noText}></EventBox>}
            </div> }
        </>
    );
}
