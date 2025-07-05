import WeatherWrapper from "./Weather/WeatherWrapper";
import Clock from "./Clock/Clock";

export default function Panel() {
    return (
        <div className="w-full h-fit flex flex-row px-10 py-6 gap-12">
            <Clock></Clock>
            <WeatherWrapper></WeatherWrapper>
        </div>
    );
}