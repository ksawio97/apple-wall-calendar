const MONTH_COLORS = [
  "#1E3A8A", // January - Bold Navy (Winter)
  "#581C87", // February - Deep Purple (Winter)
  "#1C352D", // March - Medium Jungle Green (Spring)
  "#004B49", // April - Deep Jungle Green (Spring)
  "#22C55E", // May - Bright Green (Spring)
  "#FBBF24", // June - Golden Yellow (Summer)
  "#E8AC41", // July - Hunyadi Yellow (Summer)
  "#F59E0B", // August - Deep Gold (Summer)
  "#F97316", // September - Strong Orange (Autumn)
  "#EA580C", // October - Pumpkin Orange (Autumn)
  "#92400E", // November - Burnt Brown (Autumn)
  "#000072", // December - Dark Blue (Winter)
];
export default function getMonthColor(day: Date): string {
    const index = day.getMonth();
    return MONTH_COLORS[index];
}