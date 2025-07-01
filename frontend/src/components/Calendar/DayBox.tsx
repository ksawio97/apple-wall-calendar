import DayModel from "../../models/DayModel";
import getMonthColor from "../../utils/getMonthColor";

type DayBoxProps = { dayModel: DayModel, marked: boolean };

export default function DayBox({ dayModel, marked }: DayBoxProps){

    return (
        <div className={`flex flex-col flex-grow-0 col-span-1 ${marked ? 'bg-surface-container' : ''}`}>
            <div className={`w-full items-center ${getMonthColor(dayModel.day)}`}>
                <p className='text-center font-bold text-secondary-on'>{dayModel.day.toLocaleString('en', { month: 'short'})}</p>
            </div>
            <div className="w-full h-full flex items-center justify-center py-6">
                <h3 className="p-8 text-4xl text-surface-on">{dayModel.day.getDate()}</h3>
            </div>
        </div>
    );
}