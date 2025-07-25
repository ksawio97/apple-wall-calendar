import React from "react";
import DayModel from "../../models/DayModel"
import EventsGroupGridWrap from "../Events/EventsGroupGridWrap";
import DayBox from "./DayBox";

export type WeekDays = [DayModelWithEvents, DayModelWithEvents, DayModelWithEvents, DayModelWithEvents, DayModelWithEvents, DayModelWithEvents, DayModelWithEvents];

export type DayModelWithEvents = {
    dayModel: DayModel,
    groupInfo: {
        activeGroupEvents: Set<string>;
        groupLayer: number;
    }
}

type WeekGridProps = {
    week: WeekDays, weekIndex: number, weeksCount: number
}

export default function WeekGrid({ week, weeksCount, weekIndex }: WeekGridProps) {
    return (
        <div className="grid grid-rows-[auto_1.2em_6em] grid-cols-[repeat(7,_14%)]" style={{ height: `${100/weeksCount}%`}}>
            {week.map((day) => (
                <React.Fragment key={day.dayModel.day.toString()}>
                        <DayBox  dayModel={day.dayModel}></DayBox>
                    <EventsGroupGridWrap
                        groupKey={day.toString()}
                        dayModelWithEvents={day}
                        weekIndex={weekIndex}
                    />
                </React.Fragment>)
            )}
        </div>
    );
}