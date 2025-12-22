import vue from '@vitejs/plugin-vue';
// import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx'

import { defineConfig, loadEnv } from 'vite'
// import { resolve } from 'path'



export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')

  return {


    // 设置基础路径
    // base: '/t-model-v2/', // 部署到子路径
    // 基础路径配置
    base: env.VITE_BASE_URL || '/',

    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    css: {
      // preprocessorOptions: {
      //   scss: {
      //     additionalData: `@use "@/styles/element/var.scss" as *;`,
      //   },
      // },
    },
  }

});

