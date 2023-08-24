import { Border } from "#types/border";
import styled from "@emotion/styled";
import { flex, textBorder } from "#styles/mixin";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#enums/flex";
interface TxtProps {
    size: string | number;
    weight: number | string;
    color: string;
    border?: Border;
}
interface GradientProps extends Omit<TxtProps, "color"> {
    gradient: string;
    shadow?: string;
}

export const Txt = styled.p<TxtProps>`
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
    ${({ border }) => border && textBorder(border.weight, border.color)};
    font-size: ${({ size }) => size};
    font-weight: ${({ weight }) => weight};
    color: ${({ color }) => color};
`;

export const GradientTxt = styled.p<GradientProps>`
    position: relative;
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })};
    font-size: ${({ size }) => size};
    font-weight: ${({ weight }) => weight};
    background: ${({ gradient }) => gradient};
    ${({ border }) => border && textBorder(border.weight, border.color)};
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
        ${({ border }) => border && textBorder(border.weight, border.color)}
        text-shadow: ${({ shadow }) => shadow};
    }
`;
