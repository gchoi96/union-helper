import { CardWrapper, Container } from "./CardList.styles";

export default function CardList({ cards, children }: { cards: JSX.Element[]; children: JSX.Element }) {
    return (
        <Container>
            {children}
            <CardWrapper>{cards}</CardWrapper>
        </Container>
    );
}
