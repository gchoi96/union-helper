import { ReactNode } from "react";
import * as S from "./styles";
export function PageLayout({ children }: { children: ReactNode }) {
    return (
        <S.Layout>
            <div>{children}</div>
        </S.Layout>
    );
}
