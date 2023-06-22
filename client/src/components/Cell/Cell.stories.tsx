import { CELL_STATUS } from "@/core/enums";
import { Meta, Story, StoryObj } from "@storybook/react";
import Cell from "./Cell";

export default {
    title: "Board/Cell",
    component: Cell,
} as Meta<typeof Cell>;

export const _Cell: StoryObj<typeof Cell> = {
    args: {
        size: "2.2rem",
        status: CELL_STATUS.TO_BE_OCCUPIED,
    },
};
