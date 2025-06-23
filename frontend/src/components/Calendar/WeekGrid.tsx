import DayModel from "../../models/DayModel"
import EventGroupsService from "../../services/EventGroupsService"
import isOnTheSameDate from "../../utils/isOnTheSameDate";
import EventsGroupGridWrap from "../Events/EventsGroupGridWrap";
import DayBox from "./DayBox";

export type WeekDays = [DayModel, DayModel, DayModel, DayModel, DayModel, DayModel, DayModel];


type WeekGridProps = {
    week: WeekDays, currDay: Date, eventGroupService: EventGroupsService, layer: number
}

export default function WeekGrid({ week, currDay, eventGroupService, layer }: WeekGridProps) {
    return (
        <div className="grid grid-rows-[8em_1fr_6em] grid-cols-[repeat(7,_14%)] h-1/3">
            {week.map((day) => {
                const marked = isOnTheSameDate(day.day, currDay);

                return (<>
                        <DayBox key={day.day.toString()} dayModel={day} marked={marked}></DayBox>
                        <EventsGroupGridWrap groupKey={day.toString()} dayModel={day} activeGroupEvents={eventGroupService.getActiveEvents(day.groupId ?? "", layer)} marked={marked} groupLayer={eventGroupService.getGroupLayer(day.groupId ?? "", layer)}></EventsGroupGridWrap>
                </>)
            })}
        </div>
    );
}