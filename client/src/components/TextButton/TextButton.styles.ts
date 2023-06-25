import { BUTTON_COLOR } from "@/core/enums";
import { SHADOW_COLOR, TEXT_BUTTON_COLOR, TEXT_COLOR } from "@/styles/color";
import styled from "@emotion/styled";
import { TextButtonProps } from "./TextButton";

export const Button = styled.button<Omit<TextButtonProps, "children">>`
    font-weight: 600;
    box-shadow: 0rem 0.2rem 0.1rem 0rem ${SHADOW_COLOR.BLACK};
    border-radius: 0.5rem;
    cursor: pointer;
    color: ${({ background }) => TEXT_BUTTON_COLOR[background ?? BUTTON_COLOR.BLUE].font};
    background: ${({ background }) => TEXT_BUTTON_COLOR[background ?? BUTTON_COLOR.BLUE].background};
    border: 0.1rem solid ${({ background }) => TEXT_BUTTON_COLOR[background ?? BUTTON_COLOR.BLUE].border};
    font-size: ${({ size }) => {
        switch (size) {
            case "large":
                return "3.0rem";
            default:
                return "1.4rem";
        }
    }};
    padding: ${({ size }) => {
        switch (size) {
            case "large":
                return "1.8rem 3rem";
            default:
                return "0.6rem 1.4rem";
        }
    }};
`;
