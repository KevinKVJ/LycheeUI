import type { StorybookViteConfig } from '@storybook/builder-vite';

const config: StorybookViteConfig = {
    stories: ['../src/stories/**/*.stories.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions"
    ],
    core: {
        builder: '@storybook/builder-vite',
    },
    "framework": "@storybook/react",
    async viteFinal(config, options) {
        // Add your configuration here
        return config;
    },
    // "features": {
    //     "storyStoreV7": true
    // }
};
export default config;

// module.exports = {
//     "stories": [
//         "../src/**/*.stories.mdx",
//         "../src/**/*.stories.@(js|jsx|ts|tsx)"
//     ],
//     "addons": [
//         "@storybook/addon-links",
//         "@storybook/addon-essentials",
//         "@storybook/addon-interactions"
//     ],
//     "framework": "@storybook/react",
//     "core": {
//         "builder": "@storybook/builder-vite"
//     },
//     "features": {
//         "storyStoreV7": true
//     }
// }
// .storybook/main.ts