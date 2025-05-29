import EventModel from "../models/EventModel";

export default function isDayInRange(event: EventModel, day: Date) {
    const {startOfDay, endOfDay } = event.getFullDaysRange();
    return (startOfDay <= day && day <= endOfDay);
}