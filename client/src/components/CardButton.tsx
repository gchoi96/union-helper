import { BACKGROUND_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#enums/flex";
import { flex, initSize } from "#styles/mixin";
import { css } from "@emotion/css";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    color: string;
    image: string;
    width?: string;
    height?: string;
    disabled?: boolean;
}
export function CardButton({ color, image, width = "20px", height = "20px", ...props }: Props) {
    return (
        <button
            className={css`
                ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
                ${initSize(width, height)};
                border: none;
                border-radius: 0.5rem;
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
}
