import { useEffect, useState } from "react";
import { getWeatherInfo } from "../../../services/weatherService";
import WeatherModel from "../../../models/WeatherModel";
import WeatherBox from "./WeatherBox";

export default function WeatherWrapper() {
    const [weatherInfo, setWeatherInfo] = useState<WeatherModel | null>(null);

    useEffect(() => {
        const setWeather = () => getWeatherInfo()
            .then((data) => {
                setWeatherInfo(data);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
            });
        // Initial fetch
        setWeather();

        const interval = setInterval(() => {
            // Fetch weather data every 30 minutes
            setWeather();
        }, 30 * 60 * 1000); // 30 minutes

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {weatherInfo && <WeatherBox weatherInfo={weatherInfo} />}
        </>
    );
}