import DayModel from "../../models/DayModel";
import EventsGroup from "../Events/EventsGroup";

export default function DayBox({ dayModel }: { dayModel: DayModel }){
    return (
        <div className="bg-gray-100 flex flex-col items-center w-40">
            <div className="bg-red-600 w-full items-center">
                <p className="text-white text-center font-bold">{dayModel.day.toLocaleString('en', { month: 'short'})}</p>
            </div>
            <h3 className="p-8 text-4xl">{dayModel.day.getDate()}</h3>
            <EventsGroup events={dayModel.events}></EventsGroup>
        </div>
    );
}