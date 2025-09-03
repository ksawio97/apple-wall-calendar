const calendarService = require('../services/calendarService');
const config = require('../config');

function eventOverlap(event, from, to) {
    if (!from)
        from = event.start;
    if (!to)
        to = event.end;

    if (Math.max(from, event.start) <= Math.min(to, event.end)) {
        return true;
    }
    return false;
}

exports.getEvents = async (req, res) => {
    // parse query params
    let [from, to] = [req.query.from, req.query.to];
    // convert to ms
    if (from) 
        from = Date.parse(from);
    // add next day to include it
    if (to) {
        to = Date.parse(to) + 1000 * 60 * 60 * 24;
    }
    const completeText = await calendarService.getCalendarData(config.CALENDAR_LINK);
    const calendarComponent = calendarService.parseIcalData(completeText);

    let events = calendarService.getCalendarEvents(calendarComponent);

    events = events.filter((event) => eventOverlap(event, from, to));
    res.send(events);
}
