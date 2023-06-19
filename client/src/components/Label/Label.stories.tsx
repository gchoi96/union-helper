import { Meta, StoryObj } from "@storybook/react";
import Label from "./Label";

export default {
    title: "Label",
    component: Label,
} as Meta<typeof Label>;

export const _Label: StoryObj<typeof Label> = {
    args: {
        children: "Label",
        icon: "/people_icon.svg",
    },
};
