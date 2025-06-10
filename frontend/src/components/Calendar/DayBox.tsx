import DayModel from "../../models/DayModel";

type DayBoxProps = { dayModel: DayModel, marked: boolean };

export default function DayBox({ dayModel, marked }: DayBoxProps){
    return (
        <div className={`flex flex-col items-center flex-grow-0 col-span-1 ${marked ? 'bg-slate-300' : ''}`}>
            <div className="bg-red-600 w-full items-center">
                <p className="text-white text-center font-bold">{dayModel.day.toLocaleString('en', { month: 'short'})}</p>
            </div>
            <h3 className="p-8 text-4xl">{dayModel.day.getDate()}</h3>
        </div>
    );
}