const DAY_MS = 1000*60*60*24;

export function getWeekDays(day: Date) {
    const coreDay = new Date(day);
    coreDay.setHours(0, 0, 0, 0);
    const currDayIndex = day.getDay() === 0 ? 7 : day.getDay();

    const days = [];
    // monday to saturday
    for (let i = 1; i < 8; i++) {
        const daysDiff = i - currDayIndex;
        days.push(new Date(coreDay.getTime() + DAY_MS * daysDiff));
    }
    return days;
}

export function getWeeksDays(day: Date, weeksBefore: number, weeksAfter: number) {
    const days = [];
    for (let weekOffset = -weeksBefore; weekOffset <= weeksAfter; weekOffset++) {
        const weekDays = getWeekDays(new Date(day.getTime() + weekOffset * DAY_MS * 7));
        days.push(...weekDays);
    }

    return days;
}
