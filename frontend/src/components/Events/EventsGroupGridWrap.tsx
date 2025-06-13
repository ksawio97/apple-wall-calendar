import { useEffect, useMemo, useState } from "react";
import DayModel from "../../models/DayModel"
import EventsGroup from "./EventsGroup"

type EventsGroupGridWrapProps = {
    groupKey: string,
    dayModel: DayModel,
    activeGroupEvents: Set<string>,
    marked: boolean,
    groupLayer: number
}

export default function EventsGroupGridWrap({ groupKey, dayModel, activeGroupEvents, marked, groupLayer } : EventsGroupGridWrapProps) {
    const [activeIndex, setActiveIndex] = useState(-1);
    
    useEffect(() => {
        const index = dayModel.events.findIndex((day) => {
            return activeGroupEvents.has(day.uid)
        });

        setActiveIndex(index);
    }, [activeGroupEvents, dayModel]);
    // event start to show event title, event continuation shows event box that starts weeks above
    const [eventStartDay, eventContinuation] = useMemo(() => {
        if (activeIndex === -1)
            return [false, false];
        const isEventStart = dayModel.events[activeIndex].isFirstDayOfEvent(dayModel.day);
        const isMonday = dayModel.day.getDay() === 1;
        // active event start or monday, 
        return [isEventStart || isMonday, !isEventStart && isMonday];
    }, [dayModel, activeIndex]);

    const colSpan = useMemo(() => {
        if (!eventStartDay)
            return 0;
        const weekDay = dayModel.day.getDay() === 0 ? 7 : dayModel.day.getDay();
        const { startOfDay } = dayModel.events[activeIndex].getFullDaysRange();
        // ensures that when its monday and not event start it has correct span
        const startToDayDiff = (dayModel.day.getTime() - startOfDay.getTime()) / (1000 * 60 * 60 * 24);
        return Math.min(dayModel.events[activeIndex].daysSpan() - startToDayDiff, (8 - weekDay));
    }, [eventStartDay, dayModel, activeIndex]);

    return (
        <>
        <EventsGroup groupKey={groupKey} dayModel={dayModel} activeIndex={activeIndex} noText={eventContinuation} marked={marked} colSpan={colSpan} showEvent={eventStartDay} groupLayer={groupLayer}></EventsGroup>
        </>
    )
}