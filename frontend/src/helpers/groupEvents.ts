import EventModel from "../models/EventModel";
import toYMDISODateString from "../utils/toYMDISODateString";


export type GroupInfo = {
    groupId: string,
    startDate: Date,
    endDate: Date,
    events: EventModel[]
}

export default function groupEvents(events: EventModel[]) {
    const groups: GroupInfo[] = [];
    const groupIndexById = new Map<string, number>();

    const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());

    for (const event of sorted) {
        const { startOfDay, endOfDay } = event.getFullDaysRange();
        let placed = false;

        for (const group of groups) {
        if (group.events.some(e => {
            const { startOfDay: s2, endOfDay: e2 } = e.getFullDaysRange();
            return s2 <= endOfDay && e2 >= startOfDay;
        })) {
            group.events.push(event);
            if (event.end.getTime() > group.endDate.getTime())
                group.endDate = event.end;

            placed = true;
            break;
        }
        }

        if (!placed) {
            const { startOfDay, endOfDay } = event.getFullDaysRange();
            const groupId = `${groups.length}-${toYMDISODateString(startOfDay)}`;
            groupIndexById.set(groupId, groups.length);

            groups.push({
                groupId: groupId,
                startDate: startOfDay,
                endDate: endOfDay,
                events: [event]
            });
        }

    }

    return { groups, groupIndexById }
}