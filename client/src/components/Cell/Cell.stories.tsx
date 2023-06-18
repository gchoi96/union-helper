import { Meta, Story } from "@storybook/react";
import Cell from "./Cell";

export default {
    title: "Cell",
    component: Cell,
} as Meta<typeof Cell>;

export const _Cell: Story<typeof Cell> = (args) => <Cell {...args} />;
