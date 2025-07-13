import weatherDescriptionsData from '../data/weatherDescriptions.json';

type WeatherDescription = {
    description: string;
    image: string;
};

// <3 https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
const weatherDescriptions: Record<string, { day: WeatherDescription; night: WeatherDescription }> = weatherDescriptionsData;

export default function getWeatherDescription(weatherCode: number, isDay: boolean): WeatherDescription | null {
    const code = String(weatherCode);
    const entry = weatherDescriptions[code];
    if (!entry) {
        return null;
    }
    return isDay ? entry.day : entry.night;
}