import { useEffect, useState } from "react";
import { getWeatherInfo } from "../../../services/weatherService";
import WeatherModel from "../../../models/WeatherModel";
import WeatherBox from "./WeatherBox";

export default function WeatherWrapper() {
    const [weatherInfo, setWeatherInfo] = useState<WeatherModel | null>(null);

    useEffect(() => {
        getWeatherInfo()
            .then((data) => {
                setWeatherInfo(data);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
            });
    }, []);

    return (
        <>
            {weatherInfo && <WeatherBox weatherInfo={weatherInfo} />}
        </>
    );
}