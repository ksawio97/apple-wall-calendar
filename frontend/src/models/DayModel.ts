import EventModel from "./EventModel";

export default class DayModel {
    day: Date;
    events: EventModel[];
    groupId: string | undefined;

    constructor(day: Date, events: EventModel[], groupId: string | undefined = undefined) {
        this.day = day;
        this.events = events;
        this.groupId = groupId;
    }
}