export default function getMsToNextDay() {
    const today = new Date(Date.now());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    // Calculate milliseconds difference
    return tomorrow.getTime() - today.getTime();
}