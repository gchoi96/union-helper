import { TEXT_COLOR } from "#constants/colors";
import { Border } from "#types/border";
import { HTMLAttributes } from "react";
import * as S from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
    width: string;
    height: string;
}
export function Box({ width, height, children, ...props }: Props) {
    return (
        <S.Container width={width} height={height} {...props}>
            <div>{children}</div>
        </S.Container>
    );
}

interface LabelProps extends HTMLAttributes<HTMLParagraphElement> {
    size?: string;
    weight?: number;
    color?: string;
    border?: Border;
}

Box.Label = function ({
    border,
    size = "13px",
    weight = 400,
    color = TEXT_COLOR.WHITE,
    children,
    ...props
}: LabelProps) {
    return (
        <S.Label border={border} size={size} weight={weight} color={color} {...props}>
            {children}
        </S.Label>
    );
};
