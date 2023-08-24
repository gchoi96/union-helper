import { HTMLAttributes } from "react";
import * as S from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
    width: string;
    height: string;
    label?: string;
}
export function Box({ width, height, children, label, ...props }: Props) {
    return (
        <S.Container width={width} height={height} {...props}>
            {label && <S.Label>{label}</S.Label>}
            <S.Content>{children}</S.Content>
        </S.Container>
    );
}