import EventModel from "../../models/EventModel";

function getTimeText(time: Date) {
    return time.toLocaleString('en', { hour: '2-digit', minute: '2-digit', hour12: false});
}

export default function EventBox({ event }: { event: EventModel }) {
    return (
        <div className="w-40">
            <div className="flex flex-col bg-gray-200 p-2">
                <h3>{event.summary}</h3>
                <p className="no-wrap text-center">{getTimeText(event.start)} - {getTimeText(event.end)}</p>
            </div>
        </div>
    );
}