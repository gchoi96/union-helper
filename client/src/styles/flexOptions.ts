export const enum FLEX_DIRECTION {
    ROW = "row",
    COLUMN = "column",
}

export const enum ALIGN_ITEMS {
    STRETCH = "stretch",
    CENTER = "center",
    FLEX_START = "flex-start",
    FLEX_END = "flex-end",
    BASELINE = "baseline",
    INITIAL = "initial",
    INHERIT = "inherit",
    SPACE_BETWEEN = "space-between",
}

export const enum JUSTIFY_CONTENT {
    START = "start",
    END = "end",
    FLEX_START = "flex-start",
    FLEX_END = "flex-end",
    CENTER = "center",
    LEFT = "left",
    RIGHT = "right",
    NORMAL = "normal",
    BASELINE = "baseline",
    SPACE_BETWEEN = "space-between",
    SPACE_AROUND = "space-around",
    SPACE_EVENLY = "space-evenly",
    STRETCH = "stretch",
}
export interface FlexOptions {
    direction?: FLEX_DIRECTION;
    alignItems?: ALIGN_ITEMS;
    justifyContent?: JUSTIFY_CONTENT;
}
