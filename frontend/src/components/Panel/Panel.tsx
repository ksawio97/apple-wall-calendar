import Clock from "./Clock/Clock";

export default function Panel({}) {
    return (
        <div className="w-full h-fit flex flex-col justify-center px-10 py-6">
            <Clock></Clock>
        </div>
    );
}