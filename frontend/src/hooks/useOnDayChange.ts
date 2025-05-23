import { useEffect } from "react";
import getMsToNextDay from "../utils/getMsToNextDay";

export default function useOnDayChange(onDayChange: () => void) {
    useEffect(() => {
        const msToNextDay = getMsToNextDay();
        const timeoutId = setTimeout(() => {
            onDayChange();
        }, msToNextDay);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [onDayChange]);
}