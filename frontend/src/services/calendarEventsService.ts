import EventModel from "../models/EventModel";

export async function fetchEvents(): Promise<EventModel[]> {
    const response = await fetch((process.env.REACT_APP_BACKEND_LINK || "") + "calendar/events");
    if (!response.ok) {
        console.error('Couldn\'t fetch events from backend')
        return [];
    }
    const events = (await response.json()).map((res: { uid: string, summary: string, start: number, end: number }) => {
        return new EventModel(res.uid, res.summary, new Date(res.start), new Date(res.end));
    });

    return events;
}