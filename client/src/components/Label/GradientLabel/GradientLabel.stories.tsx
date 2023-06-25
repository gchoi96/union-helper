import { TEXT_COLOR } from "@/styles/color";
import { Meta, StoryObj } from "@storybook/react";
import GradientLabel from "./GradientLabel";

export default {
    title: "Label/GradientLabel",
    component: GradientLabel,
} as Meta<typeof GradientLabel>;

export const _GradientLabel: StoryObj<typeof GradientLabel> = {
    args: {
        size: "2.8rem",
        fontWeight: 600,
        gradient: TEXT_COLOR.CARD_GRADE,
        children: "GradientLabel",
    },
};
