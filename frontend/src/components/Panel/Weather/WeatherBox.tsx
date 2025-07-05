import { useMemo } from "react";
import WeatherModel from "../../../models/WeatherModel";
import getWeatherDescription from "../../../helpers/getWeatherDescription";

export default function WeatherBox({ weatherInfo }: { weatherInfo: WeatherModel }) {
    const weatherImg = useMemo(() => {
        return getWeatherDescription(weatherInfo.weather_code, weatherInfo.is_day)?.image;
    }, [weatherInfo.weather_code, weatherInfo.is_day]);

    return (
        <div className="flex flex-row bg-secondary rounded-lg p-4 items-center">
            <p className="text-4xl text-secondary-on">
                {weatherInfo.temperature}°C
            </p>
            {weatherImg && (
            <img
                src={weatherImg}
                alt="Weather"
                className="w-14 h-auto ml-2 drop-shadow-[0_0_2px_#000] brightness-85 contrast-120"
            />
            )}
        </div>
    );
}