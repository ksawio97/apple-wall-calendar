import UID from "../types/UID";

export default class DayModel {
    day: Date;
    events: UID[];
    groupId: string | undefined;
    // updates if it's the current day
    marked: boolean = false;

    constructor(day: Date, events: UID[], groupId: string | undefined = undefined, marked: boolean = false) {
        this.day = day;
        this.events = events;
        this.groupId = groupId;
        this.marked = marked;
    }
}
