import { AbilityList } from "#components/units/AbilityList";
import { Board } from "#components/units/Board";
import { CardControl } from "#components/units/CardControl";
import { CardList } from "#components/units/CardList";
import { MainControl } from "#components/units/MainControl";
import { Container } from "./styles";

export function UnionPage() {
    return (
        <Container>
            <section>
                <Board />
                <CardControl />
                <CardList />
            </section>
            <section>
                <MainControl />
                <AbilityList />
            </section>
        </Container>
    );
}
