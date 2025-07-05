import getLocationInfo from "../helpers/getLocationInfo";
import WeatherModel from "../models/WeatherModel";

export async function getWeatherInfo() {
    let locationInfo;
    try {
        locationInfo = await getLocationInfo();
    } catch (error) {
        // error is "Unable to retrieve location"
        console.error(error);
        return null;
    }

    return fetch((process.env.REACT_APP_BACKEND_LINK || "") + "weather" + '?latitude=' + locationInfo.latitude + '&longitude=' + locationInfo.longitude + '&timezone=' + locationInfo.timezone)
        .then(response => {
            console.log(response);
            if (!response.ok) {
                console.error('Couldn\'t fetch weather info from backend: ', response.statusText);
                return null;
            }
            return response.json();
        }).then(data => {
            return new WeatherModel(data.temperature, data.weather_code, data.is_day);
        }).catch(error => {
            console.error('Error fetching weather info:', error);
            return null;
        });
}