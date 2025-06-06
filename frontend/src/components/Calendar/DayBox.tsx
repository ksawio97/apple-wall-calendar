import { useEffect, useState } from "react";
import DayModel from "../../models/DayModel";
import EventsGroup from "../Events/EventsGroup";

type DayBoxProps = { dayModel: DayModel, marked: boolean, activeGroupEvents: Set<string> };

export default function DayBox({ dayModel, marked, activeGroupEvents }: DayBoxProps){
    const [eventIndex, setEventIndex] = useState(0);
    useEffect(() => {
        const index = dayModel.events.findIndex((day) => {
            return activeGroupEvents.has(day.uid)
        });

        setEventIndex(index);

    }, [activeGroupEvents, dayModel]);

    return (
        <div className={`${marked ? 'bg-slate-200' : 'bg-gray-100'} flex flex-col items-center w-40 flex-grow-0`}>
            <div className="bg-red-600 w-full items-center">
                <p className="text-white text-center font-bold">{dayModel.day.toLocaleString('en', { month: 'short'})}</p>
            </div>
            <h3 className="p-8 text-4xl">{dayModel.day.getDate()}</h3>
            <EventsGroup groupKey={dayModel.day.toString()} events={dayModel.events} activeIndex={eventIndex}></EventsGroup>
        </div>
    );
}