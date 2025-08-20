import WeeksGrid from "./WeeksGrid";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { getWeeksDays } from "../../utils/getDays";
import DayModel from "../../models/DayModel";
import assignEventsToDays from "../../helpers/assignEventsToDays";
import GridInfo from "../../types/GridInfo";
import isOnTheSameDate from "../../utils/isOnTheSameDate";
import { useEventGroupsService } from "../../hooks/useEventGroupsService";

export type WeeksGridProps = {
    gridInfo: GridInfo;
}

export default function WeeksGridContainer({ gridInfo }: WeeksGridProps) {
    const [days, setDays] = useState<DayModel[]>([]);
    const { setFromToTimeFrame, addEventsChangedListener, removeEventsChangedListener } = useEventGroupsService();
    
    useEffect(() => {
        const [from, to] = getTimeFrame(gridInfo.weeksBefore, gridInfo.weeksAfter);
        
        setFromToTimeFrame(from ,to);
    }, [gridInfo.weeksBefore, gridInfo.weeksAfter]);
        
    const weekDays = useMemo(() => getWeeksDays(gridInfo.currDay, gridInfo.weeksBefore, gridInfo.weeksAfter), [gridInfo]);
    
    useEffect(() => {
        const { "id": eventId } = addEventsChangedListener((groupService) => {
              const daysModels = weekDays.map((d) => new DayModel(d, [], groupService.getGroupId(d), isOnTheSameDate(d, gridInfo.currDay)));
              assignEventsToDays(daysModels, Array.from(groupService.getEvents().values()));
              setDays(daysModels)
        });
        return () => {
            removeEventsChangedListener(eventId);
        };
    }, [weekDays]);

    return (
        <WeeksGrid
            days={days}
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
