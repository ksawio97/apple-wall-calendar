import EventModel from "../../models/EventModel";
import EventBox from "./EventBox";

export default function EventsGroup({ groupKey, events, activeIndex }: { groupKey: string, events: EventModel[], activeIndex: number }) {
    return (
        <div>
            <div className="flex flex-row h-1 gap-2 bg-gray-200 px-1">
                {events.map((event, i) => {
                    return (
                        <ItemIndicatorCarousel key={`${groupKey}-${event.uid}-carousel`} highlight={activeIndex === i}/>
                    )
                })}

            </div>
            {activeIndex !== -1 && events[activeIndex] && <EventBox event={events[activeIndex]}></EventBox>}
        </div>
    );
}

function ItemIndicatorCarousel({ highlight }: { highlight: boolean}) {
    return (
        <div className={`flex-1 ${highlight ? 'bg-red-400' : 'bg-gray-300'}`}>
        </div>
    );
}