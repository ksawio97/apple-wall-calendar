import EventModel from "../../models/EventModel";
import TickerText from "../TickerText/TickerText";

function getTimeText(time: Date) {
    return time.toLocaleString('en', { hour: '2-digit', minute: '2-digit', hour12: false});
}

export default function EventBox({ event, noText }: { event: EventModel, noText: boolean }) {
    return (
        <div className="w-full h-full pb-4">
            <div className="flex flex-col bg-surface-container-highest p-2 h-full overflow-hidden rounded-sm text-lg">
                <TickerText text={noText ? '' : event.summary} className="text-surface-on font-semibold" />
                {!event.isAllDay() &&
                <p className="no-wrap text-left text-surface-on font-mono">{noText ? '' : `${getTimeText(event.start)} - ${getTimeText(event.end)}`}</p> }

            </div>
        </div>
    );
}