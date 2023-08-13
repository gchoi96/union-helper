import { SHADOW_COLOR } from "#constants/colors";
import { css } from "@emotion/css";
import { HTMLAttributes } from "react";

export function DimmedLayer({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={css`
                z-index: 100;
                position: absolute;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: ${SHADOW_COLOR.BLACK};
            `}
            {...props}
        >
            {children}
        </div>
    );
}
