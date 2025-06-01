export default function isOnTheSameDate(d1: Date, d2: Date) {
    return d1.getUTCFullYear() === d2.getFullYear() && d1.getUTCMonth() === d2.getUTCMonth() && d1.getUTCDate() === d2.getUTCDate();
}