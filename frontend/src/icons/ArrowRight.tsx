import ArrowLeft from "./ArrowLeft";

export default function ArrowRight({ className }: { className?: string}) {
    return (
        <ArrowLeft className={"transform -scale-x-100 " + className}></ArrowLeft>
    );
}