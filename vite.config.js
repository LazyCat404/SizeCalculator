import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import vueI18n from '@intlify/vite-plugin-vue-i18n'

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
    })
  ]
})
