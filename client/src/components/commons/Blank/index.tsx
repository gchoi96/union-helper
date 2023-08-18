import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: never;
    direction?: "horizontal" | "vertical";
    size: number;
}

export function Blank({ direction = "vertical", size, ...props }: Props) {
    return (
        <div
            style={{
                width: direction === "horizontal" ? `${size}px` : undefined,
                height: direction === "vertical" ? `${size}px` : undefined,
            }}
            {...props}
        />
    );
}
