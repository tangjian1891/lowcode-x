import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import UnoCSS from "unocss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({}),
    vueJsx(),
    AutoImport({
      eslintrc: {
        enabled: true, // <-- this
      },
      dts: true,
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        /\.md$/, // .md
      ],
      vueTemplate: true,
      imports: [
        "vue",
        "vue-router",

        {
          "@/utils/lib-export": [["dayjs"], ["nanoid"]],
          "@/enums/sex-enum": [["SexEnum"]],
          "@/enums/index": [["MaterialEnum"]],
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 4321,
  },
});
