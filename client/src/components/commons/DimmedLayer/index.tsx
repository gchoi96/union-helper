import { HTMLAttributes } from "react";
import * as S from "./styles";
export function DimmedLayer({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <S.DimmedLayer {...props}>{children}</S.DimmedLayer>;
}
