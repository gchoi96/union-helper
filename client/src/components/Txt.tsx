import { TEXT_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#enums/flex";
import { flex, textBorder } from "#styles/mixin";
import { css } from "@emotion/css";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    size?: string | number;
    border?: { weight: string | number; color: string };
    weight?: string | number;
    color?: string;
}

export function Txt({ size = "13px", border, weight = 500, color = TEXT_COLOR.BLACK, children, ...props }: Props) {
    return (
        <p
            className={css`
                ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
                ${border && textBorder(border.weight, border.color)};
                font-size: ${size};
                font-weight: ${weight};
                color: ${color};
            `}
        >
            {children}
        </p>
    );
}

interface GradientProps extends Omit<Props, "color"> {
    gradient: string;
}

Txt.GradientTxt = function ({ size, border, weight, gradient, children, ...props }: GradientProps) {
    return (
        <p
            className={css`
                position: relative;
                ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })};
                font-size: ${size};
                font-weight: ${weight};
                background: ${gradient};
                ${border && textBorder(border.weight, border.color)};
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: none;
                :before {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: -1;
                    ${border && textBorder(border.weight, border.color)}
                }
            `}
            {...props}
        >
            {children}
        </p>
    );
};
