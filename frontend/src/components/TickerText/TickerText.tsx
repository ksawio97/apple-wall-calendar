import { useEffect, useRef, useState } from 'react';
import styles from './TickerText.module.css';

export default function TickerText({ text, className }: { text: string, className: string }) {
    const tickerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (tickerRef.current && textRef.current) {
                const tickerWidth = tickerRef.current.offsetWidth;
                const textWidth = textRef.current.offsetWidth;
                setIsOverflowing(textWidth > tickerWidth);
            }
        };
        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, [text]);

    return (
        <div ref={tickerRef} className="overflow-hidden whitespace-nowrap w-full h-full">
            <div ref={textRef} className={`inline-block ${className} ${isOverflowing ? styles.animateSlide : ''}`}>
                {text}
            </div>
        </div>
    );
}