import { TEXT_COLOR } from "@/styles/color";
import { textBorder } from "@/styles/mixin";
import styled from "@emotion/styled";
import { flex } from "@/styles/mixin";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "@/styles/flexOptions";
import { LabelProps } from "./Label";
export const P = styled.p<Omit<LabelProps, "children">>`
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
    ${({ border }) => border && textBorder(border.weight, border.color)}
    font-size: ${({ size }) => size ?? "1.3rem"};
    font-weight: ${({ fontWeight }) => fontWeight ?? 500};
    color: ${({ color }) => color ?? TEXT_COLOR.BLACK};
`;
