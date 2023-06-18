import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    staticDirs: ["../public"],
    docs: {
        autodocs: "tag",
    },
    webpackFinal: async (config) => {
        if (!config) return config;
        config.resolve!.alias = {
            ["@"]: path.resolve(__dirname, "../src/"),
            ["@classes"]: path.resolve(__dirname, "../src/core/classes"),
            ["@core"]: path.resolve(__dirname, "../src/core"),
        };
        config.resolve!.extensions!.push(".ts", ".tsx");
        return config;
    },
};
export default config;
