import EventBox from "./EventBox";
import DayModel from "../../models/DayModel";

type EventsGroupProps = {
    groupKey: string,
    dayModel: DayModel,
    activeIndex: number
}
export default function EventsGroup({ groupKey, dayModel, activeIndex }: EventsGroupProps) {
    return (
        <div className="w-full h-full">
            {   dayModel.events.length > 0 &&
                <div className="flex flex-row h-1 gap-2 bg-gray-200 px-1">
                    {dayModel.events.map((event, i) => {
                        return (
                            <ItemIndicatorCarousel key={`${groupKey}-${event.uid}-carousel`} highlight={activeIndex === i}/>
                        )
                    })}

                </div>
            }
            {activeIndex !== -1 && <EventBox event={dayModel.events[activeIndex]}></EventBox>}
        </div>
    );
}

function ItemIndicatorCarousel({ highlight }: { highlight: boolean}) {
    return (
        <div className={`flex-1 ${highlight ? 'bg-red-400' : 'bg-gray-300'}`}>
        </div>
    );
}