import { getWeekDays, getWeeksDays } from "../../utils/getDays";
const DAY_MS = 1000*60*60*24;

describe('getWeekDays test', () => {
    const day = new Date('2025-03-02');
    const days = getWeekDays(day);
    let weekStart = (new Date('2025-02-24T00:00:00Z')).getTime();

    test('should return the correct weekdays', () => {
        for (const weekDay of days) {
            expect(weekDay.toString()).toBe((new Date(weekStart)).toString());
            weekStart += DAY_MS;
        }
    });
});

describe('getWeeksDays test', () => {
    const day = new Date('2025-03-02');
    // from one week before to two weeks after so 4 weeks
    const days = getWeeksDays(day, 1, 2);
    let weeksStart = (new Date('2025-02-17T00:00:00Z')).getTime();
    test('should return 4 weeks of days (28 days)', () => {
        expect(days.length).toBe(7*4);
    })
    test('should return the correct weekdays', () => {
        for (const weekDay of days) {
            expect(weekDay.toString()).toBe((new Date(weeksStart)).toString());
            weeksStart += DAY_MS;
        }
    });
});