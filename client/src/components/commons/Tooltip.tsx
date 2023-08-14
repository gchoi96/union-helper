import { BORDER_COLOR, SHADOW_COLOR, TEXT_COLOR } from "#constants/colors";
import { css } from "@emotion/css";
import { HTMLAttributes } from "react";
interface Props extends HTMLAttributes<HTMLDivElement> {
    position: { x: number; y: number };
}
export function Tooltip({ position, children, ...props }: Props) {
    return (
        <div
            className={css`
                position: absolute;
                background: ${SHADOW_COLOR.BLACK};
                color: ${TEXT_COLOR.WHITE};
                padding: 4px 8px;
                border: 1px solid ${BORDER_COLOR.GRAY};
                border-radius: 10px;
                left: ${`${position.x}px`};
                top: ${`${position.y}px`};
                z-index:100;
                font-size: 10px;
            `}
            {...props}
        >
            {children}
        </div>
    );
}
