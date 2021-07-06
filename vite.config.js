import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import vueI18n from '@intlify/vite-plugin-vue-i18n'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "views": path.resolve(__dirname, "src/views"),
      "apis": path.resolve(__dirname, "src/apis"),
    },
  },
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, './src/language/**'),
    }),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ],
  // 跨域
  server:{
    proxy:{
      '/api':{
        target:'http://syj.7starsoft2.com:8000',
        changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
      } 
    }
  }
})
