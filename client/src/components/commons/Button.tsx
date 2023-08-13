import { BACKGROUND_COLOR, CARD_BUTTON_COLOR, SHADOW_COLOR, TEXT_BUTTON_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#enums/flex";
import { BUTTON_TYPE } from "#enums/status";
import { flex, initSize } from "#styles/mixin";
import { css } from "@emotion/css";
import { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLButtonElement> {
    size?: "small" | "large";
    type?: BUTTON_TYPE.BLUE | BUTTON_TYPE.RED | BUTTON_TYPE.GREEN;
    styles?: string;
}
export function Button({ type = BUTTON_TYPE.BLUE, size = "small", children, styles, ...props }: Props) {
    return (
        <button
            className={css`
                font-weight: 600;
                box-shadow: 0px 2px 1px 0px ${SHADOW_COLOR.BLACK};
                border-radius: 5px;
                cursor: pointer;
                color: ${TEXT_BUTTON_COLOR[type].font};
                background: ${TEXT_BUTTON_COLOR[type].background};
                border: 1px solid ${TEXT_BUTTON_COLOR[type].border};
                font-size: ${size === "large" ? "30px" : "14px"};
                padding: ${size === "large" ? "18px 30px" : "6px 14px"};
                ${styles}
            `}
            {...props}
        >
            {children}
        </button>
    );
}

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
    color?: string;
    image: string;
    width?: string;
    height?: string;
    disabled?: boolean;
}

Button.IconButton = function ({ color = CARD_BUTTON_COLOR.PRIMARY, image, width = "20px", height = "20px", ...props }: IconButtonProps) {
    return (
        <button
            className={css`
                ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
                ${initSize(width, height)};
                border: none;
                border-radius: 5px;
                padding: 0;
                background: ${color};
                border: none;
                :hover {
                    cursor: pointer;
                }
                img {
                    width: 80%;
                    height: 80%;
                }
                :disabled {
                    background: ${BACKGROUND_COLOR.COUNTER};
                }
            `}
            {...props}
        >
            <img src={image} alt="card_button" />
        </button>
    );
};
