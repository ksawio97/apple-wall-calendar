const ICAL = require("ical.js");
const EventModel = require('../models/EventModel');
/**
 * 
 * @param {string} link 
 * @returns {string} calendar data text 
 */
module.exports.getCalendarData = async (link) => {
    const response = await fetch(link);
    const stream = response.body.pipeThrough(new TextDecoderStream());
  
    let completeText = '';
    for await (const chunk of stream) {
      completeText += chunk;
    }
    return completeText;
}

module.exports.parseIcalData = (content) => {
  const jcalData = new ICAL.parse(content);
  const comp = new ICAL.Component(jcalData);
  return comp;
}

module.exports.getCalendarEvents = (comp) => {
  const events = comp.jCal[2].filter(item => item[0] === 'vevent');

  return events.map(data => {
    const convData = new Map(data[1].map((property) => [property[0], property[3]]));

    const uid = convData.get('uid');
    const summary = convData.get('summary');
    const start = Date.parse(convData.get('dtstart'));
    const end = Date.parse(convData.get('dtend'));
    return new EventModel(uid, summary, start, end);
  });
}