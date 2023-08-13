import { BACKGROUND_COLOR, BORDER_COLOR, TEXT_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { flex, textBorder } from "#styles/mixin";
import { css } from "@emotion/css";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    width: string;
    height: string;
}
export function Box({ width, height, children, ...props }: Props) {
    return (
        <div
            className={css`
                ${flex({
                    direction: FLEX_DIRECTION.COLUMN,
                })};
                padding: 11.5px 11px;
                border-radius: 10px;
                border: 1px solid ${BORDER_COLOR.GRAY};
                background: ${BACKGROUND_COLOR.DARK_GREEN};
                width: ${width};
                height: ${height};
                text-align: center;
                font-size: 10px;
                font-weight: 500;
                letter-spacing: 0.2px;
                color: ${TEXT_COLOR.BOX_CONTENT};
                > div {
                    ${flex({ direction: FLEX_DIRECTION.COLUMN })}
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    ::-webkit-scrollbar {
                        background-color: transparent;
                    }
                    ::-webkit-scrollbar-thumb {
                        background-color: ${BACKGROUND_COLOR.COUNTER};
                        border-radius: 10px;
                    }
                }
                > :first-child {
                    margin-bottom: 12px;
                }
            `}
        >
            {children}
        </div>
    );
}

interface LabelProps extends HTMLAttributes<HTMLParagraphElement> {
    size?: string;
    weight?: number;
    color?: string;
    border?: {
        weight: string | number;
        color: string;
    };
}

Box.Label = function ({ border, size = "13px", weight = 400, color = TEXT_COLOR.WHITE, children, ...props }: LabelProps) {
    return (
        <p
            className={css`
                ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })};
                ${border && textBorder(border.weight, border.color)}
                font-size: ${size};
                font-weight: ${weight ?? 500};
                color: ${color ?? TEXT_COLOR.BLACK};
            `}
            {...props}
        >
            {children}
        </p>
    );
};
