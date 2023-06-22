import { TEXT_COLOR } from "@/styles/color";
import { textBorder } from "@/styles/mixin";
import styled from "@emotion/styled";
interface LabelStyleProps {
    size?: string | number;
    border?: { weight: string | number; color: string };
    fontWeight?: string | number;
    color?: string;
}
export const P = styled.p<LabelStyleProps>`
    ${({ border }) => border && textBorder(border.weight, border.color)}
    font-size: ${({ size }) => size ?? "1.3rem"};
    font-weight: ${({ fontWeight }) => fontWeight ?? 500};
    color: ${({ color }) => color ?? TEXT_COLOR.BLACK};
`;
