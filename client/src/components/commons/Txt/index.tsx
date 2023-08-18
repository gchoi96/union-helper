import { TEXT_COLOR } from "#constants/colors";
import { HTMLAttributes } from "react";
import * as S from "./styles";
interface Props extends HTMLAttributes<HTMLParagraphElement> {
    size?: string | number;
    border?: { weight: string | number; color: string };
    weight?: string | number;
    color?: string;
}

export function Txt({ size = "13px", border, weight = 500, color = TEXT_COLOR.BLACK, children, ...props }: Props) {
    return (
        <S.Txt border={border} weight={weight} size={size} color={color} {...props}>
            {children}
        </S.Txt>
    );
}

interface GradientProps extends Omit<Props, "color"> {
    gradient: string;
    shadow?: string;
}

Txt.GradientTxt = function ({
    size = "16px",
    border,
    weight = 400,
    gradient,
    children,
    shadow,
    ...props
}: GradientProps) {
    return (
        <S.GradientTxt size={size} border={border} weight={weight} gradient={gradient} shadow={shadow} {...props}>
            {children}
        </S.GradientTxt>
    );
};
