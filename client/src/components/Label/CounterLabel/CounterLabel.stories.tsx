import { Meta, StoryObj } from "@storybook/react";
import CounterLabel from "./CounterLabel";

export default {
    title: "Label/CounterLabel",
    component: CounterLabel,
} as Meta<typeof CounterLabel>;

export const _CounterLabel: StoryObj<typeof CounterLabel> = {
    args: {
        title: "title",
        children: "content",
    },
};
