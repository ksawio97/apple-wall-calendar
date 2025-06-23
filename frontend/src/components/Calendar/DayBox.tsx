import DayModel from "../../models/DayModel";

type DayBoxProps = { dayModel: DayModel, marked: boolean };

export default function DayBox({ dayModel, marked }: DayBoxProps){

    return (
        <div className={`flex flex-col items-center flex-grow-0 col-span-1 ${marked ? 'bg-surface-container' : ''}`}>
            <div className={`w-full items-center ${dayModel.day.getMonth() % 2 === 0 ? 'bg-secondary' : 'bg-tertiary'}`}>
                <p className={`text-center font-bold ${dayModel.day.getMonth() % 2 === 0 ? 'text-secondary-on' : 'text-tertiary-on'}}`}>{dayModel.day.toLocaleString('en', { month: 'short'})}</p>
            </div>
            <h3 className="p-8 text-4xl text-surface-on">{dayModel.day.getDate()}</h3>
        </div>
    );
}