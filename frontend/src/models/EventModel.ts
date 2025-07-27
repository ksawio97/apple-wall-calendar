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

  isFirstDisplayedDayOfEvent(day: Date, weekIndex: number): boolean {
      const { startOfDay } = this.getFullDaysRange();

      // 1st day of event
      const isFirstDayOfEvent = startOfDay.getTime() <= day.getTime() && day.getTime() < (startOfDay.getTime() + 1000 * 60 * 60 * 24);
      // 
      const isFirstDisplayedDayOfEvent = isFirstDayOfEvent || (weekIndex === 0 && day.getDay() === 1);  
      return isFirstDisplayedDayOfEvent;
  }

  isAllDay() {
    const {startOfDay, endOfDay} = this.getFullDaysRange();
  
    return this.start.getTime() === startOfDay.getTime() && this.end.getTime() - 1 === endOfDay.getTime();
  }

  daysSpan() {
    const {startOfDay, endOfDay} = this.getFullDaysRange();

    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((endOfDay.getTime() - startOfDay.getTime()) / msPerDay) + 1;
  }

  static isEqual(event1: EventModel, event2: EventModel): boolean {
    return event1.uid === event2.uid &&
           event1.summary === event2.summary &&
           event1.start.getTime() === event2.start.getTime() &&
           event1.end.getTime() === event2.end.getTime();
  }
}