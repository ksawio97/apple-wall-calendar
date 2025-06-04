import { useEffect, useState } from "react";
import { getWeeksDays } from "../../utils/getDays";
import DayModel from "../../models/DayModel";
import DayBox from "./DayBox";
import { fetchEvents } from "../../services/calendarEventsService";
import assignEventsToDays from "../../helpers/assignEventsToDays";
import isOnTheSameDate from "../../utils/isOnTheSameDate";

export default function WeeksGrid({ currDay, weeksBefore, weeksAfter }: { currDay: Date, weeksBefore: number, weeksAfter: number }) {
    const [days, setDays] = useState<DayModel[]>([]);

    // fetch events for days
    useEffect(() => {
        const [from, to] = getTimeFrame(weeksBefore, weeksAfter);
        fetchEvents(from, to)
            .then((events) => {
                let weekDays = getWeeksDays(currDay, weeksBefore, weeksAfter);
                const daysModels = weekDays.map((d) => new DayModel(d, []));
                assignEventsToDays(daysModels, events);
                return daysModels;
            })
            .then((weekDays) => {
                setDays(weekDays);
            })
    }, [currDay, weeksAfter, weeksBefore]);
    
    return (
        <div className="grid grid-cols-7">
            {days.map((day) => (<DayBox key={day.day.toString()} dayModel={day} marked={isOnTheSameDate(day.day, currDay)}></DayBox>))}
        </div>
    );
}


function getTimeFrame(weeksBefore: number, weeksAfter: number) {
    const now = new Date();
    return [
        // first week monday time
        now.getTime() - weeksBefore * 7 * 24 * 60 * 60 * 1000 - (now.getDay() === 0 ? 6 : now.getDay() - 1) * 24 * 60 * 60 * 1000,
        // last week sunday time
        now.getTime() + weeksAfter * 7 * 24 * 60 * 60 * 1000 + (6 - (now.getDay() === 0 ? 6 : now.getDay() - 1)) * 24 * 60 * 60 * 1000
    ].map(ms => new Date(ms));
}