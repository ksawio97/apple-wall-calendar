import { useEffect, useMemo, useState } from "react";
import EventsGroup from "./EventsGroup";
import { DayModelWithEvents } from "../Calendar/WeekGrid";

type EventsGroupGridWrapProps = {
    groupKey: string,
    dayModelWithEvents: DayModelWithEvents,
    weekIndex: number
}

export default function EventsGroupGridWrap({ groupKey, dayModelWithEvents, weekIndex } : EventsGroupGridWrapProps) {
    // active index is the index of the event that is currently shown
    const [activeIndex, setActiveIndex] = useState(-1);
    
    useEffect(() => {
        const index = dayModelWithEvents.dayModel.events.findIndex((day) => {
            return dayModelWithEvents.groupInfo.activeGroupEvents.has(day.uid)
        });

        setActiveIndex(index);
    }, [dayModelWithEvents]);
    // event start to show event title, event continuation shows event box that starts weeks above
    const [eventStartDay, eventContinuation] = useMemo(() => {
        if (activeIndex === -1)
            return [false, false];


        const isEventStart = dayModelWithEvents.dayModel.events[activeIndex].isFirstDisplayedDayOfEvent(dayModelWithEvents.dayModel.day, weekIndex);
        const isMonday = dayModelWithEvents.dayModel.day.getDay() === 1;
        // active event start or monday, 
        return [isEventStart || isMonday, !isEventStart && isMonday];
    }, [dayModelWithEvents.dayModel, activeIndex, weekIndex]);

    // colSpan is the number of columns the event should span
    const colSpan = useMemo(() => {
        if (activeIndex === -1)
            return 1;
        if (!eventStartDay)
            return 0;
        const day = dayModelWithEvents.dayModel.day;
        const weekDay = day.getDay() === 0 ? 7 : day.getDay();
        const { startOfDay } = dayModelWithEvents.dayModel.events[activeIndex].getFullDaysRange();
        // ensures that when its monday and not event start it has correct span
        const startToDayDiff = (day.getTime() - startOfDay.getTime()) / (1000 * 60 * 60 * 24);
        return Math.min(dayModelWithEvents.dayModel.events[activeIndex].daysSpan() - startToDayDiff, (8 - weekDay));
    }, [eventStartDay, dayModelWithEvents.dayModel, activeIndex]);

    return (
        <>
            <EventsGroup 
                groupKey={groupKey} 
                dayModelWithEvents={dayModelWithEvents} 
                activeIndex={activeIndex} 
                noText={eventContinuation} 
                colSpan={colSpan} 
                showEvent={eventStartDay} 
                weekIndex={weekIndex}></EventsGroup>
        </>
    )
}