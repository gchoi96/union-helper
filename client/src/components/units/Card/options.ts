import { CARD_BUTTON_COLOR, TEXT_COLOR } from "#constants/colors";

export const gradeLabelOptions = {
    size: "28px",
    weight: 600,
    gradient: TEXT_COLOR.CARD_GRADE,
    border: {
        weight: "2px",
        color: TEXT_COLOR.BLACK,
    },
};

export const levelLabelOptions = {
    size: "12px",
    weight: 600,
    color: TEXT_COLOR.GRAY,
};

export const jobLabelOptions = {
    size: "10px",
    weight: 500,
    color: TEXT_COLOR.GRAY,
};

export const nameLabelOptions = {
    size: "12px",
    weight: 600,
    color: TEXT_COLOR.GOLD,
};

export const deleteButtonOptions = {
    color: CARD_BUTTON_COLOR.DELETE,
    image: "/icons/delete_icon.svg",
};

export const refreshButtonOptions = {
    color: CARD_BUTTON_COLOR.PRIMARY,
    image: "/icons/refresh_icon.svg",
};
