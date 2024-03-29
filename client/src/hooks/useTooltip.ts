import { useEffect, useRef, useState } from "react";

export default function useTooltip() {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;
        const onMouseLeave = () => {
            setIsTooltipVisible(false);
        };

        const onMouseEnter = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            setIsTooltipVisible(true);
            containerRef.current?.addEventListener("mousemove", onMouseMove);
            setTooltipPosition({
                x: clientX + 10,
                y: clientY + 10,
            });
        };

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            setTooltipPosition({
                x: clientX + 10,
                y: clientY + 10,
            });
        };
        containerRef.current.addEventListener("mouseenter", onMouseEnter);
        containerRef.current.addEventListener("mousemove", onMouseMove);
        containerRef.current.addEventListener("mouseleave", onMouseLeave);
    }, [containerRef]);

    return { isTooltipVisible, containerRef, tooltipPosition };
}
