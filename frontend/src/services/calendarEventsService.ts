import EventModel from "../models/EventModel";
import toYMDISODateString from "../utils/toYMDISODateString";

export async function fetchEvents(from: Date, to: Date): Promise<EventModel[]> {
    const [fromText, toText] = [from, to].map(d => toYMDISODateString(d));

    const response = await fetch((process.env.REACT_APP_BACKEND_LINK || "") + `calendar/events?from=${fromText}&to=${toText}`);
    if (!response.ok) {
        console.error('Couldn\'t fetch events from backend')
        return [];
    }
    const events = (await response.json()).map((res: { uid: string, summary: string, start: number, end: number }) => {
        return new EventModel(res.uid, res.summary, new Date(res.start), new Date(res.end));
    });

    return events;
}