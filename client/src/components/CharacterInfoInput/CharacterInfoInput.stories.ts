import { Meta, StoryObj } from "@storybook/react";
import CharacterInfoInput from "./CharacterInfoInput";

export default {
    title: "Input/CharacterInfoInput",
    component: CharacterInfoInput,
} as Meta<typeof CharacterInfoInput>;

export const _CharacterInfoInput: StoryObj<typeof CharacterInfoInput> = {
    args: {
        //@ts-ignore
        characterInfo: { nickname: "진부령박스카" },
    },
};
