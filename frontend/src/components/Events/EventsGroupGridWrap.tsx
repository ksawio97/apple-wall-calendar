import { useEffect, useMemo, useState } from "react";
import DayModel from "../../models/DayModel"
import EventsGroup from "./EventsGroup"

type EventsGroupGridWrapProps = {
    groupKey: string,
    dayModel: DayModel,
    activeGroupEvents: Set<string>,
    marked: boolean
}

export default function EventsGroupGridWrap({ groupKey, dayModel, activeGroupEvents, marked } : EventsGroupGridWrapProps) {
    const [activeIndex, setActiveIndex] = useState(-1);
    
    useEffect(() => {
        const index = dayModel.events.findIndex((day) => {
            return activeGroupEvents.has(day.uid)
        });

        setActiveIndex(index);
    }, [activeGroupEvents, dayModel]);

    const eventStartDay = useMemo(() => {
        if (activeIndex === -1)
            return false;
        // active event start or monday
        return dayModel.events[activeIndex].isFirstDayOfEvent(dayModel.day) || dayModel.day.getDay() === 1;
    }, [dayModel, activeIndex]);

    const colSpan = useMemo(() => {
        if (!eventStartDay)
            return 1;
        return dayModel.events[activeIndex].daysSpan();
    }, [eventStartDay, dayModel, activeIndex]);

    return (
        <>
            { (activeIndex === -1 || eventStartDay) &&<div className={`row-start-2 row-end-3 h-full w-full overflow-hidden ${marked ? 'bg-slate-200' : ''} ${eventStartDay  ? `col-span-${colSpan % 8}` : ''}`}>
                {eventStartDay && <EventsGroup groupKey={groupKey} dayModel={dayModel} activeIndex={activeIndex}></EventsGroup>}
            </div> }
        </>
    )
}