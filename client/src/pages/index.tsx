import "../app/globals.css";
import Board from "@/components/Board/Board";
import CardControl from "@/components/CardControl/CardControl";
import CardList from "@/components/CardList/CardList";
import { Container } from "./index.styles";
import RaidEffect from "@/components/RaidEffect/RaidEffect";
import MainControl from "@/components/MainControl/MainControl";

export default function Main() {
    return (
        <Container>
            <div>
                <Board />
                <CardControl />
                <CardList characters={[]} />
            </div>
            <div>
                <MainControl />
                <RaidEffect />
            </div>
        </Container>
    );
}
