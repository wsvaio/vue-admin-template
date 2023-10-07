import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import { createHtmlPlugin } from "vite-plugin-html";
import ReactivityTransform from "@vue-macros/reactivity-transform/dist/vite";
import Unocss from "unocss/vite";
import autoprefixer from "autoprefixer";

export default defineConfig(({ mode }) => {
	const { VITE_BASE, VITE_BASE_API, VITE_DOCUMENT_TITLE } = loadEnv(mode, "./");
	return {
		base: VITE_BASE,
		resolve: {
			alias: {
				"@/": `${resolve(__dirname, "src")}/`,
			},
		},
		build: {
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("node_modules"))
							return id.toString().split("node_modules/")[1].split("/")[0].toString();
					}
				}
			}
		},

		server: {
			host: true,
			proxy: {
				"/api": {
					target: VITE_BASE_API,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ""),
				},

			},
		},
		css: {
			postcss: {
				plugins: [autoprefixer()],
			},
		},
		plugins: [
			vue({
				script: {
					propsDestructure: true,
					defineModel: true,
				},
			}),
			ReactivityTransform(),
			// legacy(),
			// html注入数据
			createHtmlPlugin({
				inject: {
					data: {
						title: VITE_DOCUMENT_TITLE,
					},
				},
			}),

			// Commpression({}),
			// 原子化css
			Unocss(),

			// api 自动引入
			AutoImport({
				dts: resolve(__dirname, "src/typings/auto-import.d.ts"),
				imports: [
					"vue",
					"vue-router",
					"pinia",
					"vue-i18n",
					"@vueuse/core",
				],
				resolvers: [NaiveUiResolver()],
				vueTemplate: true,
				defaultExportByFilename: true,
				dirs: [
					"src/utils",
					"src/composables",
					"src/stores",
					"src/apis/*/index*",
				],
			}),
			// 组件自动引入
			Components({
				dts: resolve(__dirname, "src/typings/auto-components.d.ts"),
				resolvers: [NaiveUiResolver()],
				globs: ["src/components/*/index.vue"],
			}),

		],
	};
});
