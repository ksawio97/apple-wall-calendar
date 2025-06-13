export default function ItemIndicator({ highlight }: { highlight: boolean}) {
    return (
        <div className={`w-2 h-2 rounded-full  ${highlight ? 'bg-red-400' : 'bg-gray-300'}`}>
        </div>
    );
}