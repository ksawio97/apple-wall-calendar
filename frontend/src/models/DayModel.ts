import EventModel from "./EventModel";

export default class DayModel {
    day: Date;
    events: EventModel[];
    groupId: string | undefined;
    // updates if it's the current day
    marked: boolean = false;

    constructor(day: Date, events: EventModel[], groupId: string | undefined = undefined, marked: boolean = false) {
        this.day = day;
        this.events = events;
        this.groupId = groupId;
        this.marked = marked;
    }

    getEventsCountDayStart(weekIndex: number): number {
        return this.events.filter((e) => e.isFirstDisplayedDayOfEvent(this.day, weekIndex)).length;
    }
}