export type LocationInfo = {
    latitude: number;
    longitude: number;
    timezone: string;
}

export default function getLocationInfo(): Promise<LocationInfo> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                resolve({ latitude, longitude, timezone });
            },
            (error) => {
                console.error("Error getting location:", error);
                reject("Unable to retrieve location");
            }
        );
    });
}