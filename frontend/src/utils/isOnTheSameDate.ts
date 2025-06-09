export default function isOnTheSameDate(d1: Date, d2: Date) {

    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}