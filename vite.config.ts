import { defineConfig } from 'vite';
import type { UserConfig as VitestUserConfig } from 'vitest/config';
import type { Options } from '@vitejs/plugin-react';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import WindiCSS from 'vite-plugin-windicss';

const reactSetting: Options = {
    jsxImportSource: '@emotion/react',
    jsxRuntime: 'automatic',
    // babel: {
    //     plugins: ["@emotion/babel-plugin"]
    // },
};

type CombinedConfig = Parameters<typeof defineConfig>[0] & {
    test: VitestUserConfig['test'];
};

export default defineConfig({
    base: './',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/components/setup.ts',
        // setupFiles: path.resolve(
        //     __dirname,
        //     'src/components/setup.ts'
        // ),
        reporters: 'verbose',
        css: {
            modules:{
                classNameStrategy: 'non-scoped'
            }
        },
    },
    plugins: [
        react(reactSetting),
        WindiCSS(),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [
                path.resolve(process.cwd(), 'src/assets/icons'),
            ],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]',
            /**
             * 自定义插入位置
             * @default: body-last
             */
            inject: 'body-last',

            /**
             * custom dom id
             * @default: __svg__icons__dom__
             */
            customDomId: '__svg__icons__dom__',
        }),
    ],
    css: {
        // modules:{
        //     localsConvention: "camelCaseOnly",
        // },
        postcss: {
            plugins: [
                autoprefixer({
                    grid: 'no-autoplace',
                }),
            ],
        },
    },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src'),
            },
        ],
    },
    esbuild: {
        // jsxFactory:"jsx",
        // // jsxFactory:"",
        // jsxInject:`/** @jsx jsx */\n import { jsx } from '@emotion/react'`,
        define: {
            this: 'window',
        },
    },
} as CombinedConfig);
