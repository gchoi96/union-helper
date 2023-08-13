import { TEXT_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, FLEX_DIRECTION } from "#enums/flex";
import { flex } from "#styles/mixin";
import { css } from "@emotion/css";
import { HTMLAttributes } from "react";
export function Counter({ children }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={css`
                ${flex({ direction: FLEX_DIRECTION.COLUMN, alignItems: ALIGN_ITEMS.CENTER })};
                > :not(:first-child) {
                    margin-top: 3px;
                }
                > p {
                    font-weight: 700;
                    letter-spacing: -0.7px;
                    background: ${TEXT_COLOR.COUNTER};
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}
        >
            {children}
        </div>
    );
}

Counter.Title = function ({ children }: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={css`
                font-size: 14px;
            `}
        >
            {children}
        </p>
    );
};

Counter.Content = function ({ children }: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={css`
                font-size: 40px;
                padding: 0 1px;
            `}
        >
            {children}
        </p>
    );
};
