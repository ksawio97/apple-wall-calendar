class EventModel {
    constructor(uid, summary, start, end) {
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

module.exports = EventModel;