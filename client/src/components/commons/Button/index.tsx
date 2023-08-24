import { BACKGROUND_COLOR, CARD_BUTTON_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#enums/flex";
import { BUTTON_TYPE } from "#enums/status";
import { flex, initSize } from "#styles/mixin";
import { css } from "@emotion/css";
import { HTMLAttributes } from "react";
import * as S from "./styles";

// styled.button이 고장남
export interface Props extends HTMLAttributes<HTMLElement> {
    size?: "small" | "large";
    type?: BUTTON_TYPE.BLUE | BUTTON_TYPE.RED | BUTTON_TYPE.GREEN;
    styles?: string;
}
export function Button({ type = BUTTON_TYPE.BLUE, size = "small",  styles, children, ...props }: Props) {
    return <S.Button type={type} styles={styles} size={size} {...props}>{children}</S.Button>;
}

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
    color?: string;
    image: string;
    width?: string;
    height?: string;
    disabled?: boolean;
}

Button.IconButton = function ({
    color = CARD_BUTTON_COLOR.PRIMARY,
    image,
    width = "20px",
    height = "20px",
    ...props
}: IconButtonProps) {
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
