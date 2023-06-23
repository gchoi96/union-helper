import { CELL_STATUS } from "@/core/enums";

export const CELL_COLOR = {
    [CELL_STATUS.AVAILABLE]: { NORMAL: "#323230", HOVER: "#535350" },
    [CELL_STATUS.UNAVAILABLE]: { NORMAL: "#552F2F", HOVER: "#743E3E" },
    [CELL_STATUS.TO_BE_OCCUPIED]: {
        NORMAL: "radial-gradient(50% 50% at 50% 50%, #BE9A6F 0%, #D2B28A 95.83%)",
        HOVER: "radial-gradient(50% 50% at 50% 50%, #BE9A6F 0%, #E9C59A 95.83%)",
    },
    [CELL_STATUS.OCCUPIED]: { NORMAL: "#33BBC3", HOVER: "" },
};

export const BACKGROUND_COLOR = {
    BOARD_WRAPPER: "#222723",
    CHARACTER_CARD: "radial-gradient(96.14% 123.48% at 50% 50%, #42484C 0%, #222423 100%)",
    CARD_CONTAINER: "#222723",
};

export const BORDER_COLOR = {
    DARK_ORANGE: "#ca8",
    GRAY: "#777777",
};

export const BUTTON_COLOR = {
    PRIMARY: "#4C96B2",
    DELETE: "#FF0A0A",
};

export const CARD_COLOR = {
    DARK: "#2f2e30",
};

export const BLACK = "#000000";

export const TEXT_COLOR = {
    GOLD: "#E9DEAD",
    WHITE: "#ffffff",
    GRAY: "#8C8C8E",
    BLACK: "#000000",
    CARD_GRADE: "linear-gradient(180deg, #FEEEDD 0%, #DBBA93 100%)",
};
