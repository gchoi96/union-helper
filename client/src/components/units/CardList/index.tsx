import { CARD_PER_PAGE } from "#constants/numbers";
import useCharacterList from "#hooks/useCharacterList";
import { useKey } from "#hooks/useKey";
import { useReducer, WheelEventHandler } from "react";
import { Card } from "#components/units/Card";
import * as S from "./styles";
interface PageState {
    currentPage: number;
    firstIndex: number;
    lastIndex: number;
}

enum PAGE_ACTION_TYPES {
    INCREASE = "INCREASE",
    DECREASE = "DECREASE",
}

const calcPageIndex = (totalLength: number, page: number, perPage: number) => {
    return { firstIndex: page * perPage, lastIndex: Math.min(totalLength - 1, page * perPage + perPage - 1) };
};

const pageReducer = (totalLength: number, perPage: number) => {
    const lastPage = Math.ceil(totalLength / CARD_PER_PAGE) - 1;
    return (pageState: PageState, action: PAGE_ACTION_TYPES) => {
        let nextPage = pageState.currentPage;
        if (action === PAGE_ACTION_TYPES.INCREASE) nextPage = ++nextPage > lastPage ? 0 : nextPage;
        else if (action === PAGE_ACTION_TYPES.DECREASE) nextPage = --nextPage < 0 ? lastPage : nextPage;
        return { currentPage: nextPage, ...calcPageIndex(totalLength, nextPage, perPage) };
    };
};

const initialPageState = {
    currentPage: 0,
    firstIndex: 0,
    lastIndex: CARD_PER_PAGE - 1,
};

export function CardList() {
    const { characterList } = useCharacterList();
    const [pageState, dispatchPage] = useReducer(pageReducer(characterList.length, CARD_PER_PAGE), initialPageState);
    const { generate } = useKey("card");
    const calcDummyCount = () => {
        if (pageState.lastIndex - pageState.firstIndex === CARD_PER_PAGE - 1) return 0;
        return CARD_PER_PAGE - (characterList.length % CARD_PER_PAGE);
    };

    const onWheel: WheelEventHandler<HTMLDivElement> = (e) => {
        const isUp = e.deltaY > 0;
        dispatchPage(isUp ? PAGE_ACTION_TYPES.DECREASE : PAGE_ACTION_TYPES.INCREASE);
    };

    return (
        <S.Container onWheel={onWheel}>
            <img
                src="/icons/prev_button.svg"
                onClick={() => dispatchPage(PAGE_ACTION_TYPES.DECREASE)}
                alt="prev_button"
            />
            <S.Page>
                {characterList.slice(pageState.firstIndex, pageState.lastIndex + 1).map((character, idx) => (
                    <Card character={character} key={generate()} />
                ))}
                {new Array(calcDummyCount()).fill(0).map((_, idx) => (
                    <S.Dummy key={`card_dummy_${idx}`} />
                ))}
            </S.Page>
            <img
                src="/icons/next_button.svg"
                onClick={() => dispatchPage(PAGE_ACTION_TYPES.INCREASE)}
                alt="next_button"
            />
        </S.Container>
    );
}
