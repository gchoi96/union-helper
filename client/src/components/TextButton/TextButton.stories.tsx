import { Meta, StoryObj } from "@storybook/react";
import TextButton from "./TextButton";

export default {
    title: "Button/TextButton",
    component: TextButton,
} as Meta<typeof TextButton>;

export const _TextButton: StoryObj<typeof TextButton> = {
    args: {
        children: "텍스트 버튼",
    },
};
