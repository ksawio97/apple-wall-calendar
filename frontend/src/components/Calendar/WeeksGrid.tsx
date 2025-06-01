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
        fetchEvents()
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