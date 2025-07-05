import { useEffect, useState } from "react";


export default function Clock({}) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer); // Clean up
    }, []);



    return (
        <div className="text-4xl font-mono text-primary-on bg-primary px-8 py-4 rounded-lg shadow-xl w-fit flex items-center">
            {formatTime(time)}
        </div>
    );
}

const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    });