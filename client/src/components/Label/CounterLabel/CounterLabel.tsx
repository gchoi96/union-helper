import { Container, Content, Title } from "./CounterLabel.styles";

interface CounterLabelProps {
    title: string;
    children: string;
}
export default function CounterLabel({ title, children }: CounterLabelProps) {
    return (
        <Container>
            <Title>{title}</Title>
            <Content>{children}</Content>
        </Container>
    );
}
