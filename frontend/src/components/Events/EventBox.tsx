import EventModel from "../../models/EventModel";

export default function EventBox({ event }: { event: EventModel }) {
    return (
        <div className="w-40">
            <div className="flex flex-col bg-gray-200 p-2">
                <h3>{event.summary}</h3>
                <p className="no-wrap">Start: {event.start.toString()} End: {event.start.toString()}</p>
            </div>
        </div>
    );
}