import createLayers from "../helpers/createLayers";
import groupEvents from "../helpers/groupEvents";
import EventModel from "../models/EventModel";
import UID from '../types/UID';

export type GroupLayersInfo = {
    groupId: string,
    startDate: Date,
    endDate: Date,
    eventLayers: UID[][]
}

export default class EventGroupsService {
    private groups: GroupLayersInfo[];
    private groupIndexById: Map<string, number>;
    private events: Map<string, EventModel>;

    constructor(events: EventModel[]) {
        // groups are sorted by startDate which all are unique
        const { groups, groupIndexById  } = groupEvents(events);
        this.groupIndexById = groupIndexById;
        this.groups = groups.map<GroupLayersInfo>((group) => {
            return { 
                groupId: group.groupId,
                startDate: group.startDate,
                endDate: group.endDate,
                eventLayers: createLayers(group.events),
            };
        });

        this.events = new Map(events.map(e => [e.uid, e]));
    }
    // TODO optimize it to use binary search
    getGroupId(date: Date) {
        for (const group of this.groups) {
            if (group.startDate.getTime() <= date.getTime() && date.getTime() <= group.endDate.getTime()) {
                return group.groupId;
            }
        }
        return undefined;
    }

    getGroupInfoById(groupId: string) {
        const groupIndex = this.groupIndexById.has(groupId) ? this.groupIndexById.get(groupId) : undefined;
        return groupIndex !== undefined && groupIndex < this.groups.length ? this.groups[groupIndex] : undefined;
    }

    getActiveEvents(groupId: string, layerIndex: number): Set<string> {
        const group = this.getGroupInfoById(groupId);
        if (!group) return new Set();
        return new Set((group.eventLayers[layerIndex % group.eventLayers.length] ?? []));
    }

    getGroupLayer(groupId: string, layerIndex: number) {
        const group = this.getGroupInfoById(groupId);
        if (!group) return -1;
        return layerIndex % group.eventLayers.length;
    }

    getEventByUid(uid: string) {
        if (this.events.has(uid)) {
            return this.events.get(uid);
        }
    }

    getEvents() {
        return new Map(this.events);
    }
}
