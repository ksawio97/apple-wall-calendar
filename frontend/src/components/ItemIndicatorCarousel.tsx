export default function ItemIndicatorCarousel({ highlight }: { highlight: boolean}) {
    return (
        <div className={`flex-1 ${highlight ? 'bg-red-400' : 'bg-gray-200'}`}>
        </div>
    );
}