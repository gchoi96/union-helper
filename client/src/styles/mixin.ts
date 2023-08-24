import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { FlexOptions } from "#types/flexOptions";
import { css } from "@emotion/react";

export const fontStyle = (color: string, size: string | number, weight?: string | number) => css`
    font-size: ${size};
    font-weight: ${String(weight) ?? 400};
    color: ${color};
`;

export const initSize = (width: string | number, height: string | number) => css`
    width: ${width};
    height: ${height};
`;

export const flex = ({
    direction = FLEX_DIRECTION.ROW,
    justifyContent = JUSTIFY_CONTENT.FLEX_START,
    alignItems = ALIGN_ITEMS.FLEX_START,
}: FlexOptions) => css`
    display: flex;
    flex-direction: ${direction};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
`;

export const background = (color: string, hoverColor: string) => css`
    background: ${color};
    :hover {
        background: ${hoverColor ?? color};
    }
`;

export const border = (width: string, color: string, radius?: string) => css`
    border: ${`${width} solid ${color}`};
    border-radius: ${radius ?? 0};
`;

export const textBorder = (weight: string | number, color: string) => css`
    text-shadow: ${`-${weight} 0 ${color}, 0 ${weight} ${color}, ${weight} 0 ${color}, 0 -${weight} ${color}`};
`;

export const spin = () => css`
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    animation: spin 2s linear infinite;
`;
