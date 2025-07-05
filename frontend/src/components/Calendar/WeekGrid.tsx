import React from "react";
import DayModel from "../../models/DayModel"
import EventGroupsService from "../../services/EventGroupsService"
import isOnTheSameDate from "../../utils/isOnTheSameDate";
import EventsGroupGridWrap from "../Events/EventsGroupGridWrap";
import DayBox from "./DayBox";

export type WeekDays = [DayModel, DayModel, DayModel, DayModel, DayModel, DayModel, DayModel];


type WeekGridProps = {
    week: WeekDays, currDay: Date, eventGroupService: EventGroupsService, layer: number, weeks: number
}

export default function WeekGrid({ week, currDay, eventGroupService, layer, weeks }: WeekGridProps) {
    return (
        <div className="grid grid-rows-[auto_1em_6em] grid-cols-[repeat(7,_14%)]" style={{ height: `${100/2}%`}}>
            {week.map((day) => {
                const marked = isOnTheSameDate(day.day, currDay);

                return (<React.Fragment key={day.day.toString()}>
                        <DayBox  dayModel={day} marked={marked}></DayBox>
                        <EventsGroupGridWrap groupKey={day.toString()} dayModel={day} activeGroupEvents={eventGroupService.getActiveEvents(day.groupId ?? "", layer)} marked={marked} groupLayer={eventGroupService.getGroupLayer(day.groupId ?? "", layer)}></EventsGroupGridWrap>
                </React.Fragment>)
            })}
        </div>
    );
}