import {  Meta, Story } from "@storybook/react";
import Board from "./Board";

export default {
    title: "UnionBoard",
    component: Board,
} as Meta<typeof Board>;

export const _UnionBoard: Story<typeof Board> = (args) => <Board/>;