import { BUTTON_COLOR, CELL_STATUS } from "@/core/enums";

export const CELL_COLOR = {
    [CELL_STATUS.AVAILABLE]: { NORMAL: "#323230", HOVER: "#535350" },
    [CELL_STATUS.UNAVAILABLE]: { NORMAL: "#552F2F", HOVER: "#743E3E" },
    [CELL_STATUS.TO_BE_OCCUPIED]: {
        NORMAL: "radial-gradient(50% 50% at 50% 50%, #BE9A6F 0%, #D2B28A 95.83%)",
        HOVER: "radial-gradient(50% 50% at 50% 50%, #BE9A6F 0%, #E9C59A 95.83%)",
    },
    [CELL_STATUS.OCCUPIED]: { NORMAL: "#33BBC3", HOVER: "" },
};
export const SHADOW_COLOR = {
    BLACK: "rgba(0, 0, 0, 0.75)",
    CHARACTER_COUNTER: "#4f4f4f",
    UNION_GRADE: "#DAAF37",
};
export const BACKGROUND_COLOR = {
    DARK_GREEN: "#222723",
    CHARACTER_CARD: "radial-gradient(96.14% 123.48% at 50% 50%, #42484C 0%, #222423 100%)",
    GRADIENT_GRAY: "radial-gradient(898.17% 171.68% at 50% 50%, #222723 0%, #9c9c9c 100%)",
    COUNTER: "#333333",
    INPUT: "#616161",
    MODAL: "#464643",
};

export const BORDER_COLOR = {
    DARK_ORANGE: "#ca8",
    GRAY: "#777777",
};

export const CARD_BUTTON_COLOR = {
    PRIMARY: "#4C96B2",
    DELETE: "#FF0A0A",
};

export const TEXT_BUTTON_COLOR = {
    [BUTTON_COLOR.BLUE]: {
        background: "radial-gradient(135.48% 135.48% at 50% 50%, #2299AA 0%, #1E8D9D 100%)",
        font: "#FFFFFF",
        border: "#33BBC3",
    },
    [BUTTON_COLOR.RED]: {
        background: "radial-gradient(135.48% 135.48% at 50% 50%, #FF0A0A 0%, #C20606 100%)",
        font: "#FFFFFF",
        border: "#FF4747",
    },
    [BUTTON_COLOR.GREEN]: {
        background: "radial-gradient(135.48% 135.48% at 50% 50%, #AACC33 0%, #779900 100%)",
        font: "#FFFFFF",
        border: "#DDDD22",
    },
};

export const CARD_COLOR = {
    DARK: "#2f2e30",
};

export const BLACK = "#000000";

export const TEXT_COLOR = {
    GOLD: "#E9DEAD",
    WHITE: "#ffffff",
    GRAY: "#8C8C8E",
    LIGHT_GRAY: "#999999",
    BLACK: "#000000",
    CARD_GRADE: "linear-gradient(180deg, #FEEEDD 0%, #DBBA93 100%)",
    CONTROL_TITLE: "linear-gradient(180deg, #ffddbb 35.42%, #ccaa88 100%)",
    COUNTER: "linear-gradient(180deg, #ffffff 45.71%, rgba(255, 255, 255, 0) 132.98%)",
    BOX_CONTENT: "#808280",
};
