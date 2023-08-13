import { BACKGROUND_COLOR, BORDER_COLOR } from "#constants/colors";
import { CARD_PER_PAGE } from "#constants/numbers";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import useCharacterList from "#hooks/useCharacterList";
import { useKey } from "#hooks/useKey";
import { border, flex } from "#styles/mixin";
import { css } from "@emotion/css";
import { useReducer } from "react";
import { Card } from "#components/units/Card";

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

    return (
        <div
            className={css`
                width: 100%;
                height: 192px;
                ${flex({
                    direction: FLEX_DIRECTION.ROW,
                    justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                    alignItems: ALIGN_ITEMS.CENTER,
                })}
                ${border("1px", BORDER_COLOR.GRAY, "10px")};
                background: ${BACKGROUND_COLOR.DARK_GREEN};
                padding: 9px 14px;
                > img {
                    cursor: pointer;
                }
            `}
        >
            <img src="/icons/prev_button.svg" onClick={() => dispatchPage(PAGE_ACTION_TYPES.DECREASE)} />
            <div
                className={css`
                    ${flex({ direction: FLEX_DIRECTION.ROW, alignItems: ALIGN_ITEMS.CENTER })}
                    > :not(:first-child) {
                        margin-left: 6px;
                    }
                `}
            >
                {characterList.slice(pageState.firstIndex, pageState.lastIndex + 1).map((character, idx) => (
                  <Card character={character} key={generate()} />
                  ))}
                {new Array(calcDummyCount()).fill(0).map((_, idx) => (
                    <div
                        className={css`
                            width: 116px;
                        `}
                        key={`card_dummy_${idx}`}
                    />
                ))}
            </div>
            <img src="/icons/next_button.svg" onClick={() => dispatchPage(PAGE_ACTION_TYPES.INCREASE)} />
        </div>
    );
}
