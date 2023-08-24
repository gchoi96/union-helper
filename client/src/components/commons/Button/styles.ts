import { SHADOW_COLOR, TEXT_BUTTON_COLOR } from "#constants/colors";
import { BUTTON_TYPE } from "#enums/status";
import styled from "@emotion/styled";
interface ButtonProps {
    size: "small" | "large";
    styles?: string;
    type: BUTTON_TYPE.BLUE | BUTTON_TYPE.RED | BUTTON_TYPE.GREEN;
}

export const Button = styled.div<ButtonProps>`
    font-weight: 700;
    box-shadow: 0px 2px 1px 0px ${SHADOW_COLOR.BLACK};
    border-radius: 5px;
    cursor: pointer;
    color: ${({ type }) => {
        return TEXT_BUTTON_COLOR[type].font;
    }};
    background: ${({ type }) => {
        return TEXT_BUTTON_COLOR[type].background;
    }};
    border: 1px solid
        ${({ type }) => {
            return TEXT_BUTTON_COLOR[type].border;
        }};
    font-size: ${({ size }) => (size === "large" ? "30px" : "14px")};
    padding: ${({ size }) => (size === "large" ? "18px 30px" : "6px 14px")};
    ${({ styles }) => styles}
`;
