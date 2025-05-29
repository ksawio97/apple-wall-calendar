export default function getWeekDays(day: Date) {
    const coreDay = new Date(day)
    coreDay.setHours(0, 0, 0, 0);

    const currDayIndex = day.getDay() === 0 ? 7 : day.getDay();

    const days = [];
    // sunday to saturday
    for (let i = 1; i < 8; i++) {
        const daysDiff = currDayIndex - i;
        days.push(new Date(coreDay.getTime() - 1000*60*60*24*daysDiff));
    }

    return days;
}