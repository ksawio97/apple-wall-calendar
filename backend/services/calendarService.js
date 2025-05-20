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
    const event = data[1];

    const uid = event[4][3];
    const summary = event[1][3];
    const start = event[6][3];
    const end = event[7][3];
    return new EventModel(uid, summary, start, end);
  });
}