if (process.env.CALENDAR_LINK === undefined)
{
    console.error('Missing required env variable CALENDAR_LINK');
    process.exit(1);
}

module.exports = {
    CALENDAR_LINK: process.env.CALENDAR_LINK,
}
