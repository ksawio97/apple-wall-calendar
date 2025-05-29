import DayModel from "../models/DayModel";
import EventModel from "../models/EventModel";
import isEventActiveOnDay from "../utils/isEventActiveOnDay";

export default function assignEventsToDays(days: DayModel[], events: EventModel[]) {
    for (let i = 0; i < days.length; i++) {
        for (const event of events) {
            if (isEventActiveOnDay(event, days[i].day)) {
                days[i].events.push(event);
            }
        }
    }
}