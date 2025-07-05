class WeatherModel {
    temperature: number;
    rain: boolean;
    snowfall: boolean;

    constructor(temperature: number, rain: boolean, snowfall: boolean) {
        this.temperature = temperature;
        this.rain = rain;
        this.snowfall = snowfall;
    }
}


export default WeatherModel;