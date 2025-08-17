import UID from "../types/UID";
import EventModel from "../models/EventModel";

export default function eventsChanged(oldEvents: Map<UID, EventModel>, newEvents: Map<UID, EventModel>): boolean {
    if (oldEvents.size !== newEvents.size) {
        return true
    }
    

    for (const [uid, _] of Object.entries(oldEvents)) {
        if (!newEvents.has(uid)) {
            return true;
        }
        const [oldEvent, newEvent] = [oldEvents.get(uid), newEvents.get(uid)];
        if (!EventModel.isEqual(oldEvent!!, newEvent!!)) {
            return false;
        }
    }

    return false;
} 
