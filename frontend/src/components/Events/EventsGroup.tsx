import { useEffect, useState } from "react";
import EventModel from "../../models/EventModel";
import EventBox from "./EventBox";

export default function EventsGroup({ events }: { events: EventModel[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index + 1) % events.length);
        }, 4000);
        return () => {
            clearInterval(interval);
        };
    }, [events, index]);

    return (
        <div className="p-4">
            <div className="flex flex-row h-1 gap-2 bg-gray-200 px-1">
                {events.map((event, i) => {
                    return (
                        <ItemIndicatorCarousel key={`${event.uid}-carousel`} highlight={index === i}/>
                    )
                })}

            </div>
            {events[0] && <EventBox event={events[index]}></EventBox>}
        </div>
    );
}

function ItemIndicatorCarousel({ highlight }: { highlight: boolean}) {
    return (
        <div className={`flex-1 ${highlight ? 'bg-red-400' : 'bg-gray-300'}`}>
        </div>
    );
}