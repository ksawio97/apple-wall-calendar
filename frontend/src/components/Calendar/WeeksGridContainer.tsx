import WeeksGrid from "./WeeksGrid";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { fetchEvents } from "../../services/calendarEventsService";
import EventGroupsService from "../../services/EventGroupsService";
import { getWeeksDays } from "../../utils/getDays";
import DayModel from "../../models/DayModel";
import assignEventsToDays from "../../helpers/assignEventsToDays";
import GridInfo from "../../types/GridInfo";
import isOnTheSameDate from "../../utils/isOnTheSameDate";
import { useDataRefresh } from "../../hooks/useDataRefresh";

export type WeeksGridProps = {
    gridInfo: GridInfo;
}

export default function WeeksGridContainer({ gridInfo }: WeeksGridProps) {
    const [days, setDays] = useState<DayModel[]>([]);
    const [eventGroupService, setEventGroupService] = useState<EventGroupsService>(new EventGroupsService([]));
    const [from, to] = useMemo(() => getTimeFrame(gridInfo.weeksBefore, gridInfo.weeksAfter), [gridInfo.weeksBefore, gridInfo.weeksAfter]);

    const getEvents = () => {
        fetchEvents(from, to)
            .then((events) => {
                const groupService = new EventGroupsService(events);
                let weekDays = getWeeksDays(gridInfo.currDay, gridInfo.weeksBefore, gridInfo.weeksAfter);
                const daysModels = weekDays.map((d) => new DayModel(d, [], groupService.getGroupId(d), isOnTheSameDate(d, gridInfo.currDay)));
                assignEventsToDays(daysModels, events);

                setEventGroupService(groupService);
                return daysModels;
            })
            .then((weekDays) => {
                setDays(weekDays);
            });
    };

    // fetch events for days
    useEffect(getEvents, [gridInfo, setEventGroupService, from, to]);

    // fetch events for days
    useEffect(getEvents, [gridInfo, setEventGroupService, from, to]);

    // update events on data refresh
    const { addDataRefreshListener, removeDataRefreshListener } = useDataRefresh();
    useEffect(() => {
        const { id: eventsRefreshId } = addDataRefreshListener(getEvents);
        return () => {
            removeDataRefreshListener(eventsRefreshId);
        };
    }, []);

    return (
        <WeeksGrid
            days={days}
            eventGroupService={eventGroupService}
        />
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