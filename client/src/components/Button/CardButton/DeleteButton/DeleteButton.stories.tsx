import { Meta, StoryObj } from "@storybook/react";
import CardButtonDelete from "./DeleteButton";

export default {
    component: CardButtonDelete,
    title: "CardButton",
} as Meta<typeof CardButtonDelete>;

export const Delete: StoryObj<typeof CardButtonDelete> = {};
