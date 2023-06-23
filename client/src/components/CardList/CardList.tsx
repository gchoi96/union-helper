import { CARD_PER_PAGE, CARD_WIDTH } from "@/core/constants";
import { CharacterInfo } from "@/core/types/CharacterInfo";
import { useReducer, useState } from "react";
import CharacterCard from "../CharacterCard/CharacterCard";
import { initialPageState, pageReducer, PAGE_ACTION_TYPES } from "./CardList.reducer";
import { CardWrapper, Container } from "./CardList.styles";

interface CardListProps {
    characters: CharacterInfo[];
}

export default function CardList({ characters }: CardListProps) {
    const [pageState, dispatchPage] = useReducer(pageReducer(characters.length, CARD_PER_PAGE), initialPageState);

    const calcDummyCount = () => {
        return CARD_PER_PAGE - (pageState.lastIndex + 1 - pageState.firstIndex);
    };

    return (
        <Container>
            <img src="/prev_button.svg" onClick={() => dispatchPage(PAGE_ACTION_TYPES.DECREASE)} />
            <CardWrapper>
                {characters.slice(pageState.firstIndex, pageState.lastIndex + 1).map((characterInfo, idx) => (
                    <CharacterCard characterInfo={characterInfo} key={`card_${idx}`} />
                ))}
                {new Array(calcDummyCount()).fill(0).map((_, idx) => (
                    <div style={{ width: CARD_WIDTH }} key={`card_dummy_${idx}`} />
                ))}
            </CardWrapper>
            <img src="/next_button.svg" onClick={() => dispatchPage(PAGE_ACTION_TYPES.INCREASE)} />
        </Container>
    );
}
