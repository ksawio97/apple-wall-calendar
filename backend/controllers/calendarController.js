const calendarService = require('../services/calendarService');

exports.updateCalendarData = async (req, res) => {
    const completeText = await calendarService.getCalendarData(process.env.CALENDAR_LINK);
    res.send(completeText);
}