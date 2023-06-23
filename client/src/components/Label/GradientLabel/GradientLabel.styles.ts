import { textBorder } from "@/styles/mixin";
import styled from "@emotion/styled";
import { flex } from "@/styles/mixin";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "@/styles/flexOptions";
import { GradientLabelProps } from "./GradientLabel";

export const GradientP = styled.p<Omit<GradientLabelProps, "children">>`
    position: relative;
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
    ${({ border }) => border && textBorder(border.weight, border.color)}
    font-size: ${({ size }) => size};
    font-weight: ${({ fontWeight }) => fontWeight};
    background: ${({ gradient }) => gradient};
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
    }
`;
