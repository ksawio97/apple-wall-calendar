const COLORS = [
    'bg-lapis',
    'bg-blue',
    'bg-parakeet',
    'bg-shamrock',
    'bg-green',
    'bg-macaroon',
    'bg-granola',
    'bg-indianYellow',
    'bg-sandstone',
    'bg-squash',
    'bg-spice',
    'bg-azure',
];

export default function getMonthColor(date: Date) {
    const index = date.getMonth();

    return COLORS[index];
}