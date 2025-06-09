import EventModel from "../../models/EventModel";

function getTimeText(time: Date) {
    return time.toLocaleString('en', { hour: '2-digit', minute: '2-digit', hour12: false});
}

export default function EventBox({ event, noText }: { event: EventModel, noText: boolean }) {
    return (
        <div className="w-full h-full">
            <div className="flex flex-col bg-gray-200 p-2 h-full overflow-hidden">
                <h3 className="whitespace-nowrap">{noText ? '' : event.summary}</h3>
                {!event.isAllDay() &&
                <p className="no-wrap text-center">{noText ? '' : `${getTimeText(event.start)} - ${getTimeText(event.end)}`}</p> }
            </div>
        </div>
    );
}