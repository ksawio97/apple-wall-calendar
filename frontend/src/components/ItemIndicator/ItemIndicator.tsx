export default function ItemIndicator({ highlight }: { highlight: boolean}) {
    return (
        <div className={`w-2 h-2 rounded-full  ${highlight ? 'bg-primary' : 'bg-surface-on'}`}>
        </div>
    );
}