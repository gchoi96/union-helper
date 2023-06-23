import { CARD_PER_PAGE } from "@/core/constants";

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

export { PAGE_ACTION_TYPES, pageReducer, initialPageState };
