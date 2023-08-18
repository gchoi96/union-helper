import { HTMLAttributes } from "react";
import { Container, Content, Title } from "./styles";
export function Counter({ children }: HTMLAttributes<HTMLDivElement>) {
    return <Container>{children}</Container>;
}

Counter.Title = function ({ children }: HTMLAttributes<HTMLParagraphElement>) {
    return <Title>{children}</Title>;
};

Counter.Content = function ({ children }: HTMLAttributes<HTMLParagraphElement>) {
    return <Content>{children}</Content>;
};
