import { JOB_GROUP } from "#enums/job";
import { BUTTON_TYPE, CELL_STATUS } from "#enums/status";

export const COLOR = {
    BLACK: "#000000",
    BLUE: "#1E8D9D",
    DARKGRAY: "#222423",
    DARKGRAY2: "#222723",
    GRAY: "#2F2E30",
    GRAY2: "#323230",
    GRAY3: "#42484C",
    DARKGRAY3: "#464643",
    BLUE2: "#4C96B2",
    DARKGRAY4: "#333333",
    GRAY4: "#4F4F4F",
    GRAY5: "#535350",
    GRAY6: "#616161",
    GREEN: "#779900",
    SILVER: "#777777",
    GRAY7: "#808280",
    GRAY8: "#8C8C8E",
    GRAY9: "#999999",
    GRAY10: "#888888",
    TAN: "#BE9A6F",
    RED: "#C20606",
    BROWN: "#CA8",
    SAND: "#CCAA88",
    TAN2: "#D2B28A",
    YELLOW: "#DAAF37",
    PEACH: "#DBBA93",
    YELLOW2: "#DDDD22",
    BEIGE: "#E9C59A",
    PALE: "#E9DEAD",
    LIGHTPEACH: "#FEEEDD",
    CORAL: "#FF0A0A",
    CORAL2: "#FF4747",
    LIGHTCORAL: "#FFDDBB",
    TEAL: "#2299AA",
    TEAL2: "#33BBCC",
    PINK: "#F7A8B8",
    WHITE: "#FFFFFF",
    TRANSPARENT_BLACK: "rgba(0, 0, 0, 0.75)",
    TRANSPARENT_BLACK2: "rgba(0, 0, 0, 0.25)",
    TRANSPARENT_WHITE: "rgba(255, 255, 255, 0)",
};

const GRADIENT = {
    BEIGE: `radial-gradient(50% 50% at 50% 50%, ${COLOR.BEIGE} 0%, ${COLOR.PALE} 95.83%)`,
    BROWN: `radial-gradient(50% 50% at 50% 50%, ${COLOR.BEIGE} 0%, ${COLOR.TAN2} 95.83%)`,
    DARK: `radial-gradient(96.14% 123.48% at 50% 50%, ${COLOR.GRAY5} 0%, ${COLOR.DARKGRAY} 100%)`,
    GRAY: `radial-gradient(898.17% 171.68% at 50% 50%, ${COLOR.DARKGRAY2} 0%, ${COLOR.SILVER} 100%)`,
    TEAL: `radial-gradient(135.48% 135.48% at 50% 50%, ${COLOR.BLUE} 0%, ${COLOR.TEAL} 100%)`,
    RED: `radial-gradient(135.48% 135.48% at 50% 50%, ${COLOR.CORAL2} 0%, ${COLOR.RED} 100%)`,
    GREEN: `radial-gradient(135.48% 135.48% at 50% 50%, ${COLOR.GREEN} 0%, ${COLOR.GREEN} 100%)`,
    PEACH: `linear-gradient(180deg, ${COLOR.LIGHTPEACH} 0%, ${COLOR.PEACH} 100%)`,
    YELLOW: `linear-gradient(180deg, ${COLOR.YELLOW} 35.42%, ${COLOR.SAND} 100%)`,
    WHITE: `linear-gradient(180deg, ${COLOR.WHITE} 45.71%, ${COLOR.TRANSPARENT_WHITE} 132.98%)`,
};

export const CELL_COLOR = {
    [CELL_STATUS.NOT_SELECTED]: { NORMAL: COLOR.GRAY2, HOVER: COLOR.GRAY5 },
    [CELL_STATUS.SELECTED]: {
        NORMAL: GRADIENT.BEIGE,
        HOVER: GRADIENT.BROWN,
    },
    [CELL_STATUS.PLACED]: {
        [JOB_GROUP.도적]: { NORMAL: "#8A58D3", HOVER: "#6C4ACB" },
        [JOB_GROUP.궁수]: { NORMAL: "#A2C451", HOVER: "#6F9839" },
        [JOB_GROUP.전사]: { NORMAL: "#C5375C", HOVER: "#AA214D" },
        [JOB_GROUP.해적]: { NORMAL: "#8B867F", HOVER: "#6F7274" },
        [JOB_GROUP.마법사]: { NORMAL: "#93C4D4", HOVER: "#2C92A4" },
        [JOB_GROUP.제논]: { NORMAL: COLOR.PALE, HOVER: COLOR.TAN2 },
    },
};

export const SHADOW_COLOR = {
    BLACK: COLOR.TRANSPARENT_BLACK,
    CHARACTER_COUNTER: COLOR.DARKGRAY4,
    UNION_GRADE: COLOR.YELLOW,
    TRANSPARENT: COLOR.TRANSPARENT_BLACK2,
};

export const BACKGROUND_COLOR = {
    DARK_GREEN: COLOR.DARKGRAY2,
    CHARACTER_CARD: GRADIENT.DARK,
    GRADIENT_GRAY: GRADIENT.GRAY,
    COUNTER: COLOR.GRAY,
    INPUT: COLOR.GRAY6,
    MODAL: COLOR.DARKGRAY3,
};

export const BORDER_COLOR = {
    DARK_ORANGE: COLOR.BROWN,
    GRAY: COLOR.SILVER,
    CELL: COLOR.GRAY10,
};

export const CARD_BUTTON_COLOR = {
    PRIMARY: COLOR.BLUE2,
    DELETE: COLOR.CORAL,
};

export const TEXT_BUTTON_COLOR = {
    [BUTTON_TYPE.BLUE]: {
        background: GRADIENT.TEAL,
        font: COLOR.WHITE,
        border: COLOR.TEAL2,
    },
    [BUTTON_TYPE.RED]: {
        background: GRADIENT.RED,
        font: COLOR.WHITE,
        border: COLOR.CORAL2,
    },
    [BUTTON_TYPE.GREEN]: {
        background: GRADIENT.GREEN,
        font: COLOR.WHITE,
        border: COLOR.YELLOW2,
    },
};

export const CARD_COLOR = {
    DARK: COLOR.GRAY,
};

export const TEXT_COLOR = {
    GOLD: COLOR.PALE,
    WHITE: COLOR.WHITE,
    GRAY: COLOR.GRAY8,
    LIGHT_GRAY: COLOR.GRAY9,
    BLACK: COLOR.BLACK,
    CARD_GRADE: GRADIENT.PEACH,
    CONTROL_TITLE: GRADIENT.YELLOW,
    COUNTER: GRADIENT.WHITE,
    BOX_CONTENT: COLOR.GRAY7,
};
