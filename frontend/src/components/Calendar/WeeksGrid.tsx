import { useEffect, useState } from "react";
import { getWeeksDays } from "../../utils/getDays";
import DayModel from "../../models/DayModel";
import DayBox from "./DayBox";
import { fetchEvents } from "../../services/calendarEventsService";
import assignEventsToDays from "../../helpers/assignEventsToDays";
import isOnTheSameDate from "../../utils/isOnTheSameDate";
import EventGroupsService from "../../services/EventGroupsService";
import EventsGroupGridWrap from "../Events/EventsGroupGridWrap";

export default function WeeksGrid({ currDay, weeksBefore, weeksAfter }: { currDay: Date, weeksBefore: number, weeksAfter: number }) {
    const [days, setDays] = useState<DayModel[]>([]);
    const [eventGroupService, setEventGroupService] = useState(new EventGroupsService([]));

    // fetch events for days
    useEffect(() => {
        const [from, to] = getTimeFrame(weeksBefore, weeksAfter);
        fetchEvents(from, to)
            .then((events) => {
                const groupService = new EventGroupsService(events);
                let weekDays = getWeeksDays(currDay, weeksBefore, weeksAfter);
                const daysModels = weekDays.map((d) => new DayModel(d, [], groupService.getGroupId(d)));
                assignEventsToDays(daysModels, events);
                
                setEventGroupService(groupService);
                return daysModels
            })
            .then((weekDays) => {
                setDays(weekDays);
            })
    }, [currDay, weeksAfter, weeksBefore, setEventGroupService]);
    
    const [layer, setLayer] = useState(0);

    // every 4 s change events shown
    useEffect(() => {
        const interval = setInterval(() => {
            setLayer((layer + 1) % Number.MAX_VALUE);
        }, 4000);
        return () => {
            clearInterval(interval);
        };
    }, [layer]);

    return (
        <div className="w-full">
            {splitIntoSevens(days).map((week) => 
                weeksGrid(week, currDay, eventGroupService, layer)
            )}
        </div>
    );
}

function weeksGrid(week: DayModel[], currDay: Date, eventGroupService: EventGroupsService, layer: number) {
    return (
        <div className="grid grid-rows-[8em_1fr_6em] grid-cols-[repeat(7,_14%)] h-1/3">
            {week.map((day, i) => {
                const marked = isOnTheSameDate(day.day, currDay);

                return (<>
                        <DayBox key={day.day.toString()} dayModel={day} marked={marked}></DayBox>
                        <EventsGroupGridWrap groupKey={day.toString()} dayModel={day} activeGroupEvents={eventGroupService.getActiveEvents(day.groupId ?? "", layer)} marked={marked} groupLayer={eventGroupService.getGroupLayer(day.groupId ?? "", layer)}></EventsGroupGridWrap>
                </>)
            })}
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

function splitIntoSevens(arr: DayModel[]) {
    const result = [];
    for (let i = 0; i < arr.length; i += 7) {
        result.push(arr.slice(i, i + 7));
    }
    return result;
}