import { useCallback, useEffect, useMemo, useState } from "react";
import EventsGroup from "./EventsGroup";
import { DayModelWithGroupInfo } from "../Calendar/WeekGrid";
import { useEventGroupsService } from "../../hooks/useEventGroupsService";
import UID from "../../types/UID";

type EventsGroupGridWrapProps = {
    groupKey: string,
    dayModelWithGroupInfo: DayModelWithGroupInfo,
    weekIndex: number
}

export default function EventsGroupGridWrap({ groupKey, dayModelWithGroupInfo, weekIndex } : EventsGroupGridWrapProps) {
    // TODO check if I dont need to add evnent listeners here in the future
    const { getEventGroupsService } = useEventGroupsService();
    
    // active index is the index of the event that is currently shown
    const [activeIndex, setActiveIndex] = useState(-1);
    
    const getEventByUid = useCallback((uid: UID) => getEventGroupsService().getEventByUid(uid), [getEventGroupsService]);

    useEffect(() => {
        const index = dayModelWithGroupInfo.dayModel.events.findIndex((eventUid) => {
            return dayModelWithGroupInfo.groupInfo.activeGroupEvents.has(eventUid)
        });

        setActiveIndex(index);
    }, [dayModelWithGroupInfo]);
    // event start to show event title, event continuation shows event box that starts weeks above
    const [eventStartDay, eventContinuation] = useMemo(() => {
        if (activeIndex === -1)
            return [false, false];

        const event = getEventByUid(dayModelWithGroupInfo.dayModel.events[activeIndex]);
        if (event === undefined) {
            throw new Error("Working with old event data!")
        }
        const isEventStart = event.isFirstDisplayedDayOfEvent(dayModelWithGroupInfo.dayModel.day, weekIndex);
        const isMonday = dayModelWithGroupInfo.dayModel.day.getDay() === 1;
        // active event start or monday, 
        return [isEventStart || isMonday, !isEventStart && isMonday];
    }, [dayModelWithGroupInfo.dayModel, activeIndex, weekIndex]);

    // colSpan is the number of columns the event should span
    const colSpan = useMemo(() => {
        if (activeIndex === -1)
            return 1;
        if (!eventStartDay)
            return 0;
        const day = dayModelWithGroupInfo.dayModel.day;
        const weekDay = day.getDay() === 0 ? 7 : day.getDay();
        const event = getEventByUid(dayModelWithGroupInfo.dayModel.events[activeIndex]);
        if (event === undefined) {
            throw new Error("Working with old event data!")
        }
        const { startOfDay } = event.getFullDaysRange();
        // ensures that when its monday and not event start it has correct span
        const startToDayDiff = (day.getTime() - startOfDay.getTime()) / (1000 * 60 * 60 * 24);
        return Math.min(event.daysSpan() - startToDayDiff, (8 - weekDay));
    }, [eventStartDay, dayModelWithGroupInfo.dayModel, activeIndex]);

    return (
        <>
            <EventsGroup 
                groupKey={groupKey} 
                dayModelWithGroupInfo={dayModelWithGroupInfo} 
                activeIndex={activeIndex} 
                noText={eventContinuation} 
                colSpan={colSpan} 
                showEvent={eventStartDay} 
                weekIndex={weekIndex}></EventsGroup>
        </>
    )
}
