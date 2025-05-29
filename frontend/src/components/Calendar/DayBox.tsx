import DayModel from "../../models/DayModel";
import EventsGroup from "../Events/EventsGroup";

export default function DayBox({ dayModel }: { dayModel: DayModel }){
    return (
        <div className="bg-gray-100 flex flex-col items-center w-40 h-40 flex-grow-0 border-2 border-gray-300">
            <div className="bg-red-600 w-full items-center">
                <p className="text-white text-center font-bold">{dayModel.day.toLocaleString('en', { month: 'short'})}</p>
            </div>
            <h3 className="p-8 text-4xl">{dayModel.day.getDate()}</h3>
            <EventsGroup groupKey={dayModel.day.toString()} events={dayModel.events}></EventsGroup>
        </div>
    );
}