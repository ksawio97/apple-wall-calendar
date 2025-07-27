import WeatherWrapper from "./Weather/WeatherWrapper";
import Clock from "./Clock/Clock";
import ProgressBar from "./ProgressBar/ProgressBar";

export default function Panel() {
    return (
        <div className="grid grid-rows-1 [grid-template-columns:9fr_1fr] w-full h-full py-6 items-center">
            <div className="w-full h-fit flex flex-row px-10 gap-12">
                <Clock></Clock>
                <WeatherWrapper></WeatherWrapper>
            </div>
            <ProgressBar></ProgressBar>
        </div>
    );
}