const calendarService = require('../services/calendarService');

exports.getEvents = async (req, res) => {
    const completeText = await calendarService.getCalendarData(process.env.CALENDAR_LINK);
    const calendarComponent = calendarService.parseIcalData(completeText);

    const events = calendarService.getCalendarEvents(calendarComponent);

    res.send(events);
}