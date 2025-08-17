import { useEffect, useState } from "react";
import DayModel from "../../models/DayModel";
import EventGroupsService from "../../services/EventGroupsService";
import WeekGrid, { DayModelWithEvents, WeekDays } from "./WeekGrid";

export default function WeeksGrid({ days, eventGroupService }: { days: DayModel[], eventGroupService: EventGroupsService }) {
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

    const weeks = splitIntoSevens(
        attachGroupInfo(days, eventGroupService, layer)
    );

    return (
        <div className="w-full">
            {/* show every week in WeekGrid */}
            {weeks.map((week, i) => 
                <WeekGrid
                    key={week[0].dayModel.day.toISOString()}
                    week={week}
                    weekIndex={i}
                    weeksCount={weeks.length}
                />
            )}
        </div>
    );
}

function attachGroupInfo(days: DayModel[], eventGroupService: EventGroupsService, layer: number): DayModelWithEvents[] {
    return days.map(day => ({
        dayModel: day,
        groupInfo: {
            activeGroupEvents: eventGroupService.getActiveEvents(day.groupId ?? "", layer),
            groupLayer: eventGroupService.getGroupLayer(day.groupId ?? "", layer)
        }
    }));
}
function splitIntoSevens(arr: DayModelWithEvents[]) {
    const result = [];
    for (let i = 0; i < arr.length; i += 7) {
        const weekDays = arr.slice(i, i + 7);
        if (weekDays.length !== 7) {
            throw new Error("Each week must have exactly 7 days");
        }
        result.push(weekDays as WeekDays);
    }
    return result;
}
