import { Meta, StoryObj } from "@storybook/react";
import Box from "./Box";

export default {
    title: "Box/Box",
    component: Box,
} as Meta<typeof Box>;

export const _Box: StoryObj<typeof Box> = {
    args: {
        title: "BoxTitle",
        children: (
            <>
                <p>BoxContent</p>
                <p>BoxContent</p>
                <p>BoxContent</p>
                <p>BoxContent</p>
                <p>BoxContent</p>
                <p>BoxContent</p>
            </>
        ),
    },
};
