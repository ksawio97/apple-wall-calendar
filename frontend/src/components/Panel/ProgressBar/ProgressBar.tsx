import { useEffect, useState } from "react";
import { useDataRefresh, DATA_REFRESH_INTERVAL } from "../../../hooks/useDataRefresh";
import style from "./ProgressBar.module.css";

export default function ProgressBar() {
    const { addDataRefreshListener, removeDataRefreshListener } = useDataRefresh();
    const [progress, setProgress] = useState(0);
    // attach to data refresh listener
    useEffect(() => {
        const { id } = addDataRefreshListener(() => setProgress(0));
        return () => { 
            removeDataRefreshListener(id)
        };
    }, [addDataRefreshListener, removeDataRefreshListener]);
    // update progress bar
    useEffect(() => {
        const updateMs = 50; // Update every ms
        const addProgress = updateMs / DATA_REFRESH_INTERVAL * 100;

        const interval = setInterval(() => {
            setProgress(prev => (prev + addProgress));
        }, updateMs);
        return () => clearInterval(interval);
    }, [setProgress, progress]);

    return (
        // not mine https://play.tailwindcss.com/53s5OjCLix
        <div className="relative w-12 h-12">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                className="text-surface-container-highest stroke-current"
                strokeWidth="6"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                ></circle>
                <circle
                className={`text-surface-on stroke-current ${style.progressCircle}`}
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2" 
                strokeDashoffset={`calc(251.2px - (251.2px * ${progress}) / 100)`}
                ></circle>
            </svg>
        </div>
    );
}