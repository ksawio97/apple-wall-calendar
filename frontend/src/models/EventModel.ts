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

  getFullDaysRange(): { startOfDay: Date; endOfDay: Date } {
    const startOfDay = new Date(this.start);
    startOfDay.setHours(0, 0, 0, 0);
    // -1 bcs if event end is on days 00:00:00 time it means we shouldn't include this day
    const endOfDay = new Date(this.end.getTime() - 1);
    endOfDay.setHours(23, 59, 59, 999);

    return { startOfDay, endOfDay };
  }
}