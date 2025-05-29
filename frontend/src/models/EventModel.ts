import UID from "../types/UID";

export default class EventModel {
    uid: UID;
    summary: string;
    start: Date;
    end: Date;
    constructor(uid: string, summary: string, start: Date, end: Date) {
        this.uid = uid;
        this.summary = summary;
        this.start = start;
        this.end = end;
    }

    display() {
        console.log(`Event UID: ${this.uid}`);
        console.log(`Summary: ${this.summary}`);
        console.log(`Start: ${this.start}`);
        console.log(`End: ${this.end}`);
    }

  getFullDaysRange(): { startOfDay: Date; endOfDay: Date } {
    const startOfDay = new Date(this.start);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(this.end);
    endOfDay.setHours(23, 59, 59, 999);

    return { startOfDay, endOfDay };
  }
}