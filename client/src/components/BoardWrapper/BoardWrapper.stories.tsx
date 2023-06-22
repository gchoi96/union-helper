import { Meta, StoryObj } from "@storybook/react";
import Board from "../Board/Board";
import BoardWrapper from "./BoardWrapper";

export default {
    title: "Board/BoardWrapper",
    component: BoardWrapper,
} as Meta<typeof BoardWrapper>;

export const _BoardWrapper: StoryObj<typeof BoardWrapper> = {
    args: {
        children: <Board></Board>,
    },
};
