import DayBox from "./DayBox";
import DayModel from "../../models/DayModel";

export default function WeekBox({ days }: { days: DayModel[]}) {

    return (
        <div className="flex flex-row gap-4 flex-wrap">
            {days.map((day) => 
                <DayBox key={day.day.toString()} dayModel={day}></DayBox> 
            )}
        </div>
    )
}