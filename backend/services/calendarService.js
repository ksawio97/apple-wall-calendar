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