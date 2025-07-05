class WeatherModel {
    temperature: number;
    weather_code: number;
    is_day: boolean;

    constructor(temperature: number, weather_code: number, is_day: boolean) {
        this.temperature = temperature;
        this.weather_code = weather_code;
        this.is_day = is_day;
    }
}


export default WeatherModel;