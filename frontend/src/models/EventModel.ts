export default class EventModel {
    uid: string;
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
}