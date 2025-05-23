import EventModel from "./EventModel";

export default class DayModel {
    day: Date;
    events: EventModel[];

    constructor(day: Date, events: EventModel[]) {
        this.day = day;
        this.events = events;
    }
}