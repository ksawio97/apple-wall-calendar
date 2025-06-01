import { useEffect } from "react";
import getMsToNextDay from "../utils/getMsToNextDay";

export default function useOnDayChange(onDayChange: (today: Date) => void) {
    useEffect(() => {
        const scheduleNextDayChange = () => {
            const msToNextDay = getMsToNextDay();
            const timeoutId = setTimeout(() => {
                onDayChange(new Date());
                scheduleNextDayChange(); // Schedule the next timeout
            }, msToNextDay);

            return timeoutId; // Return the timeout ID for cleanup
        };

        const timeoutId = scheduleNextDayChange();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [onDayChange]);
}